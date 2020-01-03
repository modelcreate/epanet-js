import Project from '../Project';

class TimePatternFunctions {
  addpattern(this: Project, id: string) {
    this._checkError(this._EN.addpattern(id));
  }

  deletepattern(this: Project, index: number) {
    this._checkError(this._EN.deletepattern(index));
  }

  getpatternindex(this: Project, id: string) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getpatternindex(id, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getpatternid(this: Project, index: number) {
    const memory = this._allocateMemory('char');
    this._checkError(this._EN.getpatternid(index, ...memory));
    return this._getValue(memory[0], 'char');
  }

  setpatternid(this: Project, index: number, id: string) {
    this._checkError(this._EN.setpatternid(index, id));
  }

  getpatternlen(this: Project, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getpatternlen(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getpatternvalue(this: Project, index: number, period: number) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getpatternvalue(index, period, ...memory));
    return this._getValue(memory[0], 'double');
  }

  setpatternvalue(this: Project, index: number, period: number, value: number) {
    this._checkError(this._EN.setpatternvalue(index, period, value));
  }

  getaveragepatternvalue(this: Project, index: number) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getaveragepatternvalue(index, ...memory));
    return this._getValue(memory[0], 'double');
  }

  setpattern(this: Project, index: number, values: number[]) {
    var valuesPtr = this._allocateMemoryForArray(values);

    this._checkError(this._EN.setpattern(index, valuesPtr, values.length));

    // Free memory
    Module._free(valuesPtr);
  }
}

export default TimePatternFunctions;
