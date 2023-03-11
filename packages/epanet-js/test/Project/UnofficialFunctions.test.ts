import { Project, Workspace } from '../../src';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../data/net1.inp', 'utf8');

const ws = new Workspace();

describe('Epanet Unofficial Functions', () => {
  describe('First Batch', () => {
    test('returns the correct value', () => {
      ws.writeFile('net1.inp', net1);

      const model = new Project(ws);

      model.open('net1.inp', 'report.rpt', 'out.bin');
      const nodeIndexWithControl = model.getNodeIndex('2');
      const withControl = model.UNOFFICIAL_isnodeincontrol(
        nodeIndexWithControl
      );

      const nodeIndexWithOutControl = model.getNodeIndex('10');
      const withOutControl = model.UNOFFICIAL_isnodeincontrol(
        nodeIndexWithOutControl
      );

      expect(withControl).toEqual(1);
      expect(withOutControl).toEqual(0);
    });
  });
});
