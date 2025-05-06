// epanet-worker.js

// Import the wasm module - path is relative to this worker file
import epanetEngine from '../../dist/epanet_version.js';

// Define the log function for the worker to send messages back
function workerLog(message) {
  self.postMessage({ type: 'log', payload: message });
}

// Listen for messages from the main thread
self.onmessage = async (event) => {
  if (event.data.type === 'runSimulation') {
    const { inpText, fileName } = event.data.payload;

    try {
      workerLog("Worker received task. Initializing EPANET engine...");
      const engine = await epanetEngine();
      workerLog("EPANET engine initialized.");

      

      // Write INP file to virtual filesystem
      const inputFilePath = "inputfile.inp"; // Use a consistent name
      engine.FS.writeFile(inputFilePath, inpText);
      workerLog(`Loaded INP file content for: ${fileName}`);

      // Create Project
      const ptrToProjectHandlePtr = engine._malloc(4);
      let errorCode = engine._EN_createproject(ptrToProjectHandlePtr);
      workerLog(`_EN_createproject: ${errorCode}`);
      if (errorCode > 100) throw new Error(`Failed to create project (code: ${errorCode})`);
      const projectHandle = engine.getValue(ptrToProjectHandlePtr, 'i32');
      engine._free(ptrToProjectHandlePtr);

      // Run Project
      const ptrInpFile = engine.allocateUTF8(inputFilePath);
      const ptrRptFile = engine.allocateUTF8("report.rpt");
      const ptrBinFile = engine.allocateUTF8("out.bin");



      workerLog("Running simulation...");
      //errorCode = engine._EN_init(projectHandle, ptrInpFile);
      errorCode = engine._EN_open(projectHandle, ptrInpFile, ptrRptFile, ptrBinFile);
      engine._free(ptrInpFile);
      
      const startTime = performance.now();

      errorCode = engine._EN_solveH(projectHandle);
      workerLog(`_EN_runproject: ${errorCode}`);

      // Note: Keep report/output files if you might want to read them later
      // If not, you can free them here or let wasm memory cleanup handle it on project delete

      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      workerLog(`Worker simulation completed in ${durationSeconds.toFixed(3)} seconds.`);

      if (errorCode > 100) throw new Error(`Failed to run project (code: ${errorCode})`);


      // --- Optional: Read results from report or binary file if needed ---
      // Example: Reading the report file
      // try {
      //     const reportContent = engine.FS.readFile(ptrRptFile, { encoding: 'utf8' });
      //     workerLog("--- Report File Content ---");
      //     workerLog(reportContent.substring(0, 1000) + (reportContent.length > 1000 ? '...' : '')); // Log beginning
      //     workerLog("--- End Report ---");
      // } catch (readError) {
      //     workerLog(`Could not read report file: ${readError}`);
      // }
       engine._free(ptrRptFile);
       engine._free(ptrBinFile);
      // -------------------------------------------------------------------


      // Delete Project
      workerLog("Deleting project...");
      errorCode = engine._EN_deleteproject(projectHandle);
      workerLog(`_EN_deleteproject: ${errorCode}`);
      if (errorCode > 100) workerLog(`Warning: Failed to delete project cleanly (code: ${errorCode})`);




      // Send the final result back to the main thread
      self.postMessage({ type: 'result', payload: durationSeconds });

    } catch (error) {
      workerLog(`Worker error: ${error.message}`);
      // Send error back to the main thread
      self.postMessage({ type: 'error', payload: error.message || 'An unknown error occurred in the worker.' });
    }
  }
};

// Signal that the worker is ready (optional but good practice)
self.postMessage({ type: 'ready' });
workerLog("EPANET worker script loaded and ready.");