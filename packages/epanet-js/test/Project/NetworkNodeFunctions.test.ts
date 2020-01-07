import { Project, Workspace } from '../../src';
import { CountType, NodeType, ActionCodeType } from '../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../data/net1.inp', 'utf8');

const ws = new Workspace();

describe('Epanet Network Node Functions', () => {
  describe('Error Catching', () => {
    test('throw if invalid id', () => {
      function catchError() {
        const model = new Project(ws);
        model.init('report.rpt', 'out.bin', 0, 0);
        model.getNodeIndex('N1');
      }

      expect(catchError).toThrow('203: function call contains undefined node');
    });
  });
  describe('Impliment Methods', () => {
    test('add node', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.init('report.rpt', 'out.bin', 0, 0);

      //Create Network
      const node1Id = model.addNode('N1', NodeType.Junction);

      model.setJunctionData(node1Id, 700, 0, '');

      const count1 = model.getCount(CountType.NodeCount);
      expect(count1).toEqual(1);

      const nodeIndex = model.getNodeIndex('N1');
      expect(nodeIndex).toEqual(node1Id);

      const nodeName = model.getNodeId(nodeIndex);
      expect(nodeName).toEqual('N1');

      model.deleteNode(node1Id, ActionCodeType.Unconditional);
      const count2 = model.getCount(CountType.NodeCount);
      expect(count2).toEqual(0);
    });
    test('set node cordinates', () => {
      const model = new Project(ws);
      model.init('report.rpt', 'out.bin', 0, 0);

      //Create Network
      model.addNode('N1', NodeType.Junction);
      const node1Id = model.getNodeIndex('N1');

      model.setJunctionData(node1Id, 700, 0, '');

      model.setCoordinates(node1Id, 100, 300);
      const { x, y } = model.getCoordinates(node1Id);
      expect(x).toEqual(100);
      expect(y).toEqual(300);
    });
    test('set and get node types', () => {
      const model = new Project(ws);
      model.init('report3.rpt', 'out3.bin', 0, 0);

      //Create Network
      const node1Id = model.addNode('N1', NodeType.Reservoir);

      const nodeType = model.getNodeType(node1Id);

      expect(nodeType).toEqual(NodeType.Reservoir);
    });
    test('set node id and get index', () => {
      const model = new Project(ws);
      model.init('report4.rpt', 'out4.bin', 0, 0);

      //Create Network
      const node1Id = model.addNode('N1', NodeType.Tank);
      model.setNodeId(node1Id, 'Tank1');

      const indexLookup = model.getNodeIndex('Tank1');

      expect(node1Id).toEqual(indexLookup);
    });
  });
});
