import Workspace from 'Workspace/Workspace';
import {
  ProjectFunctions,
  NetworkNodeFunctions,
  HydraulicAnalysisFunctions,
} from './functions';

interface MemoryTypes {
  int: number;
  long: number;
  double: number;
  char: string;
}

class Project
  implements
    ProjectFunctions,
    NetworkNodeFunctions,
    HydraulicAnalysisFunctions {
  _ws: Workspace;
  _instance: EmscriptenModule;
  _EN: EpanetProject;
  constructor(ws: Workspace) {
    this._ws = ws;
    this._instance = ws._instance;
    this._EN = new this._ws._instance.Epanet();
  }

  _getValue<T extends keyof MemoryTypes>(
    pointer: number,
    type: T
  ): MemoryTypes[T];
  _getValue(pointer: number, type: keyof MemoryTypes) {
    let value;
    if (type === 'char') {
      value = this._instance.UTF8ToString(pointer);
    } else {
      const size = type === 'int' ? 'i32' : type === 'long' ? 'i64' : 'double';
      value = this._instance.getValue(pointer, size);
    }
    this._instance._free(pointer);
    return value;
  }

  _allocateMemory(v1: string): [number];
  _allocateMemory(v1: string, v2: string): [number, number];
  _allocateMemory(v1: string, v2: string, v3: string): [number, number, number];
  _allocateMemory(v1: any): any {
    if (typeof v1 != 'string') {
      throw new Error('Method _allocateMemory expected string');
    }
    const types = Array.prototype.slice.call(arguments);
    return types.reduce((acc, t) => {
      const memsize = t === 'char' ? 1 : t === 'int' ? 4 : 8;
      const pointer = this._instance._malloc(memsize);
      return acc.concat(pointer);
    }, [] as number[]);
  }

  _checkError(errorCode: number) {
    if (errorCode === 0) {
      return;
    }
    const errorMsg = this._ws.getError(errorCode);
    throw new Error(errorMsg);
  }

  // Implementing function classes

  // Project Functions
  open = ProjectFunctions.prototype.open;
  close = ProjectFunctions.prototype.close;
  runproject = ProjectFunctions.prototype.runproject;
  init = ProjectFunctions.prototype.init;
  getcount = ProjectFunctions.prototype.getcount;
  gettitle = ProjectFunctions.prototype.gettitle;
  settitle = ProjectFunctions.prototype.settitle;
  saveinpfile = ProjectFunctions.prototype.saveinpfile;

  // Hydraulic Analysis Functions
  solveH = HydraulicAnalysisFunctions.prototype.solveH;
  usehydfile = HydraulicAnalysisFunctions.prototype.usehydfile;
  openH = HydraulicAnalysisFunctions.prototype.openH;
  initH = HydraulicAnalysisFunctions.prototype.initH;
  runH = HydraulicAnalysisFunctions.prototype.runH;
  nextH = HydraulicAnalysisFunctions.prototype.nextH;
  saveH = HydraulicAnalysisFunctions.prototype.saveH;
  savehydfile = HydraulicAnalysisFunctions.prototype.savehydfile;
  closeH = HydraulicAnalysisFunctions.prototype.closeH;

  //Network Node Functions
  addnode = NetworkNodeFunctions.prototype.addnode;
  setjuncdata = NetworkNodeFunctions.prototype.setjuncdata;
  getnodetype = NetworkNodeFunctions.prototype.getnodetype;
  getnodevalue = NetworkNodeFunctions.prototype.getnodevalue;
}

export default Project;
