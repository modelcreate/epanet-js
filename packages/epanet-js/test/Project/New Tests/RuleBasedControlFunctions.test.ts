import { Project, Workspace } from '../../../src';
import {
  NodeProperty,
  LinkProperty,
  RuleObject,
  RuleVariable,
  RuleOperator,
  RuleStatus,
} from '../../../src/enum';

import fs from 'fs';

const net1 = fs.readFileSync(__dirname + '/../../data/net1.inp', 'utf8');

describe('Epanet Rule-Based Control Functions', () => {
  let ws: Workspace;
  let model: Project;

  beforeEach(async () => {
    ws = new Workspace();
    await ws.loadModule();
    model = new Project(ws);
    ws.writeFile('net1.inp', net1);
    model.open('net1.inp', 'report.rpt', 'out.bin');
  });

  describe('Rule Management', () => {
    test('add and get rules', () => {
      // Add three rules
      const rule1 =
        'RULE 1 \n IF NODE 2 LEVEL < 100 \n THEN LINK 9 STATUS = OPEN';
      const rule2 =
        'RULE 2\nIF SYSTEM TIME = 4\nTHEN LINK 9 STATUS = CLOSED\nAND LINK 31 STATUS = CLOSED';
      const rule3 =
        'RULE 3\nIF NODE 23 PRESSURE ABOVE 140\nAND NODE 2 LEVEL > 120\nTHEN LINK 113 STATUS = CLOSED\nELSE LINK 22 STATUS = CLOSED';

      model.addRule(rule1);
      model.addRule(rule2);
      model.addRule(rule3);

      // Verify rules were added
      const rule1Info = model.getRule(1);
      const rule2Info = model.getRule(2);
      const rule3Info = model.getRule(3);

      expect(rule1Info.premiseCount).toBeGreaterThan(0);
      expect(rule2Info.premiseCount).toBeGreaterThan(0);
      expect(rule3Info.premiseCount).toBeGreaterThan(0);

      // Verify rule IDs
      expect(model.getRuleId(1)).toBe('1');
      expect(model.getRuleId(2)).toBe('2');
      expect(model.getRuleId(3)).toBe('3');
    });

    test('get and set rule premises', () => {
      // Add a rule
      const rule = 'RULE 1\nIF NODE 2 LEVEL < 100\nTHEN LINK 9 STATUS = OPEN';
      model.addRule(rule);

      // Get premise details
      const premise = model.getPremise(1, 1);
      expect(premise.object).toBe(RuleObject.Node);
      expect(premise.variable).toBe(RuleVariable.Level);
      expect(premise.relop).toBe(RuleOperator.LessThan);
      expect(premise.value).toBe(100);

      // Modify premise
      const nodeIndex = model.getNodeIndex('2');
      model.setPremise(
        1,
        1,
        0, // logop (AND)
        RuleObject.Node,
        nodeIndex,
        RuleVariable.Level,
        RuleOperator.LessThan,
        RuleStatus.IsClosed,
        90
      );

      // Verify changes
      const updatedPremise = model.getPremise(1, 1);
      expect(updatedPremise.value).toBe(90);
    });

    test('get and set rule actions', () => {
      // Add a rule with THEN and ELSE actions
      const rule =
        'RULE 1\nIF NODE 2 LEVEL < 100\nTHEN LINK 9 STATUS = OPEN\nELSE LINK 9 STATUS = CLOSED';
      model.addRule(rule);

      // Get THEN action
      const thenAction = model.getThenAction(1, 1);
      expect(thenAction.status).toBe(RuleStatus.IsOpen);

      // Get ELSE action
      const elseAction = model.getElseAction(1, 1);
      expect(elseAction.status).toBe(RuleStatus.IsClosed);

      // Modify THEN action
      const linkIndex = model.getLinkIndex('9');
      model.setThenAction(1, 1, linkIndex, RuleStatus.IsClosed, 0.0);

      // Verify changes
      const updatedThenAction = model.getThenAction(1, 1);
      expect(updatedThenAction.status).toBe(RuleStatus.IsClosed);
    });

    test('delete rule', () => {
      // Add a rule
      const rule = 'RULE 1\nIF NODE 2 LEVEL < 100\nTHEN LINK 9 STATUS = OPEN';
      model.addRule(rule);

      // Delete the rule
      model.deleteRule(1);

      // Verify rule was deleted
      expect(() => model.getRule(1)).toThrow();
    });
  });

  describe('Rule Behavior', () => {
    test('rule affects simulation results', () => {
      // Add a rule to control tank level

      const rule1 =
        'RULE 1 \n IF NODE 2 LEVEL < 100 \n THEN LINK 9 STATUS = OPEN';
      const rule2 =
        'RULE 2 \n IF NODE 2 LEVEL > 130 \n THEN LINK 9 STATUS = CLOSED';

      model.addRule(rule1);
      model.addRule(rule2);

      // Initialize hydraulic analysis
      model.openH();
      model.initH(0);

      // Run step by step
      let tStep = Infinity;
      let stepCount = 0;
      const psiPerFeet = 0.4333;
      const tankLevels: number[] = [];
      const linkStatuses: number[] = [];

      do {
        // Run hydraulic analysis for current time step
        model.runH();
        tStep = model.nextH();
        stepCount++;

        // Get current tank level and link status
        const tankIndex = model.getNodeIndex('2');
        const linkIndex = model.getLinkIndex('9');
        const tankLevel = model.getNodeValue(tankIndex, NodeProperty.Pressure);
        const linkStatus = model.getLinkValue(linkIndex, LinkProperty.Status);

        // Store results for verification
        tankLevels.push(tankLevel);
        linkStatuses.push(linkStatus);

        // Verify tank level stays within control bounds
        expect(tankLevel / psiPerFeet).toBeGreaterThanOrEqual(109.9);
        expect(tankLevel / psiPerFeet).toBeLessThanOrEqual(130.3);
      } while (tStep > 0);

      // Close hydraulic analysis
      model.closeH();

      // Verify we completed the simulation
      expect(tStep).toEqual(0);
      expect(stepCount).toBeGreaterThan(1);

      // Verify we saw variation in tank levels and link statuses
      const minLevel = Math.min(...tankLevels);
      const maxLevel = Math.max(...tankLevels);
      expect(maxLevel - minLevel).toBeGreaterThan(0);

      const uniqueStatuses = new Set(linkStatuses);
      expect(uniqueStatuses.size).toBeGreaterThan(1);
    });
  });
});
