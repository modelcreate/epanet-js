import { Project, Workspace } from '../src';
import { NodeType } from '../src/enum';

const ws = new Workspace();

describe('Epanet Project', () => {
  describe('init', () => {
    test('should throw with bad properties', () => {
      function catchError() {
        const model = new Project(ws);
        model.init('repor{/st.rpt', 'ou{/t.bin', 0, 0);
      }

      expect(catchError).toThrow('303');
    });
  });

  describe('addNode', () => {
    test('should throw without a network init', () => {
      function catchError() {
        const model = new Project(ws);
        model.addnode('J1', NodeType.Junction);
      }

      expect(catchError).toThrow('102');
    });

    test('add new node with properties', () => {
      const model = new Project(ws);
      model.init('report.rpt', 'out.bin', 0, 0);
      const nodeId = model.addnode('J1', 0);
      const errorFlag = model.setjuncdata(nodeId, 700, 0, '');

      expect(errorFlag).toEqual(0);
    });
  });
});
