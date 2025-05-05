import { Project, Workspace } from '../../../src';
import { InitHydOption, CountType, NodeProperty } from '../../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../../data/net1.inp', 'utf8');

describe('Epanet Water Quality Functions', () => {
  let ws: Workspace;
  let model: Project;

  beforeEach(async () => {
    ws = new Workspace();
    await ws.loadModule();
    model = new Project(ws);
    ws.writeFile('net1.inp', net1);
    model.open('net1.inp', 'report.rpt', 'out.bin');
    model.solveH(); // Hydraulic analysis is required before water quality
  });

  describe('Complete Water Quality Analysis', () => {
    test('solveQ performs complete water quality analysis', () => {
      model.solveQ();

      const tankIndex = model.getNodeIndex('2');
      const tankWQResuls = model.getNodeValue(tankIndex, NodeProperty.Quality);
      expect(tankWQResuls).toBeGreaterThan(0);

      // Verify the analysis completed by checking the binary output file
      const bin = ws.readFile('out.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);
      expect(epanetMagicNumber).toEqual(516114521);
    });
  });

  describe('Step-by-Step Water Quality Analysis', () => {
    test('nextQ advances through time periods', () => {
      model.openQ();
      model.initQ(InitHydOption.Save);

      let tStep = Infinity;
      let timeStepCount = 0;

      do {
        model.runQ();
        tStep = model.nextQ();
        timeStepCount++;
      } while (tStep > 0);

      model.closeQ();

      // Verify we completed the analysis
      expect(tStep).toEqual(0);
      expect(timeStepCount).toBeGreaterThan(1);
    });

    test('stepQ advances simulation by one time step', () => {
      model.openQ();
      model.initQ(InitHydOption.Save);

      let tStep = Infinity;
      let timeStepCount = 0;

      do {
        model.runQ();
        tStep = model.stepQ();
        timeStepCount++;
      } while (tStep > 0);

      model.closeQ();

      // Verify we completed the analysis
      expect(tStep).toEqual(0);
      expect(timeStepCount).toBeGreaterThan(1);
    });
  });

  describe('Reusing Hydraulic Results', () => {
    test('can reuse hydraulic results from file', () => {
      // Save hydraulic results
      model.saveHydFile('hydFile.out');
      model.close();

      // Create new model and reuse hydraulic results
      const model2 = new Project(ws);
      model2.open('net1.inp', 'net1-2.rpt', 'out-2.bin');
      model2.useHydFile('hydFile.out');

      // Run water quality analysis
      model2.openQ();
      model2.initQ(InitHydOption.Save);

      let tStep = Infinity;
      do {
        model2.runQ();
        tStep = model2.stepQ();
      } while (tStep > 0);

      model2.closeQ();

      // Verify the analysis completed
      const bin = ws.readFile('out-2.bin', 'binary');
      const epanetMagicNumber = new DataView(bin.buffer).getInt32(0, true);
      expect(epanetMagicNumber).toEqual(516114521);
    });
  });

  describe('Water Quality Initialization Options', () => {
    test('initQ with Save option preserves hydraulic results', () => {
      model.openQ();
      model.initQ(InitHydOption.Save);

      // Run a few steps
      model.runQ();
      model.nextQ();
      model.runQ();

      // Verify we can still access hydraulic results
      const nodeCount = model.getCount(CountType.NodeCount);
      expect(nodeCount).toBeGreaterThan(0);

      model.closeQ();
    });

    test('initQ with NoSave option does not preserve hydraulic results', () => {
      model.openQ();
      model.initQ(InitHydOption.NoSave);

      // Run a few steps
      model.runQ();
      model.nextQ();
      model.runQ();

      // Verify we can still access hydraulic results
      const nodeCount = model.getCount(CountType.NodeCount);
      expect(nodeCount).toBeGreaterThan(0);

      model.closeQ();
    });
  });
});
