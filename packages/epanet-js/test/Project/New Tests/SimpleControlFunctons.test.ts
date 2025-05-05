import { Project, Workspace } from '../../../src';
import { ControlType, NodeProperty, LinkProperty } from '../../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../../data/net1.inp', 'utf8');

describe('Epanet Simple Control Functions', () => {
  let ws: Workspace;
  let model: Project;

  beforeEach(async () => {
    ws = new Workspace();
    await ws.loadModule();
    model = new Project(ws);
    ws.writeFile('net1.inp', net1);
    model.open('net1.inp', 'report.rpt', 'out.bin');
  });

  describe('Control Management', () => {
    test('add control for tank level', () => {
      // Get indices for the tank and link
      const tankIndex = model.getNodeIndex('2');
      const linkIndex = model.getLinkIndex('9');

      // Add a control to open the link when tank level is below 110
      const controlIndex = model.addControl(
        ControlType.LowLevel,
        linkIndex,
        1.0, // Open setting
        tankIndex,
        110.0 // Level
      );

      expect(controlIndex).toBeGreaterThan(0);

      // Verify the control was added correctly
      const control = model.getControl(controlIndex);
      expect(control.type).toEqual(ControlType.LowLevel);
      expect(control.linkIndex).toEqual(linkIndex);
      expect(control.setting).toEqual(1.0);
      expect(control.nodeIndex).toEqual(tankIndex);
      expect(control.level).toEqual(110.0);
    });

    test('add control for tank level with high level condition', () => {
      // Get indices for the tank and link
      const tankIndex = model.getNodeIndex('2');
      const linkIndex = model.getLinkIndex('9');

      // Add a control to close the link when tank level is above 140
      const controlIndex = model.addControl(
        ControlType.HiLevel,
        linkIndex,
        0.0, // Closed setting
        tankIndex,
        140.0 // Level
      );

      expect(controlIndex).toBeGreaterThan(0);

      // Verify the control was added correctly
      const control = model.getControl(controlIndex);
      expect(control.type).toEqual(ControlType.HiLevel);
      expect(control.linkIndex).toEqual(linkIndex);
      expect(control.setting).toEqual(0.0);
      expect(control.nodeIndex).toEqual(tankIndex);
      expect(control.level).toEqual(140.0);
    });

    test('delete control', () => {
      // Get indices for the tank and link
      const tankIndex = model.getNodeIndex('2');
      const linkIndex = model.getLinkIndex('9');

      // Add a control
      const controlIndex = model.addControl(
        ControlType.LowLevel,
        linkIndex,
        1.0,
        tankIndex,
        110.0
      );

      // Delete the control
      model.deleteControl(controlIndex);

      // Verify the control was deleted
      expect(() => model.getControl(controlIndex)).toThrow();
    });

    test('modify existing control', () => {
      // Get indices for the tank and link
      const tankIndex = model.getNodeIndex('2');
      const linkIndex = model.getLinkIndex('9');

      // Add a control
      const controlIndex = model.addControl(
        ControlType.LowLevel,
        linkIndex,
        1.0,
        tankIndex,
        110.0
      );

      // Modify the control
      model.setControl(
        controlIndex,
        ControlType.HiLevel,
        linkIndex,
        0.0,
        tankIndex,
        140.0
      );

      // Verify the control was modified
      const control = model.getControl(controlIndex);
      expect(control.type).toEqual(ControlType.HiLevel);
      expect(control.setting).toEqual(0.0);
      expect(control.level).toEqual(140.0);
    });
  });

  describe('Control Behavior', () => {
    test('control affects simulation results step by step', () => {
      // Get indices for the tank and link
      const tankIndex = model.getNodeIndex('2');
      const linkIndex = model.getLinkIndex('9');

      // Add controls for tank level
      model.addControl(ControlType.LowLevel, linkIndex, 1.0, tankIndex, 110.0);
      model.addControl(ControlType.HiLevel, linkIndex, 0.0, tankIndex, 120.0);

      // Initialize hydraulic analysis
      model.openH();
      model.initH(0);

      // Run step by step
      let tStep = Infinity;
      let stepCount = 0;
      const maxSteps = 100; // Prevent infinite loop
      const tankLevels: number[] = [];
      const linkStatuses: number[] = [];

      do {
        // Run hydraulic analysis for current time step
        model.runH();
        tStep = model.nextH();
        stepCount++;

        const psiPerFeet = 0.4333;

        // Get current tank level and link status
        const tankLevel = model.getNodeValue(tankIndex, NodeProperty.Pressure);
        const linkStatus = model.getLinkValue(linkIndex, LinkProperty.Status);

        // Store results for verification
        tankLevels.push(tankLevel / psiPerFeet);
        linkStatuses.push(linkStatus);

        // Verify tank level stays within control bounds
        expect(tankLevel / psiPerFeet).toBeGreaterThanOrEqual(109.9);
        expect(tankLevel / psiPerFeet).toBeLessThanOrEqual(120.1);
      } while (tStep > 0 && stepCount < maxSteps);

      // Close hydraulic analysis
      model.closeH();

      // Verify we completed the simulation
      expect(tStep).toEqual(0);
      expect(stepCount).toBeGreaterThan(1);

      // Verify we saw some variation in tank levels
      const minLevel = Math.min(...tankLevels);
      const maxLevel = Math.max(...tankLevels);
      expect(maxLevel - minLevel).toBeGreaterThan(0);

      // Verify we saw both open and closed states for the link
      const uniqueStatuses = new Set(linkStatuses);
      expect(uniqueStatuses.size).toBeGreaterThan(1);
    });
  });
});
