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
  //       spread over the C function with memory address.
  //       Limit inputs to specific strings, at the moment anything can be inputted
  //       into this function and you will get 8 bytes of memory

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
      let memsize;
      switch (t) {
        case 'char':
          memsize = 32; //MAXID in EPANET
          break;

        case 'char-title':
          memsize = 80; //TITLELEN in EPANET
          break;

        case 'int':
          memsize = 4;
          break;

        default:
          memsize = 8; //Double
          break;
      }
      const pointer = this._instance._malloc(memsize);
      return acc.concat(pointer);
    }, [] as number[]);
  }

  _allocateMemoryForArray(arr: number[]): number {
    const typedArray = new Float64Array(arr);
    const nDataBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
    const dataPtr = this._instance._malloc(nDataBytes);

    this._instance.HEAP8.set(new Uint8Array(typedArray.buffer), dataPtr);

    return dataPtr;
  }

  _checkError(errorCode: number) {
    if (errorCode === 0) {
      return;
    } else if (errorCode < 100) {
      console.warn(`epanet-js: ${this._ws.getError(errorCode)}`);
      return;
    }
    const errorMsg = this._ws.getError(errorCode);
    throw new Error(errorMsg);
  }

  // Implementing function classes

  // Project Functions
  open = ProjectFunctions.prototype.open;
  close = ProjectFunctions.prototype.close;
  runProject = ProjectFunctions.prototype.runProject;
  init = ProjectFunctions.prototype.init;
  getCount = ProjectFunctions.prototype.getCount;
  getTitle = ProjectFunctions.prototype.getTitle;
  setTitle = ProjectFunctions.prototype.setTitle;
  saveInpFile = ProjectFunctions.prototype.saveInpFile;

  // Hydraulic Analysis Functions
  solveH = HydraulicAnalysisFunctions.prototype.solveH;
  useHydFile = HydraulicAnalysisFunctions.prototype.useHydFile;
  openH = HydraulicAnalysisFunctions.prototype.openH;
  initH = HydraulicAnalysisFunctions.prototype.initH;
  runH = HydraulicAnalysisFunctions.prototype.runH;
  nextH = HydraulicAnalysisFunctions.prototype.nextH;
  saveH = HydraulicAnalysisFunctions.prototype.saveH;
  saveHydFile = HydraulicAnalysisFunctions.prototype.saveHydFile;
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
  writeLine = ReportingFunctions.prototype.writeLine;
  report = ReportingFunctions.prototype.report;
  copyReport = ReportingFunctions.prototype.copyReport;
  clearReport = ReportingFunctions.prototype.clearReport;
  resetReport = ReportingFunctions.prototype.resetReport;
  setReport = ReportingFunctions.prototype.setReport;
  setStatusReport = ReportingFunctions.prototype.setStatusReport;
  getStatistic = ReportingFunctions.prototype.getStatistic;
  getResultIndex = ReportingFunctions.prototype.getResultIndex;

  // Analysis Options Functions
  getFlowUnits = AnalysisOptionsFunctions.prototype.getFlowUnits;
  getOption = AnalysisOptionsFunctions.prototype.getOption;
  getQualityInfo = AnalysisOptionsFunctions.prototype.getQualityInfo;
  getQualityType = AnalysisOptionsFunctions.prototype.getQualityType;
  getTimeParameter = AnalysisOptionsFunctions.prototype.getTimeParameter;
  setFlowUnits = AnalysisOptionsFunctions.prototype.setFlowUnits;
  setOption = AnalysisOptionsFunctions.prototype.setOption;
  setQualityType = AnalysisOptionsFunctions.prototype.setQualityType;
  setTimeParameter = AnalysisOptionsFunctions.prototype.setTimeParameter;

  //Network Node Functions
  addNode = NetworkNodeFunctions.prototype.addNode;
  deleteNode = NetworkNodeFunctions.prototype.deleteNode;
  getNodeIndex = NetworkNodeFunctions.prototype.getNodeIndex;
  getNodeId = NetworkNodeFunctions.prototype.getNodeId;
  setNodeId = NetworkNodeFunctions.prototype.setNodeId;
  getNodeType = NetworkNodeFunctions.prototype.getNodeType;
  getNodeValue = NetworkNodeFunctions.prototype.getNodeValue;
  setNodeValue = NetworkNodeFunctions.prototype.setNodeValue;
  setJunctionData = NetworkNodeFunctions.prototype.setJunctionData;
  setTankData = NetworkNodeFunctions.prototype.setTankData;
  getCoordinates = NetworkNodeFunctions.prototype.getCoordinates;
  setCoordinates = NetworkNodeFunctions.prototype.setCoordinates;

  // Nodal Demand Functions
  addDemand = NodalDemandFunctions.prototype.addDemand;
  deleteDemand = NodalDemandFunctions.prototype.deleteDemand;
  getBaseDemand = NodalDemandFunctions.prototype.getBaseDemand;
  getDemandIndex = NodalDemandFunctions.prototype.getDemandIndex;
  getDemandModel = NodalDemandFunctions.prototype.getDemandModel;
  getDemandName = NodalDemandFunctions.prototype.getDemandName;
  getDemandPattern = NodalDemandFunctions.prototype.getDemandPattern;
  getNumberOfDemands = NodalDemandFunctions.prototype.getNumberOfDemands;
  setBaseDemand = NodalDemandFunctions.prototype.setBaseDemand;
  setDemandModel = NodalDemandFunctions.prototype.setDemandModel;
  setDemandName = NodalDemandFunctions.prototype.setDemandName;
  setDemandPattern = NodalDemandFunctions.prototype.setDemandPattern;

  // Network Link Functions
  addLink = NetworkLinkFunctions.prototype.addLink;
  deleteLink = NetworkLinkFunctions.prototype.deleteLink;
  getLinkIndex = NetworkLinkFunctions.prototype.getLinkIndex;
  getLinkId = NetworkLinkFunctions.prototype.getLinkId;
  setLinkId = NetworkLinkFunctions.prototype.setLinkId;
  getLinkType = NetworkLinkFunctions.prototype.getLinkType;
  setLinkType = NetworkLinkFunctions.prototype.setLinkType;
  getLinkNodes = NetworkLinkFunctions.prototype.getLinkNodes;
  setLinkNodes = NetworkLinkFunctions.prototype.setLinkNodes;
  getLinkValue = NetworkLinkFunctions.prototype.getLinkValue;
  setLinkValue = NetworkLinkFunctions.prototype.setLinkValue;
  setPipeData = NetworkLinkFunctions.prototype.setPipeData;
  getPumpType = NetworkLinkFunctions.prototype.getPumpType;
  getHeadCurveIndex = NetworkLinkFunctions.prototype.getHeadCurveIndex;
  setHeadCurveIndex = NetworkLinkFunctions.prototype.setHeadCurveIndex;
  getVertexCount = NetworkLinkFunctions.prototype.getVertexCount;
  getVertex = NetworkLinkFunctions.prototype.getVertex;
  setVertices = NetworkLinkFunctions.prototype.setVertices;

  // Time Pattern Functions
  addPattern = TimePatternFunctions.prototype.addPattern;
  deletePattern = TimePatternFunctions.prototype.deletePattern;
  getPatternIndex = TimePatternFunctions.prototype.getPatternIndex;
  getPatternId = TimePatternFunctions.prototype.getPatternId;
  setPatternId = TimePatternFunctions.prototype.setPatternId;
  getPatternLenth = TimePatternFunctions.prototype.getPatternLenth;
  getPatternValue = TimePatternFunctions.prototype.getPatternValue;
  setPatternValue = TimePatternFunctions.prototype.setPatternValue;
  getAveragePatternValue =
    TimePatternFunctions.prototype.getAveragePatternValue;
  setPattern = TimePatternFunctions.prototype.setPattern;

  // Data Curve Functions
  addCurve = DataCurveFunctions.prototype.addCurve;
  deleteCurve = DataCurveFunctions.prototype.deleteCurve;
  getCurveIndex = DataCurveFunctions.prototype.getCurveIndex;
  getCurveId = DataCurveFunctions.prototype.getCurveId;
  setCurveId = DataCurveFunctions.prototype.setCurveId;
  getCurveLenth = DataCurveFunctions.prototype.getCurveLenth;
  getCurveType = DataCurveFunctions.prototype.getCurveType;
  getCurveValue = DataCurveFunctions.prototype.getCurveValue;
  setCurveValue = DataCurveFunctions.prototype.setCurveValue;
  setCurve = DataCurveFunctions.prototype.setCurve;

  // Simple Control Functions
  addControl = SimpleControlFunctions.prototype.addControl;
  deleteControl = SimpleControlFunctions.prototype.deleteControl;
  getControl = SimpleControlFunctions.prototype.getControl;
  setControl = SimpleControlFunctions.prototype.setControl;

  // Rule-Based Control Functions
  addRule = RuleBasedControlFunctions.prototype.addRule;
  deleteRule = RuleBasedControlFunctions.prototype.deleteRule;
  getRule = RuleBasedControlFunctions.prototype.getRule;
  getRuleId = RuleBasedControlFunctions.prototype.getRuleId;
  getPremise = RuleBasedControlFunctions.prototype.getPremise;
  setPremise = RuleBasedControlFunctions.prototype.setPremise;
  setPremiseIndex = RuleBasedControlFunctions.prototype.setPremiseIndex;
  setPremiseStatus = RuleBasedControlFunctions.prototype.setPremiseStatus;
  setPremiseValue = RuleBasedControlFunctions.prototype.setPremiseValue;
  getThenAction = RuleBasedControlFunctions.prototype.getThenAction;
  setThenAction = RuleBasedControlFunctions.prototype.setThenAction;
  getElseAction = RuleBasedControlFunctions.prototype.getElseAction;
  setElseAction = RuleBasedControlFunctions.prototype.setElseAction;
  setRulePriority = RuleBasedControlFunctions.prototype.setRulePriority;
}

export default Project;
