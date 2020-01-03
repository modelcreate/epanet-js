import Workspace from 'Workspace/Workspace';
import {
  ProjectFunctions,
  NetworkNodeFunctions,
  HydraulicAnalysisFunctions,
  WaterQualityAnalysisFunctions,
  ReportingFunctions,
  AnalysisOptionsFunctions,
  NodalDemandFunctions,
  NetworkLinkFunctions,
  TimePatternFunctions,
  DataCurveFunctions,
  SimpleControlFunctions,
  RuleBasedControlFunctions,
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
    AnalysisOptionsFunctions,
    NetworkLinkFunctions,
    TimePatternFunctions,
    DataCurveFunctions,
    SimpleControlFunctions,
    RuleBasedControlFunctions {
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

  // TODO: There is probably a better way to do this then overloading however
  //       first attempts to use ...operator in arguments worked, I couldn't
  //       figure out how to then have a set length tuple which we need to
  //       spread over the C function with memory address
  _allocateMemory(v1: string): [number];
  _allocateMemory(v1: string, v2: string): [number, number];
  _allocateMemory(v1: string, v2: string, v3: string): [number, number, number];
  _allocateMemory(
    v1: string,
    v2: string,
    v3: string,
    v4: string
  ): [number, number, number, number];
  _allocateMemory(
    v1: string,
    v2: string,
    v3: string,
    v4: string,
    v5: string
  ): [number, number, number, number, number];
  _allocateMemory(
    v1: string,
    v2: string,
    v3: string,
    v4: string,
    v5: string,
    v6: string,
    v7: string
  ): [number, number, number, number, number, number, number];
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

  _allocateMemoryForArray(arr: number[]): number {
    const data = new Float32Array(arr);

    // Get data byte size, allocate memory on Emscripten heap, and get pointer
    const nDataBytes = data.length * data.BYTES_PER_ELEMENT;
    const dataPtr = this._instance._malloc(nDataBytes);
    const dataHeap = new Uint8Array(
      this._instance.HEAPU8.buffer,
      dataPtr,
      nDataBytes
    );
    dataHeap.set(new Uint8Array(data.buffer));

    //return dataHeap.byteOffset?

    return dataPtr;
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
  deletenode = NetworkNodeFunctions.prototype.deletenode;
  getnodeindex = NetworkNodeFunctions.prototype.getnodeindex;
  getnodeid = NetworkNodeFunctions.prototype.getnodeid;
  setnodeid = NetworkNodeFunctions.prototype.setnodeid;
  getnodetype = NetworkNodeFunctions.prototype.getnodetype;
  getnodevalue = NetworkNodeFunctions.prototype.getnodevalue;
  setnodevalue = NetworkNodeFunctions.prototype.setnodevalue;
  setjuncdata = NetworkNodeFunctions.prototype.setjuncdata;
  settankdata = NetworkNodeFunctions.prototype.settankdata;
  getcoord = NetworkNodeFunctions.prototype.getcoord;
  setcoord = NetworkNodeFunctions.prototype.setcoord;

  // Nodal Demand Functions
  adddemand = NodalDemandFunctions.prototype.adddemand;
  deletedemand = NodalDemandFunctions.prototype.deletedemand;
  getbasedemand = NodalDemandFunctions.prototype.getbasedemand;
  getdemandindex = NodalDemandFunctions.prototype.getdemandindex;
  getdemandmodel = NodalDemandFunctions.prototype.getdemandmodel;
  getdemandname = NodalDemandFunctions.prototype.getdemandname;
  getdemandpattern = NodalDemandFunctions.prototype.getdemandpattern;
  getnumdemands = NodalDemandFunctions.prototype.getnumdemands;
  setbasedemand = NodalDemandFunctions.prototype.setbasedemand;
  setdemandmodel = NodalDemandFunctions.prototype.setdemandmodel;
  setdemandname = NodalDemandFunctions.prototype.setdemandname;
  setdemandpattern = NodalDemandFunctions.prototype.setdemandpattern;

  // Network Link Functions
  addlink = NetworkLinkFunctions.prototype.addlink;
  deletelink = NetworkLinkFunctions.prototype.deletelink;
  getlinkindex = NetworkLinkFunctions.prototype.getlinkindex;
  getlinkid = NetworkLinkFunctions.prototype.getlinkid;
  setlinkid = NetworkLinkFunctions.prototype.setlinkid;
  getlinktype = NetworkLinkFunctions.prototype.getlinktype;
  setlinktype = NetworkLinkFunctions.prototype.setlinktype;
  getlinknodes = NetworkLinkFunctions.prototype.getlinknodes;
  setlinknodes = NetworkLinkFunctions.prototype.setlinknodes;
  getlinkvalue = NetworkLinkFunctions.prototype.getlinkvalue;
  setlinkvalue = NetworkLinkFunctions.prototype.setlinkvalue;
  setpipedata = NetworkLinkFunctions.prototype.setpipedata;
  getpumptype = NetworkLinkFunctions.prototype.getpumptype;
  getheadcurveindex = NetworkLinkFunctions.prototype.getheadcurveindex;
  setheadcurveindex = NetworkLinkFunctions.prototype.setheadcurveindex;
  getvertexcount = NetworkLinkFunctions.prototype.getvertexcount;
  getvertex = NetworkLinkFunctions.prototype.getvertex;
  setvertices = NetworkLinkFunctions.prototype.setvertices;

  // Time Pattern Functions
  addpattern = TimePatternFunctions.prototype.addpattern;
  deletepattern = TimePatternFunctions.prototype.deletepattern;
  getpatternindex = TimePatternFunctions.prototype.getpatternindex;
  getpatternid = TimePatternFunctions.prototype.getpatternid;
  setpatternid = TimePatternFunctions.prototype.setpatternid;
  getpatternlen = TimePatternFunctions.prototype.getpatternlen;
  getpatternvalue = TimePatternFunctions.prototype.getpatternvalue;
  setpatternvalue = TimePatternFunctions.prototype.setpatternvalue;
  getaveragepatternvalue =
    TimePatternFunctions.prototype.getaveragepatternvalue;
  setpattern = TimePatternFunctions.prototype.setpattern;

  // Data Curve Functions
  addcurve = DataCurveFunctions.prototype.addcurve;
  deletecurve = DataCurveFunctions.prototype.deletecurve;
  getcurveindex = DataCurveFunctions.prototype.getcurveindex;
  getcurveid = DataCurveFunctions.prototype.getcurveid;
  setcurveid = DataCurveFunctions.prototype.setcurveid;
  getcurvelen = DataCurveFunctions.prototype.getcurvelen;
  getcurvetype = DataCurveFunctions.prototype.getcurvetype;
  getcurvevalue = DataCurveFunctions.prototype.getcurvevalue;
  setcurvevalue = DataCurveFunctions.prototype.setcurvevalue;
  setcurve = DataCurveFunctions.prototype.setcurve;

  // Simple Control Functions
  addcontrol = SimpleControlFunctions.prototype.addcontrol;
  deletecontrol = SimpleControlFunctions.prototype.deletecontrol;
  getcontrol = SimpleControlFunctions.prototype.getcontrol;
  setcontrol = SimpleControlFunctions.prototype.setcontrol;

  // Rule-Based Control Functions
  addrule = RuleBasedControlFunctions.prototype.addrule;
  deleterule = RuleBasedControlFunctions.prototype.deleterule;
  getrule = RuleBasedControlFunctions.prototype.getrule;
  getruleID = RuleBasedControlFunctions.prototype.getruleID;
  getpremise = RuleBasedControlFunctions.prototype.getpremise;
  setpremise = RuleBasedControlFunctions.prototype.setpremise;
  setpremiseindex = RuleBasedControlFunctions.prototype.setpremiseindex;
  setpremisestatus = RuleBasedControlFunctions.prototype.setpremisestatus;
  setpremisevalue = RuleBasedControlFunctions.prototype.setpremisevalue;
  getthenaction = RuleBasedControlFunctions.prototype.getthenaction;
  setthenaction = RuleBasedControlFunctions.prototype.setthenaction;
  getelseaction = RuleBasedControlFunctions.prototype.getelseaction;
  setelseaction = RuleBasedControlFunctions.prototype.setelseaction;
  setrulepriority = RuleBasedControlFunctions.prototype.setrulepriority;
}

export default Project;
