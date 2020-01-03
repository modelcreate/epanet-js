import Project from '../Project';

class DataCurveFunctions {
  addcurve(this: Project, id: string) {
    this._checkError(this._EN.addcurve(id));
  }

  deletecurve(this: Project, index: number) {
    this._checkError(this._EN.deletecurve(index));
  }

  getcurveindex(this: Project, id: string) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getcurveindex(id, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getcurveid(this: Project, index: number) {
    const memory = this._allocateMemory('char');
    this._checkError(this._EN.getcurveid(index, ...memory));
    return this._getValue(memory[0], 'char');
  }

  setcurveid(this: Project, index: number, id: string) {
    this._checkError(this._EN.setcurveid(index, id));
  }

  getcurvelen(this: Project, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getcurvelen(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getcurvetype(this: Project, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getcurvetype(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getcurvevalue(this: Project, curveIndex: number, pointIndex: number) {
    const memory = this._allocateMemory('double', 'double');
    this._checkError(this._EN.getcurvevalue(curveIndex, pointIndex, ...memory));
    return {
      x: this._getValue(memory[0], 'double'),
      y: this._getValue(memory[1], 'double'),
    };
  }

  setcurvevalue(
    this: Project,
    curveIndex: number,
    pointIndex: number,
    x: number,
    y: number
  ) {
    this._checkError(this._EN.setcurvevalue(curveIndex, pointIndex, x, y));
  }

  setcurve(this: Project, index: number, xValues: number[], yValues: number[]) {
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
