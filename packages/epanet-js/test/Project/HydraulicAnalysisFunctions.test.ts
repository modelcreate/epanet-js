import { Project, Workspace } from '../../src';
import { InitHydOption } from '../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../data/net1.inp', 'utf8');

const ws = new Workspace();

describe('Epanet Network Node Functions', () => {
  describe('Impliment Methods', () => {
    test('solve hydraulic run', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);

      model.open('net1.inp', 'net1.rpt', 'out.bin');
      model.solveH();
      model.saveH();

      const bin = ws.readFile('out.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);

      expect(epanetMagicNumber).toEqual(516114521);
    });
    test('step by step hydraulic run', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      model.openH();
      model.initH(InitHydOption.SaveAndInit);

      let tStep = Infinity;
      do {
        model.runH();
        tStep = model.nextH();
      } while (tStep > 0);

      model.saveH();
      model.closeH();

      const bin = ws.readFile('out.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);

      expect(epanetMagicNumber).toEqual(516114521);
      expect(tStep).toEqual(0);
    });
  });
});
