//const epanetEngine = require("../dist/epanet_version.js");
import epanetEngine from "../../dist/epanet_version.js";
const engine = await epanetEngine();

let errorCode;
let projectHandle;
let ptrToProjectHandlePtr;
let ptrRptFile;
let ptrBinFile;
let ptrNodeId;
let ptrToIndexHandlePtr;
let indexOfNode;



// Create Project
ptrToProjectHandlePtr = engine._malloc(4);
errorCode = engine._EN_createproject(ptrToProjectHandlePtr);
console.log(`_EN_createproject: ${errorCode}`);
projectHandle = engine.getValue(ptrToProjectHandlePtr, 'i32');
engine._free(ptrToProjectHandlePtr);

// Initialize Project
ptrRptFile = engine.allocateUTF8("report.rpt");
ptrBinFile = engine.allocateUTF8("out.bin");
errorCode = engine._EN_init(projectHandle, ptrRptFile, ptrBinFile, 1, 1); // Units=GPM, Headloss=H-W
console.log(`_EN_init: ${errorCode}`);
engine._free(ptrRptFile);
engine._free(ptrBinFile);

// Add Node
ptrNodeId = engine.allocateUTF8("J1");
ptrToIndexHandlePtr = engine._malloc(4);
errorCode = engine._EN_addnode(projectHandle, ptrNodeId, 0 /* JUNCTION */, ptrToIndexHandlePtr);
console.log(`_EN_addnode: ${errorCode}`);
indexOfNode = engine.getValue(ptrToIndexHandlePtr, 'i32');
console.log(`Node index: ${indexOfNode}`);
engine._free(ptrNodeId);
engine._free(ptrToIndexHandlePtr);


// Get Node Index
function getNodeIndex(engine, projectHandle, nodeId, verbose = false) {
    const ptrNodeId = engine.allocateUTF8(nodeId);
    const ptrToIndexHandlePtr = engine._malloc(4);
    const errorCode = engine._EN_getnodeindex(projectHandle, ptrNodeId, ptrToIndexHandlePtr);
    if (verbose) console.log(`_EN_getnodeindex: ${errorCode}`);
    const indexOfNode = engine.getValue(ptrToIndexHandlePtr, 'i32');
    if (verbose) console.log(`Retrieved node index for ${nodeId}: ${indexOfNode}`);
    engine._free(ptrNodeId);
    engine._free(ptrToIndexHandlePtr);
    return indexOfNode;
}

// Fast version that reuses pre-allocated memory
function getNodeIndexFast(engine, projectHandle, nodeId, ptrNodeId, ptrToIndexHandlePtr) {
    engine.stringToUTF8(nodeId, ptrNodeId, 4);
    const errorCode = engine._EN_getnodeindex(projectHandle, ptrNodeId, ptrToIndexHandlePtr);
    return engine.getValue(ptrToIndexHandlePtr, 'i32');
}

// Call the function with verbose output for the single test
indexOfNode = getNodeIndex(engine, projectHandle, "J1", true);

// Benchmark getNodeIndex
function benchmarkGetNodeIndex(engine, projectHandle, nodeId, iterations = 1000000) {
    console.log(`Starting benchmark for ${iterations} iterations...`);
    
    // Pre-allocate memory buffers
    const ptrNodeId = engine._malloc(4);  // Buffer for node ID string
    const ptrToIndexHandlePtr = engine._malloc(4);  // Buffer for index result
    
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
        getNodeIndexFast(engine, projectHandle, nodeId, ptrNodeId, ptrToIndexHandlePtr);
    }
    
    const endTime = performance.now();
    const durationSeconds = (endTime - startTime) / 1000;
    const runsPerSecond = iterations / durationSeconds;
    const millionRunsPerSecond = runsPerSecond / 1000000;
    
    // Clean up pre-allocated memory
    engine._free(ptrNodeId);
    engine._free(ptrToIndexHandlePtr);
    
    console.log(`Benchmark Results:`);
    console.log(`Total time: ${durationSeconds.toFixed(2)} seconds`);
    console.log(`Runs per second: ${runsPerSecond.toFixed(2)}`);
    console.log(`Million runs per second: ${millionRunsPerSecond.toFixed(4)}`);
}

// Run the benchmark
benchmarkGetNodeIndex(engine, projectHandle, "J1", 60_000_000);

// Delete Project
errorCode = engine._EN_deleteproject(projectHandle);
console.log(`_EN_deleteproject: ${errorCode}`);




//console.log("epanetEngine", engine._getversion());
//console.log("epanetEngine", engine._open_epanet());


// Code to replicate:
//for (let i = 1; i <= 3; i++) {
//    console.time("runSimulation");
//    const workspace = new Workspace();
//    const model = new Project(workspace);
//    workspace.writeFile("net1.inp", horribleInp);
//    model.open("net1.inp", "report.rpt", "out.bin");
//    model.close();
//    console.timeEnd("runSimulation");
//  }


// const workspace = new Workspace();
//      this._instance = epanetEngine;
//      this._FS = this._instance.FS;
//
// workspace.writeFile("net1.inp", horribleInp);
//       writeFile(path: string, data: string | ArrayBufferView) {
//        this._FS.writeFile(path, data);
//      }
//
// const model = new Project(workspace);
//   this._ws = ws;
//   this._instance = ws._instance;
//   this._EN = new this._ws._instance.Epanet();
//
