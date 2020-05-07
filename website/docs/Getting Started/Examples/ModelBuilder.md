##

### New model builder API

Allows networks to be built completely from function calls instead of from an input file.

```js
import { Project, Workspace } from "epanet-js";

const ws = new Workspace();
const model = new Project(ws);

model.init("report.rpt", "out.bin", 0, 0);

const n1Index = model.addNode("N1", NodeType.Junction);
const n2Index = model.addNode("N2", NodeType.Junction);
model.setJunctionData(n1Index, 700, 0, "");
model.setJunctionData(n2Index, 400, 0, "");

const l1Index = model.addLink("L1", LinkType.Pipe, "N1", "N2");
```
