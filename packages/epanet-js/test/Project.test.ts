import { Project, Workspace } from "../src";
import { NodeType, NodeProperty } from "../src/enum";

const workspace = new Workspace();
await workspace.loadModule();

describe("Epanet Project", () => {
  describe("Project Initialization", () => {
    test("throw error if module not loaded", async () => {
      const newWorkspace = new Workspace();
      const model = new Project(newWorkspace);

      expect(() => model.init("report.rpt", "out.bin", 0, 0)).toThrow(
        "EPANET engine not loaded. Call loadModule() on the Workspace first.",
      );
      await newWorkspace.loadModule();
      expect(() => model.init("report.rpt", "out.bin", 0, 0)).not.toThrow();
    });
  });
  describe("addNode", () => {
    test("should throw without a network init", () => {
      function catchError() {
        const model = new Project(workspace);
        model.addNode("J1", NodeType.Junction);
      }

      expect(catchError).toThrow("102");
    });

    test("add new node with properties", () => {
      const model = new Project(workspace);
      model.init("report.rpt", "out.bin", 0, 0);
      const nodeId = model.addNode("J1", NodeType.Junction);
      model.setJunctionData(nodeId, 700, 0, "");

      const nodeType = model.getNodeType(nodeId);
      expect(nodeType).toEqual(NodeType.Junction);

      const elev = model.getNodeValue(nodeId, NodeProperty.Elevation);
      expect(elev).toEqual(700);
    });
  });
});
