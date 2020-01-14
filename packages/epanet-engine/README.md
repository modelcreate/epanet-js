# 💧@model-create/EPANET-engine

Internal engine for [epanet-js](https://github.com/modelcreate/epanet-js), C source code for Open Water Analytics EPANET v2.2 toolkit compiled to Javascript.

> **Note**: All version before 1.0.0 should be considered beta with potential breaking changes between releases, use in production with caution.

## Build

epanet-js is split into two packages, the epanet-engine package which wraps the original C code in C++ and compiles it to JavaScript using Emscripten. And epanet-js is a TypeScript library which wraps over the generated module from Emscripten and manages memory allocation, error handling and returning of varaible.

**Building epanet-engine**

The first command `yarn run build:dockerimage` creates a docker container of Emscripten and the compiled OWA-EPANET source code, you can then run `yarn run build` to compile the C++ wrapper into Javascript.

```sh
cd packages/epanet-engine
yarn run build:dockerimage
yarn run build
```

**Building epanet-js**

You must first build epanet-engine before you can lint, test or build epanet-js.

```sh
cd packages/epanet-js
yarn run lint
yarn run test
yarn run build
```

## License
The epanet-js and @model-create/epanet-engine are [MIT licenced](https://github.com/modelcreate/epanet-js/blob/master/LICENSE).

The hydraulic engine used within the epanet-js library is [OWA-EPANET](https://github.com/OpenWaterAnalytics/EPANET), which is [MIT licenced](https://github.com/OpenWaterAnalytics/EPANET/blob/dev/LICENSE), with contributed by the following [authors](https://github.com/OpenWaterAnalytics/EPANET/blob/dev/AUTHORS).
