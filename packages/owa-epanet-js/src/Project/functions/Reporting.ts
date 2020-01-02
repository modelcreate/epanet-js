import Project from '../Project';

class ReportingFunctions {
  writeline(this: Project, line: string) {
    this._checkError(this._EN.writeline(line));
  }

  report(this: Project) {
    this._checkError(this._EN.report());
  }

  copyreport(this: Project, filename: string) {
    this._checkError(this._EN.copyreport(filename));
  }

  clearreport(this: Project) {
    this._checkError(this._EN.clearreport());
  }

  resetreport(this: Project) {
    this._checkError(this._EN.resetreport());
  }

  setreport(this: Project, format: string) {
    this._checkError(this._EN.setreport(format));
  }

  setstatusreport(this: Project, level: number) {
    this._checkError(this._EN.setstatusreport(level));
  }

  getstatistic(this: Project, type: number) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getstatistic(type, ...memory));
    return this._getValue(memory[0], 'double');
  }

  getresultindex(this: Project, type: number, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getresultindex(type, index, ...memory));
    return this._getValue(memory[0], 'int');
  }
}

export default ReportingFunctions;
