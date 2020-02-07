import { Project, Workspace } from '../../src';
import { CountType, LinkType, NodeType, LinkProperty } from '../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../data/net1.inp', 'utf8');

const ws = new Workspace();

describe('Epanet Network Node Functions', () => {
  describe('Error Catching', () => {
    test('throw if invalid id', () => {
      function catchError() {
        const model = new Project(ws);
        model.init('report.rpt', 'out.bin', 0, 0);
        model.getLinkIndex('LinkThatDoesntExist');
      }

      expect(catchError).toThrow('204: function call contains undefined link');
    });
  });
  describe('Impliment Methods', () => {
    test('get information from existing network', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      const count1 = model.getCount(CountType.LinkCount);
      expect(count1).toEqual(13);

      const linkIndex = model.getLinkIndex('10');
      expect(linkIndex).toEqual(1);

      const linkId = model.getLinkId(2);
      expect(linkId).toEqual('11');

      const pipeLinkType = model.getLinkType(1);

      const pumpIndex = model.getLinkIndex('9');
      const pumpLinkType = model.getLinkType(pumpIndex);

      expect(pipeLinkType).toEqual(LinkType.Pipe);
      expect(pumpLinkType).toEqual(LinkType.Pump);

      const { node1, node2 } = model.getLinkNodes(linkIndex);

      expect(node1).toEqual(1);
      expect(node2).toEqual(2);
    });
    test('create link and set values', () => {
      const model = new Project(ws);
      model.init('report.rpt', 'out.bin', 0, 0);

      model.addNode('Node1', NodeType.Junction);
      model.addNode('Node2', NodeType.Junction);
      model.addLink('A', LinkType.CVPipe, 'Node1', 'Node2');

      const linkIndex = model.getLinkIndex('A');
      expect(linkIndex).toEqual(1);

      const linkType = model.getLinkType(1);
      expect(linkType).toEqual(LinkType.CVPipe);

      // Set and Get link values
      model.setLinkValue(1, LinkProperty.Diameter, 100);
      model.setLinkValue(1, LinkProperty.Length, 20);
      const linkDia = model.getLinkValue(1, LinkProperty.Diameter);
      const linkLength = model.getLinkValue(1, LinkProperty.Length);
      expect(linkDia).toEqual(100);
      expect(linkLength).toEqual(20);

      // Change Nodes link is attached too
      model.addNode('Node3', NodeType.Junction);
      model.setLinkNodes(1, 1, 3);
      const { node1, node2 } = model.getLinkNodes(1);
      expect(node1).toEqual(1);
      expect(node2).toEqual(3);
    });
  });
});
