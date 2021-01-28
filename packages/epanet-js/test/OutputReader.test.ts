import fs from 'fs';
import { Project, Workspace, readBinary, LinkTypes } from '../src';

describe('OutputReader', () => {
  describe('readBinary', () => {
    test('get node ids', () => {
      const bin = getBinaryResults();

      const { results } = readBinary(bin);

      expect(results.nodes[0].id).toEqual('10');
      expect(results.nodes[results.nodes.length - 1].id).toEqual('2');
    });

    test('get link ids', () => {
      const bin = getBinaryResults();

      const { results } = readBinary(bin);

      expect(results.links[0].id).toEqual('10');
      expect(results.links[results.links.length - 1].id).toEqual('9');
    });

    test('get link types', () => {
      const bin = getBinaryResults();

      const { results } = readBinary(bin);

      expect(results.links[0].type).toEqual(LinkTypes.Pipe);
      expect(results.links[results.links.length - 1].type).toEqual(
        LinkTypes.Pump
      );
    });
  });

  const getBinaryResults = (): Uint8Array => {
    const net1 = fs.readFileSync(__dirname + '/data/net1.inp', 'utf8');
    const ws = new Workspace();
    ws.writeFile('net1.inp', net1);
    const model = new Project(ws);
    model.runProject('net1.inp', 'net1.rpt', 'out.bin');
    return ws.readFile('out.bin', 'binary');
  };
});
