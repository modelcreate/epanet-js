import Workspace from 'Workspace/Workspace';
import { ProjectFunctions, NetworkNodeFunctions } from './functions';

interface MemoryTypes {
  int: number;
  long: number;
  double: number;
  char: string;
}

class Project implements ProjectFunctions, NetworkNodeFunctions {
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
    if (type === 'char') {
      return this._instance.UTF8ToString(pointer);
    }
    const size = type === 'int' ? 'i32' : type === 'long' ? 'i64' : 'double';
    return this._instance.getValue(pointer, size);
  }

  _allocateMemory(types: string[]): number[] {
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
  init = ProjectFunctions.prototype.init;
  saveinpfile = ProjectFunctions.prototype.saveinpfile;
  addnode = NetworkNodeFunctions.prototype.addnode;
  setjuncdata = NetworkNodeFunctions.prototype.setjuncdata;
}

export default Project;
