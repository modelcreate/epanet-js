import { Project, Workspace } from '../../src';
import { InitHydOption } from '../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../data/net1.inp', 'utf8');
const net2 = fs.readFileSync(
  __dirname + '/../data/AllElementsSmallNetwork.inp',
  'utf8'
);

const ws = new Workspace();

describe('Epanet Hydraulic Analysis Functions', () => {
  describe('Simple Hydraulic Methods', () => {
    test('solve hydraulic run', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);

      model.open('net1.inp', 'net1.rpt', 'out.bin');
      model.solveH();
      model.saveH();

      const bin = ws.readFile('out.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);

      expect(epanetMagicNumber).toEqual(516114521);
      model.close();
    });
    test('step by step hydraulic run', () => {
      ws.writeFile('net2.inp', net1);
      const model = new Project(ws);
      model.open('net2.inp', 'report2.rpt', 'out2.bin');

      model.openH();
      model.initH(InitHydOption.SaveAndInit);

      let tStep = Infinity;
      do {
        model.runH();
        tStep = model.nextH();
      } while (tStep > 0);

      model.saveH();
      model.closeH();

      const bin = ws.readFile('out2.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);

      expect(epanetMagicNumber).toEqual(516114521);
      expect(tStep).toEqual(0);
    });
  });

  describe('Previously failing models in epanet-js', () => {
    test('solve a single hydraulic run', () => {
      ws.writeFile('net1.inp', net2);
      const model = new Project(ws);

      model.open('net1.inp', 'net1.rpt', 'out.bin');
      model.solveH();
      model.saveH();

      const bin = ws.readFile('out.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);

      expect(epanetMagicNumber).toEqual(516114521);
      model.close();
    });
    test('solve two hydraulic runs in same workspace', () => {
      ws.writeFile('net2.inp', net2);
      const model = new Project(ws);
      model.open('net2.inp', 'report2.rpt', 'out2.bin');

      model.openH();
      model.initH(InitHydOption.SaveAndInit);

      let tStep = Infinity;
      do {
        model.runH();
        tStep = model.nextH();
      } while (tStep > 0);

      model.saveH();
      model.closeH();

      const bin = ws.readFile('out2.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);

      expect(epanetMagicNumber).toEqual(516114521);
      expect(tStep).toEqual(0);

      const ws2 = new Workspace();
      ws2.writeFile('net3.inp', net2);

      const model2 = new Project(ws2);

      model2.open('net3.inp', 'report3.rpt', 'out3.bin');

      model2.openH();
      model2.initH(InitHydOption.SaveAndInit);

      tStep = Infinity;
      do {
        model2.runH();
        tStep = model2.nextH();
      } while (tStep > 0);

      model2.saveH();
      model2.closeH();

      const bin2 = ws.readFile('out3.bin', 'binary');
      const epanetMagicNumber2 = new DataView(bin2.buffer).getInt32(0, true);

      expect(epanetMagicNumber2).toEqual(516114521);
      expect(tStep).toEqual(0);
    });
  });
});
