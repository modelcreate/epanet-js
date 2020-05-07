---
title: Installing epanet-js
sidebar_label: Getting Started
---

## Install

To install the stable version with npm:

```
$ npm install epanet-js
```

or with yarn:

```
$ yarn add epanet-js
```

For those without a module bundler, the epanet-js package will soon be available on unpkg as a precompiled UMD build. This will allow you to drop a UMD build in a `<script>` tag on your page and access it on the window.epanetJs global variable.

## Usage

### Load and run an existing inp File

[Run this example on CodeSandbox](https://codesandbox.io/embed/musing-chandrasekhar-7tp1y?fontsize=14&hidenavigation=1&module=%2Fsrc%2Findex.js&theme=dark)

```js
import { Project, Workspace } from "epanet-js";
import fs from "fs";

// Read an existing inp file from the disk
const net1 = fs.readFileSync("net1.inp");

// Initialise a new Workspace and Project object
const ws = new Workspace();
const model = new Project(ws);

// Write a copy of the inp file to the workspace
ws.writeFile("net1.inp", net1);

// Runs toolkit methods: EN_open, EN_solveH & EN_close
model.open("net1.inp", "report.rpt", "out.bin");
model.solveH();
model.close();
```

**_More Examples_**

- [Step through the hydraulic simulation](https://github.com/modelcreate/epanet-js/wiki/Examples#step-through-the-hydraulic-simulation)
- [New model builder API](https://github.com/modelcreate/epanet-js/wiki/Examples#new-model-builder-api)
- [Fire Flow Analysis using React](https://github.com/modelcreate/epanet-js/wiki/Examples#fire-flow-analysis---react-example)
- [Float valves using React Code (WIP)](https://github.com/modelcreate/epanet-js-float-valve-example) - [Demo](https://modelcreate.github.io/epanet-js-float-valve-example/)

## Guide

- [Step through the hydraulic simulation](#step-through-the-hydraulic-simulation)
- [New model builder API](#new-model-builder-api)
- [Fire Flow Analysis - React Example](#fire-flow-analysis---react-example)
