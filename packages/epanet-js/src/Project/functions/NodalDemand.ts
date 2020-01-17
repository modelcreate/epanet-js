import Project from '../Project';
import { DemandModel } from '../../index';

class NodalDemandFunctions {
  addDemand(
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

  deleteDemand(this: Project, nodeIndex: number, demandIndex: number) {
    this._checkError(this._EN.deletedemand(nodeIndex, demandIndex));
  }

  getBaseDemand(this: Project, nodeIndex: number, demandIndex: number) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getbasedemand(nodeIndex, demandIndex, ...memory));
    return this._getValue(memory[0], 'double');
  }

  getDemandIndex(this: Project, nodeIndex: number, demandName: string) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getdemandindex(nodeIndex, demandName, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getDemandModel(this: Project) {
    const memory = this._allocateMemory('int', 'double', 'double', 'double');
    this._checkError(this._EN.getdemandmodel(...memory));
    return {
      type: this._getValue(memory[0], 'int') as DemandModel,
      pmin: this._getValue(memory[1], 'double'),
      preq: this._getValue(memory[2], 'double'),
      pexp: this._getValue(memory[3], 'double'),
    };
  }

  getDemandName(this: Project, nodeIndex: number, demandIndex: number) {
    const memory = this._allocateMemory('char');
    this._checkError(this._EN.getdemandname(nodeIndex, demandIndex, ...memory));
    return this._getValue(memory[0], 'char');
  }

  getDemandPattern(this: Project, nodeIndex: number, demandIndex: number) {
    const memory = this._allocateMemory('int');
    this._checkError(
      this._EN.getdemandpattern(nodeIndex, demandIndex, ...memory)
    );
    return this._getValue(memory[0], 'int');
  }

  getNumberOfDemands(this: Project, nodeIndex: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getnumdemands(nodeIndex, ...memory));
    return this._getValue(memory[0], 'int');
  }

  setBaseDemand(
    this: Project,
    nodeIndex: number,
    demandIndex: number,
    baseDemand: number
  ) {
    this._checkError(
      this._EN.setbasedemand(nodeIndex, demandIndex, baseDemand)
    );
  }
  setDemandModel(
    this: Project,
    type: DemandModel,
    pmin: number,
    preq: number,
    pexp: number
  ) {
    this._checkError(this._EN.setdemandmodel(type, pmin, preq, pexp));
  }
  setDemandName(
    this: Project,
    nodeIndex: number,
    demandIdx: number,
    demandName: string
  ) {
    this._checkError(this._EN.setdemandname(nodeIndex, demandIdx, demandName));
  }
  setDemandPattern(
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
