import { Project, Workspace } from '../../src';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../data/net1.inp', 'utf8');

const ws = new Workspace();

describe('Epanet Water Quality Functions', () => {
  describe('Impliment Methods', () => {
    test('solve hydraulic & WQ run', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);

      model.open('net1.inp', 'net1.rpt', 'out.bin');
      model.solveH();
      model.solveQ();

      expect(1).toEqual(1); //Lets just see if it completes
    });
    test('step by step WQ run', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.open('net1.inp', 'report.rpt', 'out.bin');

      model.solveH();

      model.openQ();
      model.initQ(0);

      let tStep = Infinity;
      do {
        model.runQ();
        tStep = model.nextQ();
      } while (tStep > 0);

      model.closeQ();

      const bin = ws.readFile('out.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);

      expect(epanetMagicNumber).toEqual(516114521);
      expect(tStep).toEqual(0);
    });
    test('reuse hydraulic run for WQ run', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);

      model.open('net1.inp', 'net1.rpt', 'out.bin');
      model.solveH();
      model.saveHydFile('hydFile.out');
      model.close();

      const model2 = new Project(ws);
      model2.open('net1.inp', 'net1-2.rpt', 'out-2.bin');
      model2.useHydFile('hydFile.out');
      model2.solveQ();

      expect(1).toEqual(1); //Lets just see if it completes
    });
  });
});
