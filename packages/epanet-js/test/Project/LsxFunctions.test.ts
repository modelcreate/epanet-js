import { beforeAll, beforeEach, describe, it, expect, vi } from "vitest";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join } from "path";

import { Project } from "../../src";
import { Workspace } from "../../src";
import { EpanetEngine as EpanetEngineV235LSX } from "../../src/engines/v2.3.5-lsx";
import { NodeProperty } from "../../src/enum";

const networkLsx = readFileSync(join(__dirname, "../data/network_lsx.inp"));
const networkNoScript = readFileSync(join(__dirname, "../data/net1.inp"));

describe("EPANET-LSX (v2.3.5-lsx) Lua scripting", () => {
  let ws: Workspace;

  beforeEach(async () => {
    ws = new Workspace();
    await ws.loadModuleVersion(EpanetEngineV235LSX);
  });

  it("runs an embedded Lua [SCRIPT] that controls the network", () => {
    ws.writeFile("net.inp", networkLsx);

    const model = new Project(ws);
    model.open("net.inp", "net.rpt", "net.out");
    model.solveH();

    const nodeIndex = model.getNodeIndex("J126");
    const pressure = model.getNodeValue(nodeIndex, NodeProperty.Pressure);
    expect(pressure).toBeCloseTo(25.0, 2);

    model.close();
  });

  it("behaves like stock EPANET for a network with no [SCRIPT]", () => {
    ws.writeFile("net.inp", networkNoScript);

    const model = new Project(ws);
    expect(() => {
      model.open("net.inp", "net.rpt", "net.out");
      model.solveH();
      model.close();
    }).not.toThrow();
  });
});

beforeAll(() => {
  vi.stubGlobal("fetch", async (url: string) => {
    const filePath = fileURLToPath(url);
    const nodeBuffer = readFileSync(filePath);
    const arrayBuffer = nodeBuffer.buffer.slice(
      nodeBuffer.byteOffset,
      nodeBuffer.byteOffset + nodeBuffer.byteLength,
    );
    return {
      ok: true,
      arrayBuffer: () => Promise.resolve(arrayBuffer),
    };
  });
});
