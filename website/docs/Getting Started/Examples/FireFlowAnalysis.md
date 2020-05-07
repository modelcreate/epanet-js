##

### Fire Flow Analysis - React Example

A more complex example that uses React.

Select a node within a network, run an extended period simulation and conduct a fire flow test. Results displayed in a graph for pressure and the fire flow.

<img src="https://raw.githubusercontent.com/modelcreate/epanet-js/master/website/static/img/FireFlowExample.png" alt="placeholder" height="300"/>

[Run this example on CodeSandbox](https://codesandbox.io/embed/musing-jang-sqhk1?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark)

```jsx
import React, { useState } from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory";
import {
  Project,
  Workspace,
  InitHydOption,
  NodeProperty,
  CountType,
  NodeType,
} from "epanet-js";
var fs = require("fs");

const net1 = fs.readFileSync("net1.inp");

const ws = new Workspace();
const model = new Project(ws);

ws.writeFile("net1.inp", net1);
model.open("net1.inp", "report.rpt", "out.bin");

function getNodes() {
  const nodeCount = model.getCount(CountType.NodeCount);
  let nodeIds = [];
  for (let i = 1; i < nodeCount; i++) {
    if (model.getNodeType(i) === NodeType.Junction) {
      const nodeId = model.getNodeId(i);
      nodeIds.push(nodeId);
    }
  }
  return nodeIds;
}

function runSim(nodeId) {
  const fireFlowNodeIndex = model.getNodeIndex(nodeId);
  const flows = [100, 250, 500, 750, 1000];

  model.openH();
  model.initH(InitHydOption.NoSave);

  let tStep = Infinity;
  let flowAndPressure = [];
  let fireResults = [];
  do {
    const cTime = model.runH();
    const pressure = model.getNodeValue(
      fireFlowNodeIndex,
      NodeProperty.Pressure
    );

    flowAndPressure.push({ x: cTime / 60 / 60, y: pressure });
    if (cTime === 46800) {
      fireResults = fireFlowAnalysis(model, fireFlowNodeIndex, flows, pressure);
      model.runH(); // Rerun original snapshot
    }

    tStep = model.nextH();
  } while (tStep > 0);

  model.closeH();

  return {
    flowAndPressure,
    fireResults,
  };
}

function fireFlowAnalysis(model, index, flows, zeroPressure) {
  const acc = [{ x: 0, y: zeroPressure }];

  const orgBaseFlow = model.getNodeValue(index, NodeProperty.BaseDemand);

  const pressures = flows.reduce((acc, flow) => {
    model.setNodeValue(index, NodeProperty.BaseDemand, orgBaseFlow + flow);
    model.runH();
    const pressure = model.getNodeValue(index, NodeProperty.Pressure);
    return acc.concat([{ x: flow, y: pressure }]);
  }, acc);

  model.setNodeValue(index, NodeProperty.BaseDemand, orgBaseFlow);
  return pressures;
}

function SmallChart(props) {
  return (
    <VictoryChart theme={VictoryTheme.material} height={175}>
      <VictoryAxis
        style={{
          axisLabel: { fontSize: 8, padding: 30 },
          tickLabels: { fontSize: 6, padding: 5 },
        }}
        label={props.xLabel}
      />
      <VictoryAxis
        style={{
          axisLabel: { fontSize: 8, padding: 30 },
          tickLabels: { fontSize: 6, padding: 5 },
        }}
        dependentAxis
        label={props.yLabel}
      />
      <VictoryLine data={props.data} />
    </VictoryChart>
  );
}

export default function App() {
  const [nodeId, setNodeId] = useState("11");

  function handleSelectChange(e) {
    setNodeId(e.target.value);
  }

  const nodeIds = getNodes();
  const { flowAndPressure, fireResults } = runSim(nodeId);

  return (
    <div className="App">
      <h1>epanet-js React Fire Flow Example</h1>
      <h2>Select a node to test</h2>
      <select value={nodeId} onChange={handleSelectChange}>
        {nodeIds.map((n, i) => {
          return (
            <option key={i} value={n}>
              {n}
            </option>
          );
        })}
      </select>
      <h3>Fireflow at Node {nodeId}</h3>
      <SmallChart
        data={fireResults}
        xLabel="Flow (GPM)"
        yLabel="Pressure (psi)"
      />

      <h3>Pressure at Node {nodeId}</h3>
      <SmallChart
        data={flowAndPressure}
        xLabel="Time (hours)"
        yLabel="Pressure (psi)"
      />
    </div>
  );
}
```
