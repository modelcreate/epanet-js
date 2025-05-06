import { benchmarkNodeIndexCalls, benchmarkNodeIndexCallsEpanetJs } from './benchmarks/calls-per-second.js';
import { benchmarkOpenLargeNetworkWasm, benchmarkOpenLargeNetworkEpanetJs } from './benchmarks/open-large-network.js';
import { benchmarkRunLongSimWasm, benchmarkRunLongSimEpanetJs } from './benchmarks/run-long-sim.js';


// Use it in an async function
async function runBenchmark() {
    try {


        console.log("--------------------------------");
        console.log("Run Long Sim");

        // Run WASM version
        const longsimWasmResults = await benchmarkRunLongSimWasm(1);
        console.log('WASM Results:', {
            averageDuration: longsimWasmResults.averageDuration,
            totalDuration: longsimWasmResults.totalDuration
        });

        // Run epanet-js version
        const longsimJsResults = await benchmarkRunLongSimEpanetJs(1);
        console.log('epanet-js Results:', {
            averageDuration: longsimJsResults.averageDuration,
            totalDuration: longsimJsResults.totalDuration
        });

        console.log("--------------------------------");
        console.log("Node Index Calls");

        const results = await benchmarkNodeIndexCalls(60_000_000);
        console.log(`Performance: ${results.millionRunsPerSecond.toFixed(4)} million calls per second`);

        const resultsEpanetJs = await benchmarkNodeIndexCallsEpanetJs(10_000_000);
        console.log(`Performance: ${resultsEpanetJs.millionRunsPerSecond.toFixed(4)} million calls per second`);

        console.log("--------------------------------");
        console.log("Open Large Network");

        // Run WASM version
        const wasmResults = await benchmarkOpenLargeNetworkWasm(1);
        console.log('WASM Results:', {
            averageDuration: wasmResults.averageDuration,
            totalDuration: wasmResults.totalDuration
        });

        // Run epanet-js version
        const jsResults = await benchmarkOpenLargeNetworkEpanetJs(1);
        console.log('epanet-js Results:', {
            averageDuration: jsResults.averageDuration,
            totalDuration: jsResults.totalDuration
        });


    } catch (error) {
        console.error('Benchmark failed:', error.message);
    }
}



runBenchmark();