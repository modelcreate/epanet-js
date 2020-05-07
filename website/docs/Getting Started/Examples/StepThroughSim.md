### Step through the hydraulic simulation

Use the openH - initH - runH - nextH - closeH series of functions to step through the simulation one hydraulic time step at a time.

[Run this example on CodeSandbox](https://codesandbox.io/embed/long-flower-npqiq?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Findex.js&theme=dark)

```js
const { Project, Workspace } = require("epanet-js");
var fs = require("fs");

const net1 = fs.readFileSync("net1.inp");

const ws = new Workspace();
const model = new Project(ws);

ws.writeFile("net1.inp", net1);

model.open("net1.inp", "report.rpt", "out.bin");

const n11Index = model.getNodeIndex("11");

model.openH();
model.initH(11);

let tStep = Infinity;
do {
  const cTime = model.runH();
  const pressure = model.getNodeValue(n11Index, 11);
  console.log(
    `Current Time: - ${cTime}, Node 11 Pressure: ${pressure.toFixed(2)}`
  );

  tStep = model.nextH();
} while (tStep > 0);

model.saveH();
model.closeH();
```
