import Project from '../Project';
import { InitHydOption } from '../../index';

class HydraulicAnalysisFunctions {
  solveH(this: Project) {
    this._checkError(this._EN.solveH());
  }

  useHydFile(this: Project, filename: string) {
    this._checkError(this._EN.usehydfile(filename));
  }

  openH(this: Project) {
    this._checkError(this._EN.openH());
  }

  initH(this: Project, initFlag: InitHydOption) {
    this._checkError(this._EN.initH(initFlag));
  }

  runH(this: Project): number {
    const memory = this._allocateMemory('long');
    this._checkError(this._EN.runH(...memory));
    return this._getValue(memory[0], 'long');
  }

  nextH(this: Project): number {
    const memory = this._allocateMemory('long');
    this._checkError(this._EN.nextH(...memory));
    return this._getValue(memory[0], 'long');
  }

  saveH(this: Project) {
    this._checkError(this._EN.saveH());
  }

  saveHydFile(this: Project, filename: string) {
    this._checkError(this._EN.savehydfile(filename));
  }

  closeH(this: Project) {
    this._checkError(this._EN.closeH());
  }
}

export default HydraulicAnalysisFunctions;
