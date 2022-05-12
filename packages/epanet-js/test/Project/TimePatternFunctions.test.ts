import { Project, Workspace } from '../../src';

const ws = new Workspace();

describe('Epanet Time Pattern Functions', () => {
  describe('Impliment Methods', () => {
    test('set pattern', () => {
      const model = new Project(ws);
      model.init('report.rpt', 'out.bin', 0, 0);

      model.addPattern('testPattern');
      const patIndex = model.getPatternIndex('testPattern');

      model.setPattern(patIndex, [2, 2, 3, 4, 5]);

      const patLength = model.getPatternLength(patIndex);
      expect(patLength).toEqual(5);

      const patValue = model.getPatternValue(patIndex, 5);
      expect(patValue).toEqual(5);
    });
  });
});
