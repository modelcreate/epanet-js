class Project {
  constructor(workspace) {
    this._ws = workspace._instance;
    this._EN = new this._ws.Epanet();
  }
  init(rptFile, outFile, unitType, headLosstype) {
    const result = this._EN.init(rptFile, outFile, unitType, headLosstype);
    return result;
  }

  addnode(id, nodeType) {
    const intPointer = this._ws._malloc(4);
    var result = this._EN.addnode(id, nodeType, intPointer);
    const returnValue = this._ws.getValue(intPointer, "i32");

    this._ws._free(intPointer);

    return returnValue;
  }

  setjuncdata(index, elev, dmnd, dmndpat) {
    const result = this._EN.setjuncdata(index, elev, dmnd, dmndpat);
    return result;
  }

  saveinpfile(filename) {
    const result = this._EN.saveinpfile(filename);
    return result;
  }
}
