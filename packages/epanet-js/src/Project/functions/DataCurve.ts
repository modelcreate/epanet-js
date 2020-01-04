import Project from '../Project';

class DataCurveFunctions {
  addCurve(this: Project, id: string) {
    this._checkError(this._EN.addcurve(id));
  }

  deleteCurve(this: Project, index: number) {
    this._checkError(this._EN.deletecurve(index));
  }

  getCurveIndex(this: Project, id: string) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getcurveindex(id, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getCurveId(this: Project, index: number) {
    const memory = this._allocateMemory('char');
    this._checkError(this._EN.getcurveid(index, ...memory));
    return this._getValue(memory[0], 'char');
  }

  setCurveId(this: Project, index: number, id: string) {
    this._checkError(this._EN.setcurveid(index, id));
  }

  getCurveLenth(this: Project, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getcurvelen(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getCurveType(this: Project, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getcurvetype(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getCurveValue(this: Project, curveIndex: number, pointIndex: number) {
    const memory = this._allocateMemory('double', 'double');
    this._checkError(this._EN.getcurvevalue(curveIndex, pointIndex, ...memory));
    return {
      x: this._getValue(memory[0], 'double'),
      y: this._getValue(memory[1], 'double'),
    };
  }

  setCurveValue(
    this: Project,
    curveIndex: number,
    pointIndex: number,
    x: number,
    y: number
  ) {
    this._checkError(this._EN.setcurvevalue(curveIndex, pointIndex, x, y));
  }

  setCurve(this: Project, index: number, xValues: number[], yValues: number[]) {
    if (xValues.length !== yValues.length) {
      throw new Error(
        `X and Y vertex arrays must have the same length - X length: ${xValues.length}, Y length ${yValues.length}`
      );
    }

    var xPtr = this._allocateMemoryForArray(xValues);
    var yPtr = this._allocateMemoryForArray(yValues);

    this._checkError(this._EN.setcurve(index, xPtr, yPtr, xValues.length));

    // Free memory
    Module._free(xPtr);
    Module._free(yPtr);
  }
}

export default DataCurveFunctions;
