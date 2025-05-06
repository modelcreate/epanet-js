//const epanetEngine = require("../dist/epanet_version.js");
import epanetEngine from "../../dist/epanet_version.js";
import fs from "fs";
const engine = await epanetEngine();

async function runEpanetTest(iteration) {
    console.log(`\nStarting iteration ${iteration}`);
    const startTime = performance.now();

    let errorCode;
    let projectHandle;
    let ptrToProjectHandlePtr;
    let ptrInpFile;
    let ptrRptFile;
    let ptrBinFile;
    let ptrNodeId;
    let ptrToIndexHandlePtr;
    let indexOfNode;

    const inpFileName = "./tests/networks/horrible.inp";
    const inpText = fs.readFileSync(inpFileName);
    engine.FS.writeFile("net1.inp", inpText);

    // Create Project
    ptrToProjectHandlePtr = engine._malloc(4);
    errorCode = engine._EN_createproject(ptrToProjectHandlePtr);
    console.log(`_EN_createproject: ${errorCode}`);
    projectHandle = engine.getValue(ptrToProjectHandlePtr, 'i32');
    engine._free(ptrToProjectHandlePtr);

    ptrInpFile = engine.allocateUTF8("net1.inp");
    ptrRptFile = engine.allocateUTF8("report.rpt");
    ptrBinFile = engine.allocateUTF8("out.bin");

    errorCode = engine._EN_open(projectHandle, ptrInpFile, ptrRptFile, ptrBinFile);
    console.log(`_EN_init: ${errorCode}`);
    engine._free(ptrInpFile);
    engine._free(ptrRptFile);
    engine._free(ptrBinFile);

    // Get Node Index
    function getNodeIndex(engine, projectHandle, nodeId) {
        const ptrNodeId = engine.allocateUTF8(nodeId);
        const ptrToIndexHandlePtr = engine._malloc(4);
        const errorCode = engine._EN_getnodeindex(projectHandle, ptrNodeId, ptrToIndexHandlePtr);
        console.log(`_EN_getnodeindex: ${errorCode}`);
        const indexOfNode = engine.getValue(ptrToIndexHandlePtr, 'i32');
        console.log(`Retrieved node index for ${nodeId}: ${indexOfNode}`);
        engine._free(ptrNodeId);
        engine._free(ptrToIndexHandlePtr);
        return indexOfNode;
    }

    // Call the function with verbose output for the single test
    indexOfNode = getNodeIndex(engine, projectHandle, "vLfEJv8pqDKcgWS2GkUmI");

    // Delete Project
    errorCode = engine._EN_deleteproject(projectHandle);
    console.log(`_EN_deleteproject: ${errorCode}`);

    const endTime = performance.now();
    const durationSeconds = (endTime - startTime) / 1000;
    console.log(`Iteration ${iteration} completed in ${durationSeconds} seconds`);
}

// Run the test multiple times
const numberOfIterations = 10;
for (let i = 1; i <= numberOfIterations; i++) {
    await runEpanetTest(i);
}

//// Initialize Project
//ptrRptFile = engine.allocateUTF8("report.rpt");
//ptrBinFile = engine.allocateUTF8("out.bin");
//errorCode = engine._EN_init(projectHandle, ptrRptFile, ptrBinFile, 1, 1); // Units=GPM, Headloss=H-W
//console.log(`_EN_init: ${errorCode}`);
//engine._free(ptrRptFile);
//engine._free(ptrBinFile);

// Add Node
//ptrNodeId = engine.allocateUTF8("J1");
//ptrToIndexHandlePtr = engine._malloc(4);
//errorCode = engine._EN_addnode(projectHandle, ptrNodeId, 0 /* JUNCTION */, ptrToIndexHandlePtr);
//console.log(`_EN_addnode: ${errorCode}`);
//indexOfNode = engine.getValue(ptrToIndexHandlePtr, 'i32');
//console.log(`Node index: ${indexOfNode}`);
//engine._free(ptrNodeId);
//engine._free(ptrToIndexHandlePtr);


//// Get Node Index
//function getNodeIndex(engine, projectHandle, nodeId) {
//    const ptrNodeId = engine.allocateUTF8(nodeId);
//    const ptrToIndexHandlePtr = engine._malloc(4);
//    const errorCode = engine._EN_getnodeindex(projectHandle, ptrNodeId, ptrToIndexHandlePtr);
//    console.log(`_EN_getnodeindex: ${errorCode}`);
//    const indexOfNode = engine.getValue(ptrToIndexHandlePtr, 'i32');
//    console.log(`Retrieved node index for ${nodeId}: ${indexOfNode}`);
//    engine._free(ptrNodeId);
//    engine._free(ptrToIndexHandlePtr);
//    return indexOfNode;
//}
//
//// Call the function with verbose output for the single test
//indexOfNode = getNodeIndex(engine, projectHandle, "J1");







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
