import { Project, Workspace } from '../../../src';
import {
  CountType,
  LinkType,
  NodeType,
  LinkProperty,
  ActionCodeType,
} from '../../../src/enum';
import { readFileSync } from 'fs';
import { join } from 'path';

const net1 = readFileSync(join(__dirname, '../../data/net1.inp'), 'utf8');

const ws = new Workspace();

describe('Network Link Functions', () => {
  let model: Project;

  beforeEach(() => {
    model = new Project(ws);
  });

  afterEach(() => {
    model.close();
  });

  describe('Error Handling', () => {
    test('should throw if invalid link ID', () => {
      model.init('report.rpt', 'out.bin', 0, 0);
      expect(() => {
        model.getLinkIndex('LinkThatDoesntExist');
      }).toThrow('204: function call contains undefined link');
    });

    test('should throw if unable to delete link in control', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      expect(model.getCount(CountType.LinkCount)).toEqual(13);
      expect(() => {
        model.deleteLink(13, ActionCodeType.Conditional);
      }).toThrow(
        '261: function call contains attempt to delete a node or link contained in a control'
      );
    });
  });

  describe('Basic Link Operations', () => {
    test('should get information from existing network', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      // Test link count
      const linkCount = model.getCount(CountType.LinkCount);
      expect(linkCount).toEqual(13);

      // Test link index and ID
      const linkIndex = model.getLinkIndex('10');
      expect(linkIndex).toEqual(1);
      const linkId = model.getLinkId(2);
      expect(linkId).toEqual('11');

      // Test link types
      const pipeLinkType = model.getLinkType(1);
      const pumpIndex = model.getLinkIndex('9');
      const pumpLinkType = model.getLinkType(pumpIndex);
      expect(pipeLinkType).toEqual(LinkType.Pipe);
      expect(pumpLinkType).toEqual(LinkType.Pump);

      // Test link nodes
      const { node1, node2 } = model.getLinkNodes(linkIndex);
      expect(node1).toEqual(1);
      expect(node2).toEqual(2);
    });

    test('should create and modify link', () => {
      model.init('report.rpt', 'out.bin', 0, 0);

      // Create nodes
      model.addNode('Node1', NodeType.Junction);
      model.addNode('Node2', NodeType.Junction);
      model.addNode('Node3', NodeType.Junction);

      // Create link
      const linkIndex = model.addLink('A', LinkType.CVPipe, 'Node1', 'Node2');
      expect(linkIndex).toEqual(1);

      // Verify link type
      const linkType = model.getLinkType(linkIndex);
      expect(linkType).toEqual(LinkType.CVPipe);

      // Set and get link values
      model.setLinkValue(linkIndex, LinkProperty.Diameter, 100);
      model.setLinkValue(linkIndex, LinkProperty.Length, 20);
      const linkDia = model.getLinkValue(linkIndex, LinkProperty.Diameter);
      const linkLength = model.getLinkValue(linkIndex, LinkProperty.Length);
      expect(linkDia).toEqual(100);
      expect(linkLength).toEqual(20);

      // Change link nodes
      model.setLinkNodes(linkIndex, 1, 3);
      const { node1, node2 } = model.getLinkNodes(linkIndex);
      expect(node1).toEqual(1);
      expect(node2).toEqual(3);
    });

    test('should delete link', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      const initialCount = model.getCount(CountType.LinkCount);
      expect(initialCount).toEqual(13);

      model.deleteLink(1, ActionCodeType.Conditional);
      const newCount = model.getCount(CountType.LinkCount);
      expect(newCount).toEqual(12);
    });

    test('should set link type', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      const originalType = model.getLinkType(1);
      expect(originalType).toEqual(LinkType.Pipe);

      // Note: setLinkType is currently disabled due to bug
      // https://github.com/modelcreate/epanet-js/issues/24
      // model.setLinkType(1, LinkType.PRV, ActionCodeType.Conditional);
      // const updatedType = model.getLinkType(1);
      // expect(updatedType).toEqual(LinkType.PRV);
    });
  });

  describe('Link Geometry', () => {
    test('should handle existing vertices', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      const pipeIndex = model.getLinkIndex('10');
      const vertexCount = model.getVertexCount(pipeIndex);
      expect(vertexCount).toEqual(1);

      const vertex = model.getVertex(pipeIndex, 1);
      expect(vertex).toEqual({ x: 20, y: 20 });
    });

    test('should create link with vertices', () => {
      model.init('report.rpt', 'out.bin', 0, 0);

      // Create nodes and link
      model.addNode('Node1', NodeType.Junction);
      model.addNode('Node2', NodeType.Junction);
      const pipeIndex = model.addLink('A', LinkType.CVPipe, 'Node1', 'Node2');

      // Set vertices
      const x = [1, 2, 3];
      const y = [2, 4, 6];
      model.setVertices(pipeIndex, x, y);

      // Verify vertices
      const vertexCount = model.getVertexCount(pipeIndex);
      expect(vertexCount).toEqual(3);

      const vertex = model.getVertex(pipeIndex, 1);
      expect(vertex).toEqual({ x: 1, y: 2 });
    });
  });

  describe('Link Properties', () => {
    test('should set and get pipe data', () => {
      model.init('report.rpt', 'out.bin', 0, 0);

      // Create nodes and pipe
      model.addNode('Node1', NodeType.Junction);
      model.addNode('Node2', NodeType.Junction);
      const pipeIndex = model.addLink('P1', LinkType.Pipe, 'Node1', 'Node2');

      // Set pipe data
      model.setPipeData(pipeIndex, 100, 12, 100, 0);

      // Verify pipe properties
      const length = model.getLinkValue(pipeIndex, LinkProperty.Length);
      const diameter = model.getLinkValue(pipeIndex, LinkProperty.Diameter);
      const roughness = model.getLinkValue(pipeIndex, LinkProperty.Roughness);
      const minorLoss = model.getLinkValue(pipeIndex, LinkProperty.MinorLoss);

      expect(length).toEqual(100);
      expect(diameter).toEqual(12);
      expect(roughness).toEqual(100);
      expect(minorLoss).toEqual(0);
    });

    test('should handle pump properties from net1.inp', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      const pumpIndex = model.getLinkIndex('9');

      // Verify pump type and head curve
      const pumpType = model.getPumpType(pumpIndex);
      const headCurveIndex = model.getHeadCurveIndex(pumpIndex);
      expect(pumpType).toBeDefined();
      expect(headCurveIndex).toEqual(1); // From net1.inp: PUMP: Pump Curve for Pump 9

      // Verify pump status and setting
      const status = model.getLinkValue(pumpIndex, LinkProperty.Status);
      const setting = model.getLinkValue(pumpIndex, LinkProperty.Setting);
      expect(status).toBeDefined();
      expect(setting).toBeDefined();
    });

    test('should set and get head curve index for pump', () => {
      model.init('report.rpt', 'out.bin', 0, 0);

      // Create nodes and pump
      model.addNode('Node1', NodeType.Junction);
      model.addNode('Node2', NodeType.Junction);
      const pumpIndex = model.addLink('P1', LinkType.Pump, 'Node1', 'Node2');

      // Create a curve for the pump
      model.addCurve('PUMP_CURVE');
      const curveIndex = model.getCurveIndex('PUMP_CURVE');
      model.setCurve(curveIndex, [0, 1000], [100, 80]);

      // Set and verify head curve index
      model.setHeadCurveIndex(pumpIndex, curveIndex);
      expect(model.getHeadCurveIndex(pumpIndex)).toEqual(curveIndex);
    });

    test('should throw error when setting vertices with mismatched arrays', () => {
      model.init('report.rpt', 'out.bin', 0, 0);

      // Create nodes and link
      model.addNode('Node1', NodeType.Junction);
      model.addNode('Node2', NodeType.Junction);
      const pipeIndex = model.addLink('A', LinkType.CVPipe, 'Node1', 'Node2');

      // Attempt to set vertices with mismatched arrays
      const x = [1, 2, 3];
      const y = [2, 4]; // Different length than x

      expect(() => {
        model.setVertices(pipeIndex, x, y);
      }).toThrow(
        'X and Y vertex arrays must have the same length - X length: 3, Y length 2'
      );
    });

    test('should set and get link ID', () => {
      model.init('report.rpt', 'out.bin', 0, 0);

      // Create nodes and link
      model.addNode('Node1', NodeType.Junction);
      model.addNode('Node2', NodeType.Junction);
      const linkIndex = model.addLink(
        'OriginalID',
        LinkType.Pipe,
        'Node1',
        'Node2'
      );

      // Verify original ID
      expect(model.getLinkId(linkIndex)).toEqual('OriginalID');

      // Change link ID
      model.setLinkId(linkIndex, 'NewID');

      // Verify new ID
      expect(model.getLinkId(linkIndex)).toEqual('NewID');
    });

    test('should handle pipe properties from net1.inp', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      const pipeIndex = model.getLinkIndex('10');

      // Verify pipe properties
      const length = model.getLinkValue(pipeIndex, LinkProperty.Length);
      const diameter = model.getLinkValue(pipeIndex, LinkProperty.Diameter);
      const roughness = model.getLinkValue(pipeIndex, LinkProperty.Roughness);
      const minorLoss = model.getLinkValue(pipeIndex, LinkProperty.MinorLoss);
      const status = model.getLinkValue(pipeIndex, LinkProperty.Status);

      expect(length).toEqual(10530); // From net1.inp
      expect(diameter).toEqual(18); // From net1.inp
      expect(roughness).toEqual(100); // From net1.inp
      expect(minorLoss).toEqual(0); // From net1.inp
      expect(status).toBeDefined();
    });

    test('should handle link status and settings', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      // Test pipe status
      const pipeIndex = model.getLinkIndex('10');
      const pipeStatus = model.getLinkValue(pipeIndex, LinkProperty.Status);
      expect(pipeStatus).toBeDefined();

      // Test pump status and setting
      const pumpIndex = model.getLinkIndex('9');
      const pumpStatus = model.getLinkValue(pumpIndex, LinkProperty.Status);
      const pumpSetting = model.getLinkValue(pumpIndex, LinkProperty.Setting);
      expect(pumpStatus).toBeDefined();
      expect(pumpSetting).toBeDefined();
    });
  });
});
