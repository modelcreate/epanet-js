import { Project, Workspace } from '../../src';
//import { NodeType, NodeProperty } from '../../src/enum';

const ws = new Workspace();

describe('Epanet Project Functions', () => {
  describe('init', () => {
    test('should throw with bad properties', () => {
      function catchError() {
        const model = new Project(ws);
        model.init('repor{/st.rpt', 'ou{/t.bin', 0, 0);
      }

      expect(catchError).toThrow('303');
    });
  });
  describe('titles', () => {
    test('should set and get title', () => {
      const model = new Project(ws);
      model.init('report.rpt', 'out.bin', 0, 0);
      model.settitle('Title 1', 'Title Line 2', '');
      const { line1, line2, line3 } = model.gettitle();

      expect(line1).toEqual('Title 1');
      expect(line2).toEqual('Title Line 2');
      expect(line3).toEqual('');
    });
  });
});
