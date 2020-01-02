import Workspace from 'Workspace/Workspace';
import {
  ProjectFunctions,
  NetworkNodeFunctions,
  HydraulicAnalysisFunctions,
  WaterQualityAnalysisFunctions,
  ReportingFunctions,
  AnalysisOptionsFunctions,
} from './functions';

interface MemoryTypes {
  int: number;
  long: number;
  double: number;
  char: string;
}

class Project
  implements
    ProjectFunctions,
    NetworkNodeFunctions,
    HydraulicAnalysisFunctions,
    WaterQualityAnalysisFunctions,
    ReportingFunctions,
    AnalysisOptionsFunctions {
  _ws: Workspace;
  _instance: EmscriptenModule;
  _EN: EpanetProject;
  constructor(ws: Workspace) {
    this._ws = ws;
    this._instance = ws._instance;
    this._EN = new this._ws._instance.Epanet();
  }

  _getValue<T extends keyof MemoryTypes>(
    pointer: number,
    type: T
  ): MemoryTypes[T];
  _getValue(pointer: number, type: keyof MemoryTypes) {
    let value;
    if (type === 'char') {
      value = this._instance.UTF8ToString(pointer);
    } else {
      const size = type === 'int' ? 'i32' : type === 'long' ? 'i64' : 'double';
      value = this._instance.getValue(pointer, size);
    }
    this._instance._free(pointer);
    return value;
  }

  _allocateMemory(v1: string): [number];
  _allocateMemory(v1: string, v2: string): [number, number];
  _allocateMemory(v1: string, v2: string, v3: string): [number, number, number];
  _allocateMemory(
    v1: string,
    v2: string,
    v3: string,
    v4: string
  ): [number, number, number, number];
  _allocateMemory(v1: any): any {
    if (typeof v1 != 'string') {
      throw new Error('Method _allocateMemory expected string');
    }
    const types = Array.prototype.slice.call(arguments);
    return types.reduce((acc, t) => {
      const memsize = t === 'char' ? 1 : t === 'int' ? 4 : 8;
      const pointer = this._instance._malloc(memsize);
      return acc.concat(pointer);
    }, [] as number[]);
  }

  _checkError(errorCode: number) {
    if (errorCode === 0) {
      return;
    }
    const errorMsg = this._ws.getError(errorCode);
    throw new Error(errorMsg);
  }

  // Implementing function classes

  // Project Functions
  open = ProjectFunctions.prototype.open;
  close = ProjectFunctions.prototype.close;
  runproject = ProjectFunctions.prototype.runproject;
  init = ProjectFunctions.prototype.init;
  getcount = ProjectFunctions.prototype.getcount;
  gettitle = ProjectFunctions.prototype.gettitle;
  settitle = ProjectFunctions.prototype.settitle;
  saveinpfile = ProjectFunctions.prototype.saveinpfile;

  // Hydraulic Analysis Functions
  solveH = HydraulicAnalysisFunctions.prototype.solveH;
  usehydfile = HydraulicAnalysisFunctions.prototype.usehydfile;
  openH = HydraulicAnalysisFunctions.prototype.openH;
  initH = HydraulicAnalysisFunctions.prototype.initH;
  runH = HydraulicAnalysisFunctions.prototype.runH;
  nextH = HydraulicAnalysisFunctions.prototype.nextH;
  saveH = HydraulicAnalysisFunctions.prototype.saveH;
  savehydfile = HydraulicAnalysisFunctions.prototype.savehydfile;
  closeH = HydraulicAnalysisFunctions.prototype.closeH;

  // Water Quality Analysis Functions
  solveQ = WaterQualityAnalysisFunctions.prototype.solveQ;
  openQ = WaterQualityAnalysisFunctions.prototype.openQ;
  initQ = WaterQualityAnalysisFunctions.prototype.initQ;
  runQ = WaterQualityAnalysisFunctions.prototype.runQ;
  nextQ = WaterQualityAnalysisFunctions.prototype.nextQ;
  stepQ = WaterQualityAnalysisFunctions.prototype.stepQ;
  closeQ = WaterQualityAnalysisFunctions.prototype.closeQ;

  // Reporting Functions
  writeline = ReportingFunctions.prototype.writeline;
  report = ReportingFunctions.prototype.report;
  copyreport = ReportingFunctions.prototype.copyreport;
  clearreport = ReportingFunctions.prototype.clearreport;
  resetreport = ReportingFunctions.prototype.resetreport;
  setreport = ReportingFunctions.prototype.setreport;
  setstatusreport = ReportingFunctions.prototype.setstatusreport;
  getstatistic = ReportingFunctions.prototype.getstatistic;
  getresultindex = ReportingFunctions.prototype.getresultindex;

  // Analysis Options Functions
  getflowunits = AnalysisOptionsFunctions.prototype.getflowunits;
  getoption = AnalysisOptionsFunctions.prototype.getoption;
  getqualinfo = AnalysisOptionsFunctions.prototype.getqualinfo;
  getqualtype = AnalysisOptionsFunctions.prototype.getqualtype;
  gettimeparam = AnalysisOptionsFunctions.prototype.gettimeparam;
  setflowunits = AnalysisOptionsFunctions.prototype.setflowunits;
  setoption = AnalysisOptionsFunctions.prototype.setoption;
  setqualtype = AnalysisOptionsFunctions.prototype.setqualtype;
  settimeparam = AnalysisOptionsFunctions.prototype.settimeparam;

  //Network Node Functions
  addnode = NetworkNodeFunctions.prototype.addnode;
  setjuncdata = NetworkNodeFunctions.prototype.setjuncdata;
  getnodetype = NetworkNodeFunctions.prototype.getnodetype;
  getnodevalue = NetworkNodeFunctions.prototype.getnodevalue;
}

export default Project;
