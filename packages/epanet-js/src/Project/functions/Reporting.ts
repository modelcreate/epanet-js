import Project from '../Project';

class ReportingFunctions {
  writeLine(this: Project, line: string) {
    this._checkError(this._EN.writeline(line));
  }

  report(this: Project) {
    this._checkError(this._EN.report());
  }

  copyReport(this: Project, filename: string) {
    this._checkError(this._EN.copyreport(filename));
  }

  clearReport(this: Project) {
    this._checkError(this._EN.clearreport());
  }

  resetReport(this: Project) {
    this._checkError(this._EN.resetreport());
  }

  setReport(this: Project, format: string) {
    this._checkError(this._EN.setreport(format));
  }

  setStatusReport(this: Project, level: number) {
    this._checkError(this._EN.setstatusreport(level));
  }

  getStatistic(this: Project, type: number) {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.getstatistic(type, ...memory));
    return this._getValue(memory[0], 'double');
  }

  getResultIndex(this: Project, type: number, index: number) {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getresultindex(type, index, ...memory));
    return this._getValue(memory[0], 'int');
  }
}

export default ReportingFunctions;
