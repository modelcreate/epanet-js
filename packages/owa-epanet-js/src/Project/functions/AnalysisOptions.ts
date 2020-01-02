import Project from '../Project';

class AnalysisOptionsFunctions {
  getflowunits(this: Project): number {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getflowunits(...memory));
    return this._getValue(memory[0], 'int');
  }

  getoption(this: Project, option: number): number {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getoption(option, ...memory));
    return this._getValue(memory[0], 'double');
  }

  getqualinfo(this: Project) {
    const memory = this._allocateMemory('int', 'char', 'char', 'int');
    this._checkError(this._EN.getqualinfo(...memory));
    return {
      qualType: this._getValue(memory[0], 'int'),
      chemName: this._getValue(memory[1], 'char'),
      chemUnits: this._getValue(memory[2], 'char'),
      traceNode: this._getValue(memory[3], 'int'),
    };
  }

  getqualtype(this: Project) {
    const memory = this._allocateMemory('int', 'int');
    this._checkError(this._EN.getqualtype(...memory));
    return {
      qualType: this._getValue(memory[0], 'int'),
      traceNode: this._getValue(memory[1], 'int'),
    };
  }

  gettimeparam(this: Project, param: number): number {
    const memory = this._allocateMemory('long');
    this._checkError(this._EN.gettimeparam(param, ...memory));
    return this._getValue(memory[0], 'long');
  }

  setflowunits(this: Project, units: number) {
    this._checkError(this._EN.setflowunits(units));
  }

  setoption(this: Project, option: number, value: number) {
    this._checkError(this._EN.setoption(option, value));
  }

  setqualtype(
    this: Project,
    qualType: number,
    chemName: string,
    chemUnits: string,
    traceNode: string
  ) {
    this._checkError(
      this._EN.setqualtype(qualType, chemName, chemUnits, traceNode)
    );
  }

  settimeparam(this: Project, param: number, value: number) {
    this._checkError(this._EN.settimeparam(param, value));
  }
}

export default AnalysisOptionsFunctions;
