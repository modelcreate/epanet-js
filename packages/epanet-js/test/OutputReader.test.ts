import fs from 'fs';
import { Project, Workspace, readBinary, NodeTypes, LinkTypes } from '../src';

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

    test('get type for junction', () => {
      const bin = getBinaryResults();

      const { results } = readBinary(bin);

      expect(results.nodes[0].type).toEqual(NodeTypes.Junction);
      expect(results.nodes[8].type).toEqual(NodeTypes.Junction);
    });

    test('get type for reservoirs', () => {
      const bin = getBinaryResults();

      const { results } = readBinary(bin);

      expect(results.nodes[9].type).toEqual(NodeTypes.Reservoir);
    });

    test('get type for tanks', () => {
      const bin = getBinaryResults();

      const { results } = readBinary(bin);

      expect(results.nodes[10].type).toEqual(NodeTypes.Tank);
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
