import Workspace from 'Workspace/Workspace';
import { ProjectFunctions, NetworkNodeFunctions } from './functions';

class Project implements ProjectFunctions, NetworkNodeFunctions {
  _ws: Workspace;
  _instance: EmscriptenModule;
  _EN: EpanetProject;
  constructor(ws: Workspace) {
    this._ws = ws;
    this._instance = ws._instance;
    this._EN = new this._ws._instance.Epanet();
  }

  _checkError(errorCode: number) {
    if (errorCode === 0) {
      return;
    }
    const errorMsg = this._ws.getError(errorCode);
    throw new Error(errorMsg);
  }

  // Implementing function classes
  init = ProjectFunctions.prototype.init;
  saveinpfile = ProjectFunctions.prototype.saveinpfile;
  addnode = NetworkNodeFunctions.prototype.addnode;
  setjuncdata = NetworkNodeFunctions.prototype.setjuncdata;
}

export default Project;
