const Benchmark = require('benchmark');
const { Project, Workspace } = require('../dist/index.js');
const fs = require('fs');

const tankTestInp = fs.readFileSync(
  __dirname + '/../test/data/tankTest.inp',
  'utf8'
);
const ws = new Workspace();
ws.writeFile('tankTestInp.inp', tankTestInp);
const epanet = ws._instance.getversion(1);
console.log(epanet);
const model = new Project(ws);
model.open('tankTestInp.inp', 'tankTestInp.rpt', 'tankTestInp.bin');

//const suite = new Benchmark.Suite();
//
//const intPointer = ws._instance._malloc(4);
//
//suite
//  .add('getNodeIndex', function() {
//    const junctionIndexLookup = model.getNodeIndex('J1');
//    //const version = ws.version;
//    //ws._instance.getversion(intPointer);
//    //const returnValue = ws._instance.getValue(intPointer, 'i32');
//    //ws.version;
//  })
//  .add('getNodeIndex2', function() {
//    //const junctionIndexLookup = model.getNodeIndex2('J1');
//    //const version = ws.version;
//    //ws._instance.getversion(intPointer);
//    //const returnValue = ws._instance.getValue(intPointer, 'i32');
//    //ws.version;
//  })
//  .on('cycle', function(event) {
//    console.log(String(event.target));
//  })
//  .on('complete', function() {
//    console.log('Fastest is ' + this.filter('fastest').map('name'));
//  })
//  .run({ async: false });
