import Project from '../Project';

class ProjectFunctions {
  close(this: Project) {
    this._checkError(this._EN.close());
  }

  getcount(this: Project, obj: number): number {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getcount(obj, ...memory));
    return this._getValue(memory[0], 'int');
  }

  gettitle(this: Project) {
    const memory = this._allocateMemory('char', 'char', 'char');
    this._checkError(this._EN.gettitle(...memory));
    return {
      line1: this._getValue(memory[0], 'char'),
      line2: this._getValue(memory[1], 'char'),
      line3: this._getValue(memory[2], 'char'),
    };
  }

  init(
    this: Project,
    rptFile: string,
    outFile: string,
    unitType: number,
    headLosstype: number
  ) {
    this._checkError(this._EN.init(rptFile, outFile, unitType, headLosstype));
  }

  open(
    this: Project,
    inputFile: string,
    reportFile: string,
    outputFile: string
  ) {
    this._checkError(this._EN.open(inputFile, reportFile, outputFile));
  }

  runproject(
    this: Project,
    inputFile: string,
    reportFile: string,
    outputFile: string
  ) {
    this._checkError(this._EN.runproject(inputFile, reportFile, outputFile));
  }

  saveinpfile(this: Project, filename: string) {
    this._checkError(this._EN.saveinpfile(filename));
  }

  settitle(this: Project, line1: string, line2: string, line3: string) {
    this._checkError(this._EN.settitle(line1, line2, line3));
  }
}

export default ProjectFunctions;
