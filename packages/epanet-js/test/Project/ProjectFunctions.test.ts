import { Project, Workspace } from '../../src';
import { CountType, NodeType } from '../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../data/net1.inp', 'utf8');
const netGenerated = fs.readFileSync(
  __dirname + '/../data/net1_backup.inp',
  'utf8'
);
const ws = new Workspace();

describe('Epanet Project Functions', () => {
  describe('Error Catching', () => {
    test('throw with bad properties', () => {
      function catchError() {
        const model = new Project(ws);
        model.init('repor{/st.rpt', 'ou{/t.bin', 0, 0);
      }

      expect(catchError).toThrow('303');
    });
    test('throw if no network is open close project and free memory', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.open('net1.inp', 'report.rpt', 'out.bin');
      const nodeCount = model.getCount(CountType.NodeCount);
      expect(nodeCount).toEqual(11);

      model.close();

      function catchError() {
        model.getCount(CountType.NodeCount);
      }

      expect(catchError).toThrow('Error 102: no network data available');
    });
  });
  describe('Impliment Methods', () => {
    test('run an existing project', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.runProject('net1.inp', 'report.rpt', 'out.bin');

      const rpt = ws.readFile('report.rpt');
      const bin = ws.readFile('out.bin', 'binary');

      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);

      //Check if report has been written
      expect(rpt.length).toBeGreaterThan(0);

      // Check if bin for magic number
      expect(epanetMagicNumber).toEqual(516114521);
    });
    test('set and get title', () => {
      const model = new Project(ws);
      model.init('report.rpt', 'out.bin', 0, 0);
      model.setTitle('Title 1', 'Title Line 2', '');
      const { line1, line2, line3 } = model.getTitle();

      expect(line1).toEqual('Title 1');
      expect(line2).toEqual('Title Line 2');
      expect(line3).toEqual('');
    });
    test('get the counts of an existing project', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.open('net1.inp', 'report.rpt', 'out.bin');
      const nodeCount = model.getCount(CountType.NodeCount);
      const linkCount = model.getCount(CountType.LinkCount);

      expect(nodeCount).toEqual(11);
      expect(linkCount).toEqual(13);
    });
    test('writes a inp file', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.init('report.rpt', 'out.bin', 0, 0);

      //Create Network
      const node1Id = model.addNode('N1', NodeType.Junction);
      model.setJunctionData(node1Id, 700, 0, '');
      const node2Id = model.addNode('N2', NodeType.Junction);
      model.setJunctionData(node2Id, 600, 0, '');
      const linkId = model.addLink('L1', 0, 'N1', 'N2');
      model.setPipeData(linkId, 100, 50, 1, 1);

      model.saveInpFile('net1_backup.inp');

      const duplicateFile = ws.readFile('net1_backup.inp');

      expect(duplicateFile).toEqual(netGenerated);
    });
  });
});
