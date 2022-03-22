import { Project, Workspace } from '../../src';
import {
  CountType,
  NodeType,
  ActionCodeType,
  FlowUnits,
  HeadLossType,
  NodeProperty,
} from '../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../data/net1.inp', 'utf8');
const tankTestInp = fs.readFileSync(
  __dirname + '/../data/tankTest.inp',
  'utf8'
);

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
    test('get node type for tank and res from existing network', () => {
      ws.writeFile('tankTestInp.inp', tankTestInp);
      const model = new Project(ws);

      model.open('tankTestInp.inp', 'tankTestInp.rpt', 'tankTestInp.bin');

      const junctionIndexLookup = model.getNodeIndex('J1');
      const junctionType = model.getNodeType(junctionIndexLookup);
      expect(junctionType).toEqual(NodeType.Junction);

      const resIndexLookup = model.getNodeIndex('R1');
      const resType = model.getNodeType(resIndexLookup);
      expect(resType).toEqual(NodeType.Reservoir);

      // T1 has a flat curve which turns the tank into a res
      const tank1IndexLookup = model.getNodeIndex('T1');
      const tank1Type = model.getNodeType(tank1IndexLookup);
      expect(tank1Type).toEqual(NodeType.Reservoir);

      const tank2IndexLookup = model.getNodeIndex('T2');
      const tank2Type = model.getNodeType(tank2IndexLookup);
      expect(tank2Type).toEqual(NodeType.Tank);

      model.close();
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
    test('set and get node values', () => {
      const model = new Project(ws);
      model.init('report5.rpt', 'out5.bin', FlowUnits.LPS, HeadLossType.DW);

      //Create Network
      const node1Id = model.addNode('N1', NodeType.Junction);
      model.setNodeValue(node1Id, NodeProperty.Elevation, 10);
      const result = model.getNodeValue(node1Id, NodeProperty.Elevation);

      expect(result).toEqual(10);
    });
    test('set and get tank values', () => {
      const model = new Project(ws);
      model.init('report6.rpt', 'out6.bin', FlowUnits.LPS, HeadLossType.HW);

      //Create Network
      const tankId = model.addNode('N1', NodeType.Tank);

      model.setTankData(tankId, 10, 1, 0, 5, 3.2, 1, '');

      // This is failing, see issue https://github.com/modelcreate/epanet-js/issues/23

      const elevation = model.getNodeValue(tankId, NodeProperty.Elevation);
      const minLevel = model.getNodeValue(tankId, NodeProperty.MinLevel);
      const maxLevel = model.getNodeValue(tankId, NodeProperty.MaxLevel);
      const tankDiam = model.getNodeValue(tankId, NodeProperty.TankDiam);
      const minVolume = model.getNodeValue(tankId, NodeProperty.MinVolume);

      expect(elevation).toEqual(10);
      expect(minLevel).toEqual(0);
      expect(maxLevel).toBeCloseTo(5, 5);
      expect(tankDiam).toEqual(3.2);
      expect(minVolume).toEqual(1);
    });
  });
});
