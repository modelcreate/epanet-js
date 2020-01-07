# 💧EPANET-JS

<img src="https://app.modelcreate.com/images/auth.jpg" alt="placeholder" height="200" align="right"/>

![](https://github.com/modelcreate/epanet-js/workflows/CI/badge.svg) [![codecov](https://codecov.io/gh/modelcreate/epanet-js/branch/master/graph/badge.svg)](https://codecov.io/gh/modelcreate/epanet-js) ![npm](https://img.shields.io/npm/v/epanet-js) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)



Water distribution system modelling, either in the browser or Node. Uses the Open Water Analytics EPANET v2.2 toolkit compiled to Javascript.

> **Note**: All version before 1.0.0 should be considered beta with potential breaking changes between releases, use in production with caution.

<p align="center">
  <a href="#install">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#about">About</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#build">Build</a> •
  <a href="#examples">Examples</a> •
  <a href="#featured-apps">Featured Apps</a> •
  <a href="#api">API</a> •
  <a href="#license">License</a>
</p>


## Install
To install the stable version with npm:

```
$ npm install epanet-js
```

or with yarn:

```
$ yarn add epanet-js
```

For those without a module bundler, the epanet-js package will also be available on unpkg as a precompiled production and development UMD builds. This will allow you to drop a UMD build in a `<script>` tag on the page and access it on the window.epanetJs global variable.


## Usage
### Load and run an existing inp File

```js
import {Project, Workspace} from 'epanet-js'
import fs from 'fs

// Read an existing inp file from the disk
const net1 = fs.readFileSync('net1.inp')

// Initialise a new Workspace and Project object
const ws = new Workspace();
const model = new Project(ws);

// Write a copy of the inp file to the workspace
ws.writeFile('net1.inp', net1);

// Runs toolkit methods: EN_open, EN_solveH & EN_close
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

## About

Infomation about what this library is for, how people can use it and how its being used currently.

### Roadmap

Reaching version 1.0.0 is the current focus, the first non-beta version will have API stability and have mirrored functions of each method in the EPANET Toolkit.

Planned also are additional helper classes and an object-oriented wrapper to allow simpler development of applications using the EPANET engine.

#### Version 1.0.0
- [x] All EPANET Toolkit 2.2 methods implimented
- [ ] Full test coverage
- [ ] Document API

#### Additional work to be done
* Read result bin file
* Object-oriented wrapper for the toolkit functions
* Website & documentation
* Examples

## Build

## Examples

## Featured Apps

## API


## License
The epanet-js and @model-create/epanet-engine are [MIT licenced](https://github.com/modelcreate/epanet-js/blob/master/LICENSE).

The hydraulic engine used within the epanet-js library is [OWA-EPANET](https://github.com/OpenWaterAnalytics/EPANET), which is [MIT licenced](https://github.com/OpenWaterAnalytics/EPANET/blob/dev/LICENSE), with contributed by the following [authors](https://github.com/OpenWaterAnalytics/EPANET/blob/dev/AUTHORS).

