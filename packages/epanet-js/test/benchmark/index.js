import { Project, Workspace, NodeType, FlowUnits, HeadLossType } from '../../dist/index.mjs';

// Benchmark function that returns performance metrics
async function benchmarkProjectMethods(iterations = 100000) {
    const ws = new Workspace();
    await ws.loadModule();
    const model = new Project(ws);

    // Initialize project
    model.init("report.rpt", "out.bin", FlowUnits.CFS, HeadLossType.HW);
    
    // Add a node for testing
    const nodeIndex = model.addNode("J1", NodeType.Junction);
    
    // Benchmark getNodeIndex
    const startTimeGetNodeIndex = performance.now();
    for (let i = 0; i < iterations; i++) {
        model.getNodeIndex("J1");
    }
    const endTimeGetNodeIndex = performance.now();
    const getNodeIndexDuration = (endTimeGetNodeIndex - startTimeGetNodeIndex) / 1000;
    const getNodeIndexPerSecond = iterations / getNodeIndexDuration;
    
    // Benchmark getNodeValue
    const startTimeGetNodeValue = performance.now();
    for (let i = 0; i < iterations; i++) {
        model.getNodeValue(nodeIndex, 0); // 0 is elevation property
    }
    const endTimeGetNodeValue = performance.now();
    const getNodeValueDuration = (endTimeGetNodeValue - startTimeGetNodeValue) / 1000;
    const getNodeValuePerSecond = iterations / getNodeValueDuration;

    // Benchmark setNodeValue
    const startTimeSetNodeValue = performance.now();
    for (let i = 0; i < iterations; i++) {
        model.setNodeValue(nodeIndex, 0, 100); // Set elevation to 100
    }
    const endTimeSetNodeValue = performance.now();
    const setNodeValueDuration = (endTimeSetNodeValue - startTimeSetNodeValue) / 1000;
    const setNodeValuePerSecond = iterations / setNodeValueDuration;

    // Add a link for testing
    const linkIndex = model.addLink("P1", 0, "J1", "J1"); // 0 is pipe type

    // Benchmark getLinkValue
    const startTimeGetLinkValue = performance.now();
    for (let i = 0; i < iterations; i++) {
        model.getLinkValue(linkIndex, 0); // 0 is length property
    }
    const endTimeGetLinkValue = performance.now();
    const getLinkValueDuration = (endTimeGetLinkValue - startTimeGetLinkValue) / 1000;
    const getLinkValuePerSecond = iterations / getLinkValueDuration;

    // Benchmark setLinkValue
    const startTimeSetLinkValue = performance.now();
    for (let i = 0; i < iterations; i++) {
        model.setLinkValue(linkIndex, 0, 1000); // Set length to 1000
    }
    const endTimeSetLinkValue = performance.now();
    const setLinkValueDuration = (endTimeSetLinkValue - startTimeSetLinkValue) / 1000;
    const setLinkValuePerSecond = iterations / setLinkValueDuration;

    return {
        getNodeIndex: {
            duration: getNodeIndexDuration,
            callsPerSecond: getNodeIndexPerSecond,
            millionCallsPerSecond: getNodeIndexPerSecond / 1000000
        },
        getNodeValue: {
            duration: getNodeValueDuration,
            callsPerSecond: getNodeValuePerSecond,
            millionCallsPerSecond: getNodeValuePerSecond / 1000000
        },
        setNodeValue: {
            duration: setNodeValueDuration,
            callsPerSecond: setNodeValuePerSecond,
            millionCallsPerSecond: setNodeValuePerSecond / 1000000
        },
        getLinkValue: {
            duration: getLinkValueDuration,
            callsPerSecond: getLinkValuePerSecond,
            millionCallsPerSecond: getLinkValuePerSecond / 1000000
        },
        setLinkValue: {
            duration: setLinkValueDuration,
            callsPerSecond: setLinkValuePerSecond,
            millionCallsPerSecond: setLinkValuePerSecond / 1000000
        },
        iterations
    };
}

// Run the benchmark and log results
benchmarkProjectMethods(5_000_000).then(results => {
    console.log('EPANET-js Method Performance Benchmark Results:');
    console.log('--------------------------------------------');
    console.log(`Iterations per test: ${results.iterations}`);
    console.log('\nMethod Performance:');
    console.log('------------------');
    
    for (const [method, metrics] of Object.entries(results)) {
        if (method !== 'iterations') {
            console.log(`\n${method}:`);
            console.log(`  Duration: ${metrics.duration.toFixed(3)} seconds`);
            console.log(`  Calls per second: ${metrics.callsPerSecond.toFixed(0)}`);
            console.log(`  Million calls per second: ${metrics.millionCallsPerSecond.toFixed(3)}`);
        }
    }
}).catch(error => {
    console.error('Benchmark failed:', error);
});
