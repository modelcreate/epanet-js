import Project from '../Project';
import { ControlType } from 'enum';

class SimpleControlFunctions {
  addControl(
    this: Project,
    type: ControlType,
    linkIndex: number,
    setting: number,
    nodeIndex: number,
    level: number
  ) {
    const memory = this._allocateMemory('int');
    this._checkError(
      this._EN.addcontrol(type, linkIndex, setting, nodeIndex, level, ...memory)
    );
    return this._getValue(memory[0], 'int');
  }

  deleteControl(this: Project, index: number) {
    this._checkError(this._EN.deletecontrol(index));
  }

  getControl(this: Project, index: number) {
    const memory = this._allocateMemory(
      'int',
      'int',
      'double',
      'int',
      'double'
    );
    this._checkError(this._EN.getcontrol(index, ...memory));
    return {
      type: this._getValue(memory[0], 'int') as ControlType,
      linkIndex: this._getValue(memory[1], 'int'),
      setting: this._getValue(memory[2], 'double'),
      nodeIndex: this._getValue(memory[3], 'int'),
      level: this._getValue(memory[4], 'double'),
    };
  }

  setControl(
    this: Project,
    index: number,
    type: ControlType,
    linkIndex: number,
    setting: number,
    nodeIndex: number,
    level: number
  ) {
    this._checkError(
      this._EN.setcontrol(index, type, linkIndex, setting, nodeIndex, level)
    );
  }
}

export default SimpleControlFunctions;
