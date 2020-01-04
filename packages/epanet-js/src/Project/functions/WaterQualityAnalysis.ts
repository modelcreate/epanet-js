import Project from '../Project';

class WaterQualityAnalysisFunctions {
  solveQ(this: Project) {
    this._checkError(this._EN.solveQ());
  }

  openQ(this: Project) {
    this._checkError(this._EN.openQ());
  }

  initQ(this: Project, initFlag: number) {
    this._checkError(this._EN.initQ(initFlag));
  }

  runQ(this: Project): number {
    const memory = this._allocateMemory('long');
    this._checkError(this._EN.runQ(...memory));
    return this._getValue(memory[0], 'long');
  }

  nextQ(this: Project): number {
    const memory = this._allocateMemory('long');
    this._checkError(this._EN.nextQ(...memory));
    return this._getValue(memory[0], 'long');
  }

  stepQ(this: Project): number {
    const memory = this._allocateMemory('long');
    this._checkError(this._EN.stepQ(...memory));
    return this._getValue(memory[0], 'long');
  }

  closeQ(this: Project) {
    this._checkError(this._EN.closeQ());
  }
}

export default WaterQualityAnalysisFunctions;
