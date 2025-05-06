import epanetEngine from "../../dist/epanet_version.js";
import fs from "fs";
const engine = await epanetEngine();



let errorCode;
let projectHandle;
let ptrToProjectHandlePtr;
let ptrInpFile;
let ptrRptFile;
let ptrBinFile;
let ptrNodeId;
let ptrToIndexHandlePtr;
let indexOfNode;

const inpFileName = "./tests/networks/sw-network1.inp";
const inpText = fs.readFileSync(inpFileName);
engine.FS.writeFile("net1.inp", inpText);

// Create Project
ptrToProjectHandlePtr = engine._malloc(4);
errorCode = engine._EN_createproject(ptrToProjectHandlePtr);
console.log(`_EN_createproject: ${errorCode}`);
projectHandle = engine.getValue(ptrToProjectHandlePtr, 'i32');
engine._free(ptrToProjectHandlePtr);

// Run Project
const lenInpFile = engine.lengthBytesUTF8("net1.inp") + 1;
ptrInpFile = engine._malloc(lenInpFile);
engine.stringToUTF8("net1.inp", ptrInpFile, lenInpFile);

const lenRptFile = engine.lengthBytesUTF8("report.rpt") + 1;
ptrRptFile = engine._malloc(lenRptFile);
engine.stringToUTF8("report.rpt", ptrRptFile, lenRptFile);

const lenBinFile = engine.lengthBytesUTF8("out.bin") + 1;
ptrBinFile = engine._malloc(lenBinFile);
engine.stringToUTF8("out.bin", ptrBinFile, lenBinFile);




//errorCode = engine._EN_runproject(projectHandle, ptrInpFile, ptrRptFile, ptrBinFile, 0);
errorCode = engine._EN_open(projectHandle, ptrInpFile, ptrRptFile, ptrBinFile);
console.log(`_EN_init: ${errorCode}`);
engine._free(ptrInpFile);
engine._free(ptrRptFile);
engine._free(ptrBinFile);


const startTime = performance.now();

errorCode = engine._EN_solveH(projectHandle);
const endTime = performance.now();
const durationSeconds = (endTime - startTime) / 1000;
console.log(`_EN_solveH: ${errorCode}`);


console.log(`Completed in ${durationSeconds} seconds`);

// Delete Project
errorCode = engine._EN_deleteproject(projectHandle);
console.log(`_EN_deleteproject: ${errorCode}`);

