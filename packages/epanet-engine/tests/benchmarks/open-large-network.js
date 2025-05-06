import epanetEngine from "../../dist/epanet_version.js";
import fs from "fs";
import { Project, Workspace } from "epanet-js";


const inpFileName = "./tests/networks/horrible.inp";
const inpText = fs.readFileSync(inpFileName);


async function benchmarkOpenLargeNetworkWasm(iterations = 3) {
    const engine = await epanetEngine();
    const results = [];

    for (let i = 1; i <= iterations; i++) {
        const startTime = performance.now();

        let errorCode;
        let projectHandle;
        let ptrToProjectHandlePtr;
        let ptrInpFile;
        let ptrRptFile;
        let ptrBinFile;
        let indexOfNode;


        engine.FS.writeFile("net1.inp", inpText);

        // Create Project
        ptrToProjectHandlePtr = engine._malloc(4);
        errorCode = engine._EN_createproject(ptrToProjectHandlePtr);
        if (errorCode !== 0) throw new Error(`Failed to create project: ${errorCode}`);
        projectHandle = engine.getValue(ptrToProjectHandlePtr, 'i32');
        engine._free(ptrToProjectHandlePtr);


        const lenInpFile = engine.lengthBytesUTF8("net1.inp") + 1;
        ptrInpFile = engine._malloc(lenInpFile);
        engine.stringToUTF8("net1.inp", ptrInpFile, lenInpFile);

        const lenRptFile = engine.lengthBytesUTF8("report.rpt") + 1;
        ptrRptFile = engine._malloc(lenRptFile);
        engine.stringToUTF8("report.rpt", ptrRptFile, lenRptFile);

        const lenBinFile = engine.lengthBytesUTF8("out.bin") + 1;
        ptrBinFile = engine._malloc(lenBinFile);
        engine.stringToUTF8("out.bin", ptrBinFile, lenBinFile);

        errorCode = engine._EN_open(projectHandle, ptrInpFile, ptrRptFile, ptrBinFile);
        if (errorCode !== 0) throw new Error(`Failed to open project: ${errorCode}`);
        engine._free(ptrInpFile);
        engine._free(ptrRptFile);
        engine._free(ptrBinFile);


        // Delete Project
        errorCode = engine._EN_deleteproject(projectHandle);
        if (errorCode !== 0) throw new Error(`Failed to delete project: ${errorCode}`);

        const endTime = performance.now();
        const durationSeconds = (endTime - startTime) / 1000;
        results.push({
            iteration: i,
            durationSeconds,
            nodeIndex: indexOfNode
        });
    }

    const totalDuration = results.reduce((sum, r) => sum + r.durationSeconds, 0);
    const averageDuration = totalDuration / iterations;

    return {
        results,
        totalDuration,
        averageDuration,
        iterations
    };
}

async function benchmarkOpenLargeNetworkEpanetJs(iterations = 3) {
    const results = [];

    for (let i = 1; i <= iterations; i++) {
        const startTime = performance.now();

        const ws = new Workspace();
        const model = new Project(ws);

        ws.writeFile("net1.inp", inpText);
        
        model.open("net1.inp", "report.rpt", "out.bin");

        const endTime = performance.now();
        const durationSeconds = (endTime - startTime) / 1000;
        results.push({
            iteration: i,
            durationSeconds
        });
    }

    const totalDuration = results.reduce((sum, r) => sum + r.durationSeconds, 0);
    const averageDuration = totalDuration / iterations;

    return {
        results,
        totalDuration,
        averageDuration,
        iterations
    };
}

export { benchmarkOpenLargeNetworkWasm, benchmarkOpenLargeNetworkEpanetJs };