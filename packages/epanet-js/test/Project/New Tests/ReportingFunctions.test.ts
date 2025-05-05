import { Project, Workspace } from '../../../src';

import {
  StatusReport,
  AnalysisStatistic,
  ObjectType,
  NodeProperty,
  LinkProperty,
  NodeType,
  LinkType,
  ActionCodeType,
} from '../../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../../data/net1.inp', 'utf8');

describe('Epanet Reporting Functions', () => {
  let ws: Workspace;
  let model: Project;

  beforeEach(() => {
    ws = new Workspace();
    ws.loadModule();
    model = new Project(ws);
  });

  describe('Report File Operations', () => {
    test('clear report', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net1.rpt', 'out.bin');
      model.solveH();
      const rpt = ws.readFile('net1.rpt');
      expect(rpt.length).toBeGreaterThan(0);

      model.clearReport();

      const rpt2 = ws.readFile('net1.rpt');
      expect(rpt2).toEqual('');
    });

    test('write line', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net2.rpt', 'out2.bin');
      model.solveH();

      model.writeLine('Test New Line');
      model.copyReport('test.rpt');

      const rpt2 = ws.readFile('test.rpt');
      expect(rpt2.slice(-13)).toEqual('Test New Line');
    });

    test('copy report', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net3.rpt', 'out3.bin');
      model.solveH();

      model.copyReport('copied.rpt');
      const original = ws.readFile('net3.rpt');
      const copied = ws.readFile('copied.rpt');

      expect(copied).toEqual(original);
    });

    test('reset report', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net4.rpt', 'out4.bin');

      // Set some custom report settings
      model.setStatusReport(StatusReport.FullReport);

      // Reset to defaults
      model.resetReport();

      // Verify by running simulation and checking report
      model.solveH();
      const rpt = ws.readFile('net4.rpt');

      // Report should be empty
      expect(rpt).toBe('');
    });

    // model.setReport('FILE myfile.rpt'); is failing in epanet-js 0.7.0
    //https://github.com/modelcreate/epanet-js/issues/72
    test.skip('set report format', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net5.rpt', 'out5.bin');

      model.solveH();
      model.saveH();

      model.resetReport();
      model.setReport('FILE myfile.rpt');
      model.setReport('NODES NONE');
      model.setReport('LINKS ALL');
      model.setReport('VELOCITY ABOVE 1.0');

      model.report();
      model.copyReport('myfile.rpt');

      const rpt = ws.readFile('myfile.rpt', 'utf8');
      expect(rpt).toBeDefined();
      expect(rpt).toContain('with Velocity above 1.00 fps');
      expect(rpt).toContain('Link Results at');
      expect(rpt).not.toContain('Node Results at');
    });

    test('set status report level', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net6.rpt', 'out6.bin');

      // Set full status reporting
      model.setStatusReport(StatusReport.FullReport);
      model.solveH();
      const rpt = ws.readFile('net6.rpt');
      expect(rpt).toContain('Trial  1:');
      expect(rpt).toContain('maximum  flow change =');
    });

    test('get statistics', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net7.rpt', 'out7.bin');
      model.solveH();

      // Get various statistics
      const iterations = model.getStatistic(AnalysisStatistic.Iterations);
      const relativeError = model.getStatistic(AnalysisStatistic.RelativeError);
      const maxHeadError = model.getStatistic(AnalysisStatistic.MaxHeadError);

      expect(iterations).toBeGreaterThan(0);
      expect(relativeError).toBeGreaterThanOrEqual(0);
      expect(maxHeadError).toBeGreaterThanOrEqual(0);
    });

    test('get result index maintains correct mapping after network modifications', () => {
      ws.writeFile('net1.inp', net1);
      model.open('net1.inp', 'net8.rpt', 'out8.bin');
      model.solveH();

      // Get initial result indices for some nodes and links
      const node1Index = model.getResultIndex(ObjectType.Node, 1);
      const node2Index = model.getResultIndex(ObjectType.Node, 2);
      const link1Index = model.getResultIndex(ObjectType.Link, 1);
      const link2Index = model.getResultIndex(ObjectType.Link, 2);

      // Store some initial results for later comparison
      const node1InitialHead = model.getNodeValue(1, NodeProperty.Head);
      const node2InitialHead = model.getNodeValue(2, NodeProperty.Head);
      const link1InitialFlow = model.getLinkValue(1, LinkProperty.Flow);
      const link2InitialFlow = model.getLinkValue(2, LinkProperty.Flow);

      // Modify the network by adding and deleting elements
      // This will change the indices of existing elements
      const newNodeIndex = model.addNode('NEW_NODE', NodeType.Junction);
      model.setJunctionData(newNodeIndex, 700, 0, '');

      // Add a new link connected to the new node
      const newLinkIndex = model.addLink(
        'NEW_LINK',
        LinkType.Pipe,
        'NEW_NODE',
        '2'
      );
      model.setPipeData(newLinkIndex, 100, 50, 1, 1);

      // Delete an existing node and link
      model.deleteNode(3, ActionCodeType.Unconditional);
      model.deleteLink(3, ActionCodeType.Unconditional);

      // Get new result indices for the same nodes and links
      const node1NewIndex = model.getResultIndex(ObjectType.Node, 1);
      const node2NewIndex = model.getResultIndex(ObjectType.Node, 2);
      const link1NewIndex = model.getResultIndex(ObjectType.Link, 1);
      const link2NewIndex = model.getResultIndex(ObjectType.Link, 2);

      // Verify that result indices remain the same despite network modifications
      expect(node1NewIndex).toEqual(node1Index);
      expect(node2NewIndex).toEqual(node2Index);
      expect(link1NewIndex).toEqual(link1Index);
      // Note: link2's result index will be different because we added a new link
      // before deleting link3, which affects the result index mapping
      expect(link2NewIndex).not.toEqual(link2Index);

      // Verify that we can still retrieve the correct results using the original indices
      const node1Head = model.getNodeValue(1, NodeProperty.Head);
      const node2Head = model.getNodeValue(2, NodeProperty.Head);
      const link1Flow = model.getLinkValue(1, LinkProperty.Flow);
      const link2Flow = model.getLinkValue(2, LinkProperty.Flow);

      expect(node1Head).toEqual(node1InitialHead);
      expect(node2Head).toEqual(node2InitialHead);
      expect(link1Flow).toEqual(link1InitialFlow);
      expect(link2Flow).toEqual(link2InitialFlow);
    });
  });
});
