import { Project, Workspace } from '../../dist/index.mjs';

import { Project as ProjectJs, Workspace as WorkspaceJs } from "epanet-js";
import fs from 'fs';

async function benchmarkRunLongSim(iterations = 3) {
    const results = [];

    // Load the input file once
    const inpFileName = "./networks/sw-network1.inp";
    const inpText = fs.readFileSync(inpFileName);

    for (let i = 1; i <= iterations; i++) {
        const ws = new Workspace();
        await ws.loadModule();
        const model = new Project(ws);
        
        // Write the input file to the workspace
        ws.writeFile("net1.inp", inpText);

        // Open the project
        model.open("net1.inp", "report.rpt", "out.bin");

        // Run the simulation and measure time
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

// Run the benchmark and log results
benchmarkRunLongSim(3).then(results => {
    console.log('EPANET-js Long Simulation Benchmark Results:');
    console.log('------------------------------------------');
    console.log(`Number of iterations: ${results.iterations}`);
    console.log(`Total duration: ${results.totalDuration.toFixed(3)} seconds`);
    console.log(`Average duration: ${results.averageDuration.toFixed(3)} seconds`);
    console.log('\nIndividual iteration results:');
    results.results.forEach(r => {
        console.log(`  Iteration ${r.iteration}: ${r.durationSeconds.toFixed(3)} seconds`);
    });
}).catch(error => {
    console.error('Benchmark failed:', error);
});


benchmarkRunLongSimEpanetJs(3).then(results => {
    console.log('Epanet-js 0.7.0 Long Simulation Benchmark Results:');
    console.log('------------------------------------------');
    console.log(`Number of iterations: ${results.iterations}`);
    console.log(`Total duration: ${results.totalDuration.toFixed(3)} seconds`);
    console.log(`Average duration: ${results.averageDuration.toFixed(3)} seconds`);
});