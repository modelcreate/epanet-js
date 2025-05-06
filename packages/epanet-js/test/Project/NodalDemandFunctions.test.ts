import { Project, Workspace } from "../../src";
import { NodeType, DemandModel, FlowUnits, HeadLossType } from "../../src/enum";
import { readFileSync } from "fs";
import { join } from "path";

const net1 = readFileSync(join(__dirname, "../data/net1.inp"), "utf8");

const ws = new Workspace();
await ws.loadModule();

describe("Nodal Demand Functions", () => {
  let model: Project;

  beforeEach(() => {
    model = new Project(ws);
  });

  afterEach(() => {
    model.close();
  });

  describe("Basic Demand Operations", () => {
    test("should add and delete demands", () => {
      model.init("report.rpt", "out.bin", FlowUnits.LPS, HeadLossType.HW);

      // Create node
      const nodeIndex = model.addNode("J1", NodeType.Junction);
      model.setJunctionData(nodeIndex, 700, 0, "");

      // Create demand pattern
      model.addPattern("Hospital");
      model.addPattern("Commercial");
      // Add first demand
      model.addDemand(nodeIndex, 100, "Hospital", "LargeUser1");
      expect(model.getNumberOfDemands(nodeIndex)).toEqual(2);

      // Add second demand
      model.addDemand(nodeIndex, 50, "Commercial", "LargeUser2");
      expect(model.getNumberOfDemands(nodeIndex)).toEqual(3);

      // Verify demand properties
      const demand1Index = model.getDemandIndex(nodeIndex, "LargeUser1");
      const demand2Index = model.getDemandIndex(nodeIndex, "LargeUser2");

      expect(model.getBaseDemand(nodeIndex, demand1Index)).toEqual(100);
      expect(model.getBaseDemand(nodeIndex, demand2Index)).toEqual(50);

      // Delete first demand
      model.deleteDemand(nodeIndex, demand1Index);
      expect(model.getNumberOfDemands(nodeIndex)).toEqual(2);
    });

    test("should set and get demand properties", () => {
      model.init("report.rpt", "out.bin", FlowUnits.LPS, HeadLossType.HW);

      model.addPattern("Residential");
      model.addPattern("Residentialv2");
      model.getPatternIndex("Residential");
      const patternIndex2 = model.getPatternIndex("Residentialv2");

      // Create node and demand
      const nodeIndex = model.addNode("J1", NodeType.Junction);
      model.setJunctionData(nodeIndex, 700, 0, "");
      model.addDemand(nodeIndex, 100, "Residential", "Residential");

      // Get demand index
      const demandIndex = model.getDemandIndex(nodeIndex, "Residential");

      // Set and verify base demand
      model.setBaseDemand(nodeIndex, demandIndex, 150);
      expect(model.getBaseDemand(nodeIndex, demandIndex)).toEqual(150);

      // Set and verify demand name
      model.setDemandName(nodeIndex, demandIndex, "Updated");
      expect(model.getDemandName(nodeIndex, demandIndex)).toEqual("Updated");

      // Set and verify demand pattern
      model.setDemandPattern(nodeIndex, demandIndex, patternIndex2);
      expect(model.getDemandPattern(nodeIndex, demandIndex)).toEqual(2);
    });
  });

  describe("Demand Model Operations", () => {
    test("should set and get demand model", () => {
      model.init("report.rpt", "out.bin", FlowUnits.LPS, HeadLossType.HW);

      // Set demand model
      model.setDemandModel(DemandModel.PDA, 20, 25, 0.5);

      // Get and verify demand model
      const modelData = model.getDemandModel();
      expect(modelData.type).toEqual(DemandModel.PDA);
      expect(modelData.pmin).toEqual(20);
      expect(modelData.preq).toEqual(25);
      expect(modelData.pexp).toEqual(0.5);
    });

    test("should handle multiple demand models", () => {
      model.init("report.rpt", "out.bin", FlowUnits.LPS, HeadLossType.HW);

      // Test DDA model
      model.setDemandModel(DemandModel.DDA, 0, 0, 0);
      let modelData = model.getDemandModel();
      expect(modelData.type).toEqual(DemandModel.DDA);

      // Test PDA model
      model.setDemandModel(DemandModel.PDA, 20, 30, 0.5);
      modelData = model.getDemandModel();
      expect(modelData.type).toEqual(DemandModel.PDA);
    });
  });

  describe("Real-world Data Tests", () => {
    test("should handle demands from net1.inp", () => {
      ws.writeFile("net1.inp", net1);
      model.open("net1.inp", "report.rpt", "out.bin");

      // Test junction with demand
      const junctionIndex = model.getNodeIndex("11");
      expect(model.getNumberOfDemands(junctionIndex)).toEqual(3);

      // Test junction without demand (based demand only)
      const junctionIndex2 = model.getNodeIndex("10");
      expect(model.getNumberOfDemands(junctionIndex2)).toEqual(1);
    });

    test("should handle demand patterns from net1.inp", () => {
      ws.writeFile("net1.inp", net1);
      model.open("net1.inp", "report.rpt", "out.bin");

      // Test junction with pattern
      const junctionIndex = model.getNodeIndex("11");
      const demandIndex = 1; // First demand
      const patternIndex = model.getDemandPattern(junctionIndex, demandIndex);
      expect(patternIndex).toEqual(1);
    });
  });
});
