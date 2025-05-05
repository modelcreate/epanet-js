import { Project, Workspace } from '../../../src';
import {
  InitHydOption,
  NodeType,
  NodeProperty,
  LinkType,
  LinkProperty,
} from '../../../src/enum';

import { readFileSync } from 'fs';
import { join } from 'path';

const net1 = readFileSync(join(__dirname, '../../data/net1.inp'), 'utf8');
const net2 = readFileSync(
  join(__dirname, '../../data/AllElementsSmallNetwork.inp'),
  'utf8'
);

const ws = new Workspace();

describe('Hydraulic Analysis Functions', () => {
  let model: Project;

  beforeEach(() => {
    model = new Project(ws);
  });

  afterEach(() => {
    model.close();
  });

  describe('Basic Hydraulic Analysis', () => {
    test('should perform a complete hydraulic analysis', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net1.rpt', 'out.bin');

      // Run complete hydraulic analysis
      model.solveH();
      model.saveH();

      // Verify binary output file
      const bin = ws.readFile('out.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);
      expect(epanetMagicNumber).toEqual(516114521);
    });

    test('should perform step-by-step hydraulic analysis', () => {
      ws.writeFile('net2.inp', net1);
      model.open('net2.inp', 'report2.rpt', 'out2.bin');

      // Open and initialize hydraulic analysis
      model.openH();
      model.initH(InitHydOption.SaveAndInit);

      // Run step-by-step analysis
      let tStep = Infinity;
      do {
        model.runH();
        tStep = model.nextH();
      } while (tStep > 0);

      // Save and close
      model.saveH();
      model.closeH();

      // Verify binary output file
      const bin = ws.readFile('out2.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);
      expect(epanetMagicNumber).toEqual(516114521);
      expect(tStep).toEqual(0);
    });

    test('should use existing hydraulic file', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net1.rpt', 'out.bin');

      // Run complete hydraulic analysis
      model.solveH();
      model.saveH();

      // Save to a specific file
      model.saveHydFile('hyd.bin');

      // Create new model and use the saved hydraulic file
      const model2 = new Project(ws);
      model2.open('net1.inp', 'net1.rpt', 'out.bin');
      model2.useHydFile('hyd.bin');
      model2.saveHydFile('out2.bin');

      // Verify both models have the same results
      const bin1 = ws.readFile('out2.bin', 'binary');
      const bin2 = ws.readFile('hyd.bin', 'binary');
      expect(bin1).toEqual(bin2);
      model2.close();
    });
  });

  describe('Multiple Hydraulic Runs', () => {
    test('should handle multiple hydraulic runs in same workspace', async () => {
      ws.writeFile('net2.inp', net2);
      model.open('net2.inp', 'report2.rpt', 'out2.bin');

      // First run
      model.openH();
      model.initH(InitHydOption.SaveAndInit);

      let tStep = Infinity;
      do {
        model.runH();
        tStep = model.nextH();
      } while (tStep > 0);

      model.saveH();
      model.closeH();

      const bin = ws.readFile('out2.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);
      expect(epanetMagicNumber).toEqual(516114521);
      expect(tStep).toEqual(0);

      // Second run in new workspace
      const ws2 = new Workspace();
      await ws2.loadModule();
      ws2.writeFile('net3.inp', net2);

      const model2 = new Project(ws2);
      model2.open('net3.inp', 'report3.rpt', 'out3.bin');

      model2.openH();
      model2.initH(InitHydOption.SaveAndInit);

      tStep = Infinity;
      do {
        model2.runH();
        tStep = model2.nextH();
      } while (tStep > 0);

      model2.saveH();
      model2.closeH();

      const bin2 = ws2.readFile('out3.bin', 'binary');
      const epanetMagicNumber2 = new DataView(bin2.buffer).getInt32(0, true);
      expect(epanetMagicNumber2).toEqual(516114521);
      expect(tStep).toEqual(0);
    });
  });

  describe('Edge Cases', () => {
    test('should handle initialization with different flags', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net1.rpt', 'out.bin');

      // Test with SaveAndInit
      model.openH();
      model.initH(InitHydOption.SaveAndInit);
      model.closeH();

      // Test with NoSave
      model.openH();
      model.initH(InitHydOption.NoSave);
      model.closeH();

      // Test with Save
      model.openH();
      model.initH(InitHydOption.Save);
      model.closeH();
    });

    test('should handle empty network', () => {
      model.init('report.rpt', 'out.bin', 0, 0);

      // Should throw when running hydraulic analysis on empty network
      expect(() => {
        model.solveH();
      }).toThrow(/Error 223/);
    });

    test('should run with minimal valid network', () => {
      model.init('report.rpt', 'out.bin', 0, 0);

      // Add a reservoir (fixed head node)
      const reservoirIndex = model.addNode('R1', NodeType.Reservoir);
      model.setNodeValue(reservoirIndex, NodeProperty.Elevation, 100);

      // Add a junction node
      const junctionIndex = model.addNode('J1', NodeType.Junction);
      model.setNodeValue(junctionIndex, NodeProperty.Elevation, 50);
      model.setNodeValue(junctionIndex, NodeProperty.BaseDemand, 0);

      // Add a pipe connecting them
      const pipeIndex = model.addLink('P1', LinkType.Pipe, 'R1', 'J1');
      model.setLinkValue(pipeIndex, LinkProperty.Length, 100);
      model.setLinkValue(pipeIndex, LinkProperty.Diameter, 12);
      model.setLinkValue(pipeIndex, LinkProperty.Roughness, 100);

      // Run hydraulic analysis
      model.solveH();
      model.saveH();

      // Verify binary output file
      const bin = ws.readFile('out.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);
      expect(epanetMagicNumber).toEqual(516114521);
    });
  });
});
