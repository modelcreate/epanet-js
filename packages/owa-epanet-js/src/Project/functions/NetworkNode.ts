import Project from '../Project';
import { NodeType } from 'enum';
import { __values } from 'tslib';

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
    const result = this._EN.setjuncdata(index, elev, dmnd, dmndpat);
    return result;
  }
}

export default NetworkNodeFunctions;
