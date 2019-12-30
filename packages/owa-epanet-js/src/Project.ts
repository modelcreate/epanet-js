import Workspace from 'Workspace';

class Project {
  _ws: EmscriptenModule;
  _EN: EpanetProject;
  constructor(ws: Workspace) {
    this._ws = ws._instance;
    this._EN = new this._ws.Epanet();
  }
  init(
    rptFile: string,
    outFile: string,
    unitType: number,
    headLosstype: number
  ) {
    const result = this._EN.init(rptFile, outFile, unitType, headLosstype);
    return result;
  }

  addnode(id: string, nodeType: number) {
    const intPointer = this._ws._malloc(4);
    this._EN.addnode(id, nodeType, intPointer);
    const returnValue = this._ws.getValue(intPointer, 'i32');

    this._ws._free(intPointer);

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
