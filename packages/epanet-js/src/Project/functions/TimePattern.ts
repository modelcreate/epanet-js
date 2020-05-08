import Project from '../Project';

class TimePatternFunctions {
  addPattern(this: Project, id: string) {
    this._checkError(this._EN.addpattern(id));
  }

  deletePattern(this: Project, index: number) {
    this._checkError(this._EN.deletepattern(index));
  }

  getPatternIndex(this: Project, id: string) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getpatternindex(id, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getPatternId(this: Project, index: number) {
    const memory = this._allocateMemory('char');
    this._checkError(this._EN.getpatternid(index, ...memory));
    return this._getValue(memory[0], 'char');
  }

  setPatternId(this: Project, index: number, id: string) {
    this._checkError(this._EN.setpatternid(index, id));
  }

  getPatternLenth(this: Project, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getpatternlen(index, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getPatternValue(this: Project, index: number, period: number) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getpatternvalue(index, period, ...memory));
    return this._getValue(memory[0], 'double');
  }

  setPatternValue(this: Project, index: number, period: number, value: number) {
    this._checkError(this._EN.setpatternvalue(index, period, value));
  }

  getAveragePatternValue(this: Project, index: number) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getaveragepatternvalue(index, ...memory));
    return this._getValue(memory[0], 'double');
  }

  setPattern(this: Project, index: number, values: number[]) {
    var valuesPtr = this._allocateMemoryForArray(values);

    this._checkError(this._EN.setpattern(index, valuesPtr, values.length));

    // Free memory
    this._instance._free(valuesPtr);
  }
}

export default TimePatternFunctions;
