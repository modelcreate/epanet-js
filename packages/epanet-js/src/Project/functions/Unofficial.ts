import Project from '../Project';

class UnofficialFunctions {
  UNOFFICIAL_isnodeincontrol(this: Project, index: number): number {
    const memory = this._allocateMemory('double');
    this._checkError(this._EN.UNOFFICIAL_isnodeincontrol(index, ...memory));
    return this._getValue(memory[0], 'double');
  }
}

export default UnofficialFunctions;
