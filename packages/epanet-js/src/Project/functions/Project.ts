import Project from '../Project';
import { CountType, FlowUnits, HeadLossType } from '../../index';

class ProjectFunctions {
  close(this: Project) {
    this._checkError(this._EN.close());
  }

  getCount(this: Project, obj: CountType): number {
    const memory = this._allocateMemory('int');
    this._checkError(this._EN.getcount(obj, ...memory));
    return this._getValue(memory[0], 'int');
  }

  getTitle(this: Project) {
    const memory = this._allocateMemory(
      'char-title',
      'char-title',
      'char-title'
    );
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
    unitType: FlowUnits,
    headLosstype: HeadLossType
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

  // TODO: Include ability to have callback here
  runProject(
    this: Project,
    inputFile: string,
    reportFile: string,
    outputFile: string
  ) {
    this._checkError(this._EN.runproject(inputFile, reportFile, outputFile));
  }

  saveInpFile(this: Project, filename: string) {
    this._checkError(this._EN.saveinpfile(filename));
  }

  setTitle(this: Project, line1: string, line2: string, line3: string) {
    this._checkError(this._EN.settitle(line1, line2, line3));
  }
}

export default ProjectFunctions;
