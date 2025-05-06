import { Project, Workspace } from "../../src";
import {
  NodeProperty,
  LinkProperty,
  RuleObject,
  RuleVariable,
  RuleOperator,
  RuleStatus,
} from "../../src/enum";

import fs from "fs";

const net1 = fs.readFileSync(__dirname + "/../data/net1.inp", "utf8");

describe("Epanet Rule-Based Control Functions", () => {
  let ws: Workspace;
  let model: Project;

  beforeEach(async () => {
    ws = new Workspace();
    await ws.loadModule();
    model = new Project(ws);
    ws.writeFile("net1.inp", net1);
    model.open("net1.inp", "report.rpt", "out.bin");
  });

  describe("Rule Management", () => {
    test("add and get rules", () => {
      // Add three rules
      const rule1 =
        "RULE 1 \n IF NODE 2 LEVEL < 100 \n THEN LINK 9 STATUS = OPEN";
      const rule2 =
        "RULE 2\nIF SYSTEM TIME = 4\nTHEN LINK 9 STATUS = CLOSED\nAND LINK 31 STATUS = CLOSED";
      const rule3 =
        "RULE 3\nIF NODE 23 PRESSURE ABOVE 140\nAND NODE 2 LEVEL > 120\nTHEN LINK 113 STATUS = CLOSED\nELSE LINK 22 STATUS = CLOSED";

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
      expect(model.getRuleId(1)).toBe("1");
      expect(model.getRuleId(2)).toBe("2");
      expect(model.getRuleId(3)).toBe("3");
    });

    test("get and set rule premises", () => {
      // Add a rule
      const rule = "RULE 1\nIF NODE 2 LEVEL < 100\nTHEN LINK 9 STATUS = OPEN";
      model.addRule(rule);

      // Get premise details
      const premise = model.getPremise(1, 1);
      expect(premise.object).toBe(RuleObject.Node);
      expect(premise.variable).toBe(RuleVariable.Level);
      expect(premise.relop).toBe(RuleOperator.LessThan);
      expect(premise.value).toBe(100);

      // Modify premise
      const nodeIndex = model.getNodeIndex("2");
      model.setPremise(
        1,
        1,
        0, // logop (AND)
        RuleObject.Node,
        nodeIndex,
        RuleVariable.Level,
        RuleOperator.LessThan,
        RuleStatus.IsClosed,
        90,
      );

      // Verify changes
      const updatedPremise = model.getPremise(1, 1);
      expect(updatedPremise.value).toBe(90);
    });

    test("get and set rule actions", () => {
      // Add a rule with THEN and ELSE actions
      const rule =
        "RULE 1\nIF NODE 2 LEVEL < 100\nTHEN LINK 9 STATUS = OPEN\nELSE LINK 9 STATUS = CLOSED";
      model.addRule(rule);

      // Get THEN action
      const thenAction = model.getThenAction(1, 1);
      expect(thenAction.status).toBe(RuleStatus.IsOpen);

      // Get ELSE action
      const elseAction = model.getElseAction(1, 1);
      expect(elseAction.status).toBe(RuleStatus.IsClosed);

      // Modify THEN action
      const linkIndex = model.getLinkIndex("9");
      model.setThenAction(1, 1, linkIndex, RuleStatus.IsClosed, 0.0);

      // Verify changes
      const updatedThenAction = model.getThenAction(1, 1);
      expect(updatedThenAction.status).toBe(RuleStatus.IsClosed);
    });

    test("delete rule", () => {
      // Add a rule
      const rule = "RULE 1\nIF NODE 2 LEVEL < 100\nTHEN LINK 9 STATUS = OPEN";
      model.addRule(rule);

      // Delete the rule
      model.deleteRule(1);

      // Verify rule was deleted
      expect(() => model.getRule(1)).toThrow();
    });

    test("set premise index and status", () => {
      // Add a rule
      const rule = "RULE 1\nIF NODE 2 LEVEL < 100\nTHEN LINK 9 STATUS = OPEN";
      model.addRule(rule);

      // Get initial premise
      const initialPremise = model.getPremise(1, 1);
      expect(initialPremise.object).toBe(RuleObject.Node);
      expect(initialPremise.objIndex).toBe(model.getNodeIndex("2"));

      // Change the premise index to a different node
      const newNodeIndex = model.getNodeIndex("23");
      model.setPremiseIndex(1, 1, newNodeIndex);

      // Verify the change
      const updatedPremise = model.getPremise(1, 1);
      expect(updatedPremise.objIndex).toBe(newNodeIndex);

      // Set premise status
      model.setPremiseStatus(1, 1, RuleStatus.IsOpen);
      const statusUpdatedPremise = model.getPremise(1, 1);
      expect(statusUpdatedPremise.status).toBe(RuleStatus.IsOpen);
    });

    test("set premise value", () => {
      // Add a rule
      const rule = "RULE 1\nIF NODE 2 LEVEL < 100\nTHEN LINK 9 STATUS = OPEN";
      model.addRule(rule);

      // Get initial premise value
      const initialPremise = model.getPremise(1, 1);
      expect(initialPremise.value).toBe(100);

      // Change the premise value
      const newValue = 150;
      model.setPremiseValue(1, 1, newValue);

      // Verify the change
      const updatedPremise = model.getPremise(1, 1);
      expect(updatedPremise.value).toBe(newValue);
    });

    test("set else action", () => {
      // Add a rule with ELSE clause
      const rule =
        "RULE 1\nIF NODE 2 LEVEL < 100\nTHEN LINK 9 STATUS = OPEN\nELSE LINK 9 STATUS = CLOSED";
      model.addRule(rule);

      // Get initial else action
      const initialElseAction = model.getElseAction(1, 1);
      expect(initialElseAction.status).toBe(RuleStatus.IsClosed);

      // Change the else action
      const linkIndex = model.getLinkIndex("9");
      model.setElseAction(1, 1, linkIndex, RuleStatus.IsOpen, 0.0);

      // Verify the change
      const updatedElseAction = model.getElseAction(1, 1);
      expect(updatedElseAction.status).toBe(RuleStatus.IsOpen);
    });

    test("set rule priority", () => {
      // Add two rules
      const rule1 = "RULE 1\nIF NODE 2 LEVEL < 100\nTHEN LINK 9 STATUS = OPEN";
      const rule2 =
        "RULE 2\nIF NODE 2 LEVEL > 130\nTHEN LINK 9 STATUS = CLOSED";
      model.addRule(rule1);
      model.addRule(rule2);

      // Get initial priorities
      const initialRule1 = model.getRule(1);
      const initialRule2 = model.getRule(2);
      expect(initialRule1.priority).toBe(0);
      expect(initialRule2.priority).toBe(0);

      // Set new priorities
      model.setRulePriority(1, 1);
      model.setRulePriority(2, 2);

      // Verify the changes
      const updatedRule1 = model.getRule(1);
      const updatedRule2 = model.getRule(2);
      expect(updatedRule1.priority).toBe(1);
      expect(updatedRule2.priority).toBe(2);
    });
  });

  describe("Rule Behavior", () => {
    test("rule affects simulation results", () => {
      // Add a rule to control tank level

      const rule1 =
        "RULE 1 \n IF NODE 2 LEVEL < 100 \n THEN LINK 9 STATUS = OPEN";
      const rule2 =
        "RULE 2 \n IF NODE 2 LEVEL > 130 \n THEN LINK 9 STATUS = CLOSED";

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
        const tankIndex = model.getNodeIndex("2");
        const linkIndex = model.getLinkIndex("9");
        const tankLevel = model.getNodeValue(tankIndex, NodeProperty.Pressure);
        const linkStatus = model.getLinkValue(linkIndex, LinkProperty.Status);

        // Store results for verification
        tankLevels.push(tankLevel);
        linkStatuses.push(linkStatus);

        // Verify tank level stays within control bounds
        expect(tankLevel / psiPerFeet).toBeGreaterThanOrEqual(109.9);
        expect(tankLevel / psiPerFeet).toBeLessThanOrEqual(130.2);
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
