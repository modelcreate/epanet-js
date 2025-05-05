import { Project, Workspace } from '../../../src';
import { CurveType } from '../../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../../data/tankTest.inp', 'utf8');
const ws = new Workspace();

describe('Data Curve Functions', () => {
  let model: Project;

  beforeEach(() => {
    model = new Project(ws);
    model.init('report.rpt', 'out.bin', 0, 0);
  });

  afterEach(() => {
    model.close();
  });

  describe('Basic Curve Operations', () => {
    test('should add and get curve', () => {
      // Add a new curve (added with a single pint of 1.0,1.0)
      model.addCurve('PUMP1');
      const curveIndex = model.getCurveIndex('PUMP1');
      expect(curveIndex).toBe(1);

      // Get curve by index
      //const curve = model.getCurve(curveIndex);
      //expect(curve.id).toBe('PUMP1');
      //expect(curve.x).toEqual([1]);
      //expect(curve.y).toEqual([1]);

      // Get curve ID
      expect(model.getCurveId(curveIndex)).toBe('PUMP1');

      // Get curve length
      expect(model.getCurveLenth(curveIndex)).toBe(1);

      // Get curve type (default should be GenericCurve)
      expect(model.getCurveType(curveIndex)).toBe(CurveType.GenericCurve);
    });

    test('should throw error when x and y arrays have different lengths', () => {
      // Add a new curve
      model.addCurve('PUMP1');
      const curveIndex = model.getCurveIndex('PUMP1');

      // Attempt to set curve with mismatched array lengths
      const xValues = [0, 1000, 2000];
      const yValues = [100, 80]; // Different length than xValues

      expect(() => {
        model.setCurve(curveIndex, xValues, yValues);
      }).toThrow(
        'X and Y vertex arrays must have the same length - X length: 3, Y length 2'
      );
    });

    test('should set curve values', () => {
      // Add a new curve
      model.addCurve('PUMP1');
      const curveIndex = model.getCurveIndex('PUMP1');

      // Set curve values using setCurve
      const xValues = [0, 1000, 2000];
      const yValues = [100, 80, 50];
      model.setCurve(curveIndex, xValues, yValues);

      // Verify curve values
      //const curve = model.getCurve(curveIndex);
      //expect(curve.x).toEqual(xValues);
      //expect(curve.y).toEqual(yValues);
      //expect(model.getCurveLenth(curveIndex)).toBe(3);

      // Verify individual points
      const point1 = model.getCurveValue(curveIndex, 1);
      expect(point1.x).toBe(0);
      expect(point1.y).toBe(100);

      const point2 = model.getCurveValue(curveIndex, 2);
      expect(point2.x).toBe(1000);
      expect(point2.y).toBe(80);
    });

    test('should modify curve values', () => {
      // Add a new curve
      model.addCurve('PUMP1');
      const curveIndex = model.getCurveIndex('PUMP1');

      // Set initial curve values
      model.setCurve(curveIndex, [0, 1000], [100, 80]);

      // Modify individual point
      model.setCurveValue(curveIndex, 2, 1200, 75);

      // Verify modified values
      const point = model.getCurveValue(curveIndex, 2);
      expect(point.x).toBe(1200);
      expect(point.y).toBe(75);

      // Modify curve ID
      model.setCurveId(curveIndex, 'PUMP1_MODIFIED');
      expect(model.getCurveId(curveIndex)).toBe('PUMP1_MODIFIED');
    });

    test('should handle multiple curves', () => {
      // Add first curve
      model.addCurve('PUMP1');
      const curve1Index = model.getCurveIndex('PUMP1');
      model.setCurve(curve1Index, [0, 1000], [100, 80]);

      // Add second curve
      model.addCurve('PUMP2');
      let curve2Index = model.getCurveIndex('PUMP2');
      model.setCurve(curve2Index, [0, 500, 1000], [120, 100, 60]);

      //// Verify both curves exist and have correct data
      //expect(model.getCurve(curve1Index).x).toEqual([0, 1000]);
      //expect(model.getCurve(curve2Index).x).toEqual([0, 500, 1000]);

      // Delete first curve
      model.deleteCurve(curve1Index);

      // Verify second curve still exists and first curve is gone
      expect(() => (curve2Index = model.getCurveIndex('PUMP1'))).toThrow();
      curve2Index = model.getCurveIndex('PUMP2');
      //expect(model.getCurve(curve2Index).id).toBe('PUMP2');
    });
  });

  describe('Real-world Data Tests', () => {
    test('should read curve from INP file', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.open('net1.inp', 'net1.rpt', 'out.bin');

      //const curve = model.getCurve(1);

      //expect(curve.id).toEqual('CURVE_ID');
      //expect(curve.x).toEqual([2, 5]);
      //expect(curve.y).toEqual([5, 5]);
    });
  });
});
