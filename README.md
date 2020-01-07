# EPANET-JS

![](https://github.com/modelcreate/epanet-js/workflows/CI/badge.svg) [![codecov](https://codecov.io/gh/modelcreate/epanet-js/branch/master/graph/badge.svg)](https://codecov.io/gh/modelcreate/epanet-js)

Water distribution system modelling, either in the browser or Node. Uses the full Open Water Analytics EPANET 2.2 toolkit compiled to Javascript.

## Install

```
$ npm install epanet-js
```


## Usage
### Existing INP File

```js
import {Project, Workspace} from 'epanet-js'

const ws = new Workspace();
const model = new Project(ws);

const net1 = '' // <-- Full INP File
ws.writeFile('net1.inp', net1);

model.open('net1.inp', 'report.rpt', 'out.bin');
model.solveH()

model.close()
```


### New model builder API

```js
import {Project, Workspace} from 'epanet-js'

const ws = new Workspace();
const model = new Project(ws);

model.init('report.rpt', 'out.bin', 0, 0);

const n1Index = model.addNode('N1', NodeType.Junction);
const n2Index = model.addNode('N2', NodeType.Junction);
model.setJunctionData(n1Index, 700, 0, '');
model.setJunctionData(n2Index, 400, 0, '');

const l1Index = model.addLink('L1',LinkType.Pipe,'N1','N2')
```
