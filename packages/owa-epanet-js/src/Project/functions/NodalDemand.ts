import Project from '../Project';

class NodalDemandFunctions {
  adddemand(
    this: Project,
    nodeIndex: number,
    baseDemand: number,
    demandPattern: string,
    demandName: string
  ) {
    this._checkError(
      this._EN.adddemand(nodeIndex, baseDemand, demandPattern, demandName)
    );
  }

  deletedemand(this: Project, nodeIndex: number, demandIndex: number) {
    this._checkError(this._EN.deletedemand(nodeIndex, demandIndex));
  }

  getbasedemand(this: Project, nodeIndex: number, demandIndex: number) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getbasedemand(nodeIndex, demandIndex, ...memory));
    return this._getValue(memory[0], 'double');
  }

  getdemandindex(this: Project, nodeIndex: number, demandName: string) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getdemandindex(nodeIndex, demandName, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getdemandmodel(this: Project) {
    const memory = this._allocateMemory('int', 'double', 'double', 'double');
    this._checkError(this._EN.getdemandmodel(...memory));
    return {
      type: this._getValue(memory[0], 'int'),
      pmin: this._getValue(memory[1], 'double'),
      preq: this._getValue(memory[2], 'double'),
      pexp: this._getValue(memory[3], 'double'),
    };
  }

  getdemandname(this: Project, nodeIndex: number, demandIndex: number) {
    const memory = this._allocateMemory('char');
    this._checkError(this._EN.getdemandname(nodeIndex, demandIndex, ...memory));
    return this._getValue(memory[0], 'char');
  }

  getdemandpattern(this: Project, nodeIndex: number, demandIndex: number) {
    const memory = this._allocateMemory('int');
    this._checkError(
      this._EN.getdemandpattern(nodeIndex, demandIndex, ...memory)
    );
    return this._getValue(memory[0], 'int');
  }

  getnumdemands(this: Project, nodeIndex: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getnumdemands(nodeIndex, ...memory));
    return this._getValue(memory[0], 'int');
  }

  setbasedemand(
    this: Project,
    nodeIndex: number,
    demandIndex: number,
    baseDemand: number
  ) {
    this._checkError(
      this._EN.setbasedemand(nodeIndex, demandIndex, baseDemand)
    );
  }
  setdemandmodel(
    this: Project,
    type: number,
    pmin: number,
    preq: number,
    pexp: number
  ) {
    this._checkError(this._EN.setdemandmodel(type, pmin, preq, pexp));
  }
  setdemandname(
    this: Project,
    nodeIndex: number,
    demandIdx: number,
    demandName: string
  ) {
    this._checkError(this._EN.setdemandname(nodeIndex, demandIdx, demandName));
  }
  setdemandpattern(
    this: Project,
    nodeIndex: number,
    demandIndex: number,
    patIndex: number
  ) {
    this._checkError(
      this._EN.setdemandpattern(nodeIndex, demandIndex, patIndex)
    );
  }
}

export default NodalDemandFunctions;
