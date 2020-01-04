import Project from '../Project';

class NetworkLinkFunctions {
  addLink(
    this: Project,
    id: string,
    linkType: number,
    fromNode: string,
    toNode: string
  ) {
    const memory = this._allocateMemory('int');
    this._checkError(
      this._EN.addlink(id, linkType, fromNode, toNode, ...memory)
    );
    return this._getValue(memory[0], 'int');
  }

  deleteLink(this: Project, index: number, actionCode: number) {
    this._checkError(this._EN.deletelink(index, actionCode));
  }

  getLinkIndex(this: Project, id: string) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getlinkindex(id, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getLinkId(this: Project, index: number) {
    const memory = this._allocateMemory('char');
    this._checkError(this._EN.getlinkid(index, ...memory));
    return this._getValue(memory[0], 'char');
  }

  setLinkId(this: Project, index: number, newid: string) {
    this._checkError(this._EN.setlinkid(index, newid));
  }

  getLinkType(this: Project, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getlinktype(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  setLinkType(
    this: Project,
    index: number,
    linkType: number,
    actionCode: number
  ) {
    // Index is In/Out for setlinktype API
    const memory = this._allocateMemory('int');
    this._instance.setValue(memory[0], index, 'i32');
    this._checkError(this._EN.setlinktype(memory[0], linkType, actionCode));
    return this._getValue(memory[0], 'int');
  }

  getLinkNodes(this: Project, index: number) {
    const memory = this._allocateMemory('int', 'int');
    this._checkError(this._EN.getlinknodes(index, ...memory));
    return {
      node1: this._getValue(memory[0], 'int'),
      node2: this._getValue(memory[1], 'int'),
    };
  }

  setLinkNodes(this: Project, index: number, node1: number, node2: number) {
    this._checkError(this._EN.setlinknodes(index, node1, node2));
  }

  getLinkValue(this: Project, index: number, property: number) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getlinkvalue(index, property, ...memory));
    return this._getValue(memory[0], 'double');
  }

  setLinkValue(this: Project, index: number, property: number, value: number) {
    this._checkError(this._EN.setlinkvalue(index, property, value));
  }

  setPipeData(
    this: Project,
    index: number,
    length: number,
    diam: number,
    rough: number,
    mloss: number
  ) {
    this._checkError(this._EN.setpipedata(index, length, diam, rough, mloss));
  }

  getPumpType(this: Project, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getpumptype(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getHeadCurveIndex(this: Project, linkIndex: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getheadcurveindex(linkIndex, ...memory));
    return this._getValue(memory[0], 'int');
  }

  setHeadCurveIndex(this: Project, linkIndex: number, curveIndex: number) {
    this._checkError(this._EN.setheadcurveindex(linkIndex, curveIndex));
  }

  getVertexCount(this: Project, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getvertexcount(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getVertex(this: Project, index: number, vertex: number) {
    const memory = this._allocateMemory('double', 'double');
    this._checkError(this._EN.getvertex(index, vertex, ...memory));
    return {
      x: this._getValue(memory[0], 'double'),
      y: this._getValue(memory[1], 'double'),
    };
  }

  setVertices(this: Project, index: number, x: number[], y: number[]) {
    if (x.length !== y.length) {
      throw new Error(
        `X and Y vertex arrays must have the same length - X length: ${x.length}, Y length ${y.length}`
      );
    }

    var xPtr = this._allocateMemoryForArray(x);
    var yPtr = this._allocateMemoryForArray(y);

    this._checkError(this._EN.setvertices(index, xPtr, yPtr, x.length));

    // Free memory
    Module._free(xPtr);
    Module._free(yPtr);
  }
}

export default NetworkLinkFunctions;
