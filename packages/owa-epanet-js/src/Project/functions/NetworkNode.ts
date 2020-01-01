import Project from '../Project';
import { NodeType } from 'enum';

class NetworkNodeFunctions {
  addnode(this: Project, id: string, nodeType: NodeType) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.addnode(id, nodeType, ...memory));
    return this._getValue(memory[0], 'int');
  }

  setjuncdata(
    this: Project,
    index: number,
    elev: number,
    dmnd: number,
    dmndpat: string
  ) {
    this._checkError(this._EN.setjuncdata(index, elev, dmnd, dmndpat));
  }

  getnodetype(this: Project, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getnodetype(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getnodevalue(this: Project, index: number, property: number) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getnodevalue(index, property, ...memory));
    return this._getValue(memory[0], 'double');
  }
}

export default NetworkNodeFunctions;
