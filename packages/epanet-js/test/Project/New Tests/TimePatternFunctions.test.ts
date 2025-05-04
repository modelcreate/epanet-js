import { Project, Workspace } from '../../../src';

describe('Epanet Time Pattern Functions', () => {
  let ws: Workspace;
  let model: Project;

  beforeEach(async () => {
    ws = new Workspace();
    await ws.loadModule();
    model = new Project(ws);
    model.init('report.rpt', 'out.bin', 0, 0);
  });

  describe('Pattern Management', () => {
    test('add and get pattern index', () => {
      model.addPattern('testPattern');
      const patIndex = model.getPatternIndex('testPattern');
      expect(patIndex).toBeGreaterThan(0);
    });

    test('get pattern id', () => {
      model.addPattern('testPattern');
      const patIndex = model.getPatternIndex('testPattern');
      const patId = model.getPatternId(patIndex);
      expect(patId).toEqual('testPattern');
    });

    test('set pattern id', () => {
      model.addPattern('testPattern');
      const patIndex = model.getPatternIndex('testPattern');
      model.setPatternId(patIndex, 'newPatternId');
      const newPatId = model.getPatternId(patIndex);
      expect(newPatId).toEqual('newPatternId');
    });

    test('delete pattern', () => {
      model.addPattern('testPattern');
      const patIndex = model.getPatternIndex('testPattern');
      model.deletePattern(patIndex);

      // Verify pattern is deleted by checking if we can get its ID
      expect(() => model.getPatternId(patIndex)).toThrow();
    });
  });

  describe('Pattern Values', () => {
    test('set and get pattern value', () => {
      model.addPattern('testPattern');
      const patIndex = model.getPatternIndex('testPattern');

      model.setPattern(patIndex, [99, 98, 97, 96, 95]);
      expect(model.getPatternValue(patIndex, 1)).toEqual(99);
      expect(model.getPatternValue(patIndex, 2)).toEqual(98);
      expect(model.getPatternValue(patIndex, 3)).toEqual(97);
      expect(model.getPatternValue(patIndex, 4)).toEqual(96);
      expect(model.getPatternValue(patIndex, 5)).toEqual(95);

      // Set individual values
      model.setPatternValue(patIndex, 1, 2.0);
      model.setPatternValue(patIndex, 2, 3.0);
      model.setPatternValue(patIndex, 3, 4.0);

      // Get values back
      expect(model.getPatternValue(patIndex, 1)).toEqual(2.0);
      expect(model.getPatternValue(patIndex, 2)).toEqual(3.0);
      expect(model.getPatternValue(patIndex, 3)).toEqual(4.0);
    });

    test('set pattern with array', () => {
      model.addPattern('testPattern');
      const patIndex = model.getPatternIndex('testPattern');

      const values = [2.0, 3.0, 4.0, 5.0, 6.0];
      model.setPattern(patIndex, values);

      // Verify pattern length
      const patLength = model.getPatternLength(patIndex);
      expect(patLength).toEqual(values.length);

      // Verify all values
      values.forEach((value, index) => {
        expect(model.getPatternValue(patIndex, index + 1)).toEqual(value);
      });
    });

    test('get average pattern value', () => {
      model.addPattern('testPattern');
      const patIndex = model.getPatternIndex('testPattern');

      const values = [2.0, 3.0, 4.0, 5.0, 6.0];
      model.setPattern(patIndex, values);

      const average = model.getAveragePatternValue(patIndex);
      const expectedAverage = values.reduce((a, b) => a + b) / values.length;
      expect(average).toEqual(expectedAverage);
    });

    test('pattern value bounds', () => {
      model.addPattern('testPattern');
      const patIndex = model.getPatternIndex('testPattern');

      // Test setting value at period 0 (should throw)
      expect(() => model.setPatternValue(patIndex, 0, 1.0)).toThrow();

      // Test getting value at period 0 (should throw)
      expect(() => model.getPatternValue(patIndex, 0)).toThrow();

      // Test setting value beyond pattern length
      model.setPattern(patIndex, [1.0, 2.0]);
      expect(() => model.setPatternValue(patIndex, 3, 1.0)).toThrow();
      expect(() => model.getPatternValue(patIndex, 3)).toThrow();
    });
  });

  describe('Multiple Patterns', () => {
    test('manage multiple patterns', () => {
      // Add multiple patterns
      model.addPattern('pattern1');
      model.addPattern('pattern2');
      model.addPattern('pattern3');

      const pat1Index = model.getPatternIndex('pattern1');
      const pat2Index = model.getPatternIndex('pattern2');
      let pat3Index = model.getPatternIndex('pattern3');

      // Set different values for each pattern
      model.setPattern(pat1Index, [1.0, 2.0]);
      model.setPattern(pat2Index, [3.0, 4.0]);
      model.setPattern(pat3Index, [5.0, 6.0]);

      // Verify each pattern maintains its own values
      expect(model.getPatternValue(pat1Index, 1)).toEqual(1.0);
      expect(model.getPatternValue(pat2Index, 1)).toEqual(3.0);
      expect(model.getPatternValue(pat3Index, 1)).toEqual(5.0);

      // Delete middle pattern
      model.deletePattern(pat2Index);

      // Get the index of the remaining pattern
      pat3Index = model.getPatternIndex('pattern3');

      // Verify other patterns are unaffected
      expect(model.getPatternValue(pat1Index, 1)).toEqual(1.0);
      expect(model.getPatternValue(pat3Index, 1)).toEqual(5.0);
    });
  });
});
