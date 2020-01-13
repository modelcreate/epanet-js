import Project from '../Project';
import { NodeType, NodeProperty, ActionCodeType } from 'enum';

class NetworkNodeFunctions {
  addNode(this: Project, id: string, nodeType: NodeType) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.addnode(id, nodeType, ...memory));
    return this._getValue(memory[0], 'int');
  }

  deleteNode(this: Project, index: number, actionCode: ActionCodeType) {
    this._checkError(this._EN.deletenode(index, actionCode));
  }

  getNodeIndex(this: Project, id: string) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getnodeindex(id, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getNodeId(this: Project, index: number) {
    const memory = this._allocateMemory('char');
    this._checkError(this._EN.getnodeid(index, ...memory));
    return this._getValue(memory[0], 'char');
  }

  setNodeId(this: Project, index: number, newid: string) {
    this._checkError(this._EN.setnodeid(index, newid));
  }

  getNodeType(this: Project, index: number): NodeType {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getnodetype(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getNodeValue(this: Project, index: number, property: NodeProperty) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getnodevalue(index, property, ...memory));
    return this._getValue(memory[0], 'double');
  }

  setNodeValue(
    this: Project,
    index: number,
    property: NodeProperty,
    value: number
  ) {
    this._checkError(this._EN.setnodevalue(index, property, value));
  }

  setJunctionData(
    this: Project,
    index: number,
    elev: number,
    dmnd: number,
    dmndpat: string
  ) {
    this._checkError(this._EN.setjuncdata(index, elev, dmnd, dmndpat));
  }

  setTankData(
    this: Project,
    index: number,
    elev: number,
    initlvl: number,
    minlvl: number,
    maxlvl: number,
    diam: number,
    minvol: number,
    volcurve: string
  ) {
    this._checkError(
      this._EN.settankdata(
        index,
        elev,
        initlvl,
        minlvl,
        maxlvl,
        diam,
        minvol,
        volcurve
      )
    );
  }

  getCoordinates(this: Project, index: number) {
    const memory = this._allocateMemory('double', 'double');
    this._checkError(this._EN.getcoord(index, ...memory));
    return {
      x: this._getValue(memory[0], 'double'),
      y: this._getValue(memory[1], 'double'),
    };
  }

  setCoordinates(this: Project, index: number, x: number, y: number) {
    this._checkError(this._EN.setcoord(index, x, y));
  }
}

export default NetworkNodeFunctions;
