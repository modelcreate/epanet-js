const Benchmark = require('benchmark');
const { epanetEngine } = require('../../epanet-engine/dist/index.js');

const _instance = epanetEngine;
const _FS = _instance.FS;

_FS.writeFile(
  'test.inp',
  `[TITLE]
Minimal EPANET Example

[JUNCTIONS]
;ID             Elev   Demand   Pattern
 J1             100     10      ;

[RESERVOIRS]
;ID             Head   Pattern
 R1             150     ;

[PIPES]
;ID             Node1  Node2   Length   Diameter   Roughness   MinorLoss   Status
 P1             R1     J1      1000     12        100         0           OPEN

[COORDINATES]
;Node           X-Coord            Y-Coord
 R1             1                  1
 J1             2                  1

[TAGS]

[END]`
);

//console.log(_instance);

let projectPtr = _instance._create_project();
let errorCode = _instance._loadinp(projectPtr);

let nodeId = 'J1';
let nodeIdPtr = _instance._malloc(nodeId.length + 1); // +1 for the null-terminator.
_instance.stringToUTF8(nodeId, nodeIdPtr, nodeId.length + 1);

let index = _instance._getNodeIndex(projectPtr, nodeIdPtr);
console.log('Node index for', nodeId, 'is', index);

const intPointer = _instance._malloc(4);
_instance._free(intPointer);
//
//_instance._getversion2(intPointer);
//const returnValue = _instance.getValue(intPointer, 'i32');
//
//console.log(_instance._loadinp());
//console.log(_instance._getNodeIndex());

let index2 = _instance.ccall(
  'getNodeIndex', // C function name
  'number', // Return type
  ['number', 'string'], // Argument types
  [projectPtr, nodeId] // Arguments
);

console.log('Node index for', nodeId, 'is', index2);

_instance.stringToUTF8(nodeId, nodeIdPtr, nodeId.length + 1);

const suite = new Benchmark.Suite();

suite
  .add('_getversion2', function() {
    let index = _instance._getNodeIndex(projectPtr, nodeIdPtr);
  })

  .add('ccall', function() {
    let index2 = _instance.ccall(
      'getNodeIndex', // C function name
      'number', // Return type
      ['number', 'string'], // Argument types
      [projectPtr, nodeId] // Arguments
    );
  })

  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: false });
