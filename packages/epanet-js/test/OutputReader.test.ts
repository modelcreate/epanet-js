import fs from 'fs';
import { Project, Workspace, readBinary } from '../src';

const net1 = fs.readFileSync(__dirname + '/data/net1.inp', 'utf8');
const ws = new Workspace();

describe('OutputReader', () => {
  describe('readBinary', () => {
    test('get node ids', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.runProject('net1.inp', 'net1.rpt', 'out.bin');
      const bin = ws.readFile('out.bin', 'binary');

      const { results } = readBinary(bin);

      expect(results.nodes[0].id).toEqual('10');
      expect(results.nodes[results.nodes.length - 1].id).toEqual('2');
    });
  });
});
