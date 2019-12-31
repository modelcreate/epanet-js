import Workspace from 'Workspace';
import { NodeType } from 'enum';

class Project {
  _ws: Workspace;
  _instance: EmscriptenModule;
  _EN: EpanetProject;
  constructor(ws: Workspace) {
    this._ws = ws;
    this._instance = ws._instance;
    this._EN = new this._ws._instance.Epanet();
  }

  _checkError(errorCode: number) {
    if (errorCode === 0) {
      return;
    }
    const errorMsg = this._ws.getError(errorCode);
    throw new Error(errorMsg);
  }

  init(
    rptFile: string,
    outFile: string,
    unitType: number,
    headLosstype: number
  ) {
    const result = this._EN.init(rptFile, outFile, unitType, headLosstype);
    this._checkError(result);
    return result;
  }

  addnode(id: string, nodeType: NodeType) {
    const intPointer = this._instance._malloc(4);
    const result = this._EN.addnode(id, nodeType, intPointer);
    const returnValue = this._instance.getValue(intPointer, 'i32');

    this._instance._free(intPointer);

    this._checkError(result);
    return returnValue;
  }

  setjuncdata(index: number, elev: number, dmnd: number, dmndpat: string) {
    const result = this._EN.setjuncdata(index, elev, dmnd, dmndpat);
    return result;
  }

  saveinpfile(filename: string) {
    const result = this._EN.saveinpfile(filename);
    return result;
  }
}

export default Project;
