import { Project } from '../';
import { NodeType } from 'enum';

class NetworkNodeFunctions {
  addnode(this: Project, id: string, nodeType: NodeType) {
    const intPointer = this._instance._malloc(4);
    const result = this._EN.addnode(id, nodeType, intPointer);
    const returnValue = this._instance.getValue(intPointer, 'i32');

    this._instance._free(intPointer);

    this._checkError(result);
    return returnValue;
  }

  setjuncdata(
    this: Project,
    index: number,
    elev: number,
    dmnd: number,
    dmndpat: string
  ) {
    const result = this._EN.setjuncdata(index, elev, dmnd, dmndpat);
    return result;
  }
}

export default NetworkNodeFunctions;
