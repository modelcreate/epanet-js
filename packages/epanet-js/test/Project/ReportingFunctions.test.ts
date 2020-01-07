import { Project, Workspace } from '../../src';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../data/net1.inp', 'utf8');

const ws = new Workspace();

describe('Epanet Network Node Functions', () => {
  describe('Impliment Methods', () => {
    ws.writeFile('net1.inp', net1);
    const model = new Project(ws);

    test('clear report', () => {
      model.open('net1.inp', 'net1.rpt', 'out.bin');
      model.solveH();
      const rpt = ws.readFile('net1.rpt');
      expect(rpt.length).toBeGreaterThan(0);

      model.clearReport();

      const rpt2 = ws.readFile('net1.rpt');
      expect(rpt2).toEqual('');
    });

    test('write line', () => {
      model.open('net1.inp', 'net2.rpt', 'out2.bin');
      model.solveH();

      model.writeLine('Test New Line');
      model.copyReport('test.rpt');

      const rpt2 = ws.readFile('test.rpt');
      expect(rpt2.slice(-13)).toEqual('Test New Line');
    });
  });
});
