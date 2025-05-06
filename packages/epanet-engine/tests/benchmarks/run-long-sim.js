import epanetEngine from "../../dist/epanet_version.js";
import fs from "fs";
import { Project, Workspace } from "epanet-js";

async function benchmarkRunLongSimWasm(iterations = 3) {
    const engine = await epanetEngine();
    const results = [];

    // Load the input file once
    const inpFileName = "./tests/networks/sw-network1.inp";
    const inpText = fs.readFileSync(inpFileName);
    engine.FS.writeFile("net1.inp", inpText);

    for (let i = 1; i <= iterations; i++) {


        let errorCode;
        let projectHandle;
        let ptrToProjectHandlePtr;
        let ptrInpFile;
        let ptrRptFile;
        let ptrBinFile;

        // Create Project
        ptrToProjectHandlePtr = engine._malloc(4);
        errorCode = engine._EN_createproject(ptrToProjectHandlePtr);
        if (errorCode > 100) throw new Error(`Failed to create project: ${errorCode}`);
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

        errorCode = engine._EN_open(projectHandle, ptrInpFile, ptrRptFile, ptrBinFile);
        if (errorCode > 100) throw new Error(`Failed to open project: ${errorCode}`);
        engine._free(ptrInpFile);
        engine._free(ptrRptFile);
        engine._free(ptrBinFile);

        const startTime = performance.now();

        errorCode = engine._EN_solveH(projectHandle);
        if (errorCode > 100) throw new Error(`Failed to solve hydraulics: ${errorCode}`);

        const endTime = performance.now();
        const durationSeconds = (endTime - startTime) / 1000;
        results.push({
            iteration: i,
            durationSeconds
        });

        // Delete Project
        errorCode = engine._EN_deleteproject(projectHandle);
        if (errorCode > 100) throw new Error(`Failed to delete project: ${errorCode}`);
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

async function benchmarkRunLongSimEpanetJs(iterations = 3) {
    const results = [];

    // Load the input file once
    const inpFileName = "./tests/networks/sw-network1.inp";
    const inpText = fs.readFileSync(inpFileName);

    for (let i = 1; i <= iterations; i++) {


        const ws = new Workspace();
        const model = new Project(ws);
        
        ws.writeFile("net1.inp", inpText);

        model.open("net1.inp", "report.rpt", "out.bin");

        const startTime = performance.now();
        model.solveH();
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

export { benchmarkRunLongSimWasm, benchmarkRunLongSimEpanetJs };

