### Roadmap

Reaching version 1.0.0 is the current focus, the first non-beta version will have API stability and have mirrored functions of each method in the EPANET Toolkit.

Also planned are helper classes and an object-oriented wrapper to allow simpler development of applications using the EPANET engine.

See the remaining task on the [Version 1.0.0 Project](https://github.com/modelcreate/epanet-js/projects/1).

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
