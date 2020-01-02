import { Project, Workspace } from '../src';
import { NodeType, NodeProperty } from '../src/enum';

const ws = new Workspace();

describe('Epanet Project', () => {
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
      const nodeId = model.addnode('J1', NodeType.Junction);
      model.setjuncdata(nodeId, 700, 0, '');

      const nodeType = model.getnodetype(nodeId);
      expect(nodeType).toEqual(NodeType.Junction);

      const elev = model.getnodevalue(nodeId, NodeProperty.Elevation);
      expect(elev).toEqual(700);
    });
  });
});
