// Type definitions for Emscripten 1.38.33
// Project: http://kripken.github.io/emscripten-site/index.html
// Definitions by: Kensuke Matsuzaki <https://github.com/zakki>
//                 Periklis Tsirakidis <https://github.com/periklis>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

/** Other WebAssembly declarations, for compatibility with older versions of Typescript */
declare namespace WebAssembly {
  interface Module {}
}

declare namespace Emscripten {
  interface FileSystemType {}
  type EnvironmentType = "WEB" | "NODE" | "SHELL" | "WORKER";
  type ValueType = "number" | "string" | "array" | "boolean";
  type TypeCompatibleWithC = number | string | any[] | boolean;

  type WebAssemblyImports = Array<{
    name: string;
    kind: string;
  }>;

  type WebAssemblyExports = Array<{
    module: string;
    name: string;
    kind: string;
  }>;

  interface CCallOpts {
    async?: boolean;
  }
}

interface EmscriptenModule {
  print(str: string): void;
  printErr(str: string): void;
  arguments: string[];
  environment: Emscripten.EnvironmentType;
  preInit: Array<{ (): void }>;
  preRun: Array<{ (): void }>;
  postRun: Array<{ (): void }>;
  onAbort: { (what: any): void };
  onRuntimeInitialized: { (): void };
  preinitializedWebGLContext: WebGLRenderingContext;
  noInitialRun: boolean;
  noExitRuntime: boolean;
  logReadFiles: boolean;
  filePackagePrefixURL: string;
  wasmBinary: ArrayBuffer;

  destroy(object: object): void;
  getPreloadedPackage(
    remotePackageName: string,
    remotePackageSize: number
  ): ArrayBuffer;
  instantiateWasm(
    imports: Emscripten.WebAssemblyImports,
    successCallback: (module: WebAssembly.Module) => void
  ): Emscripten.WebAssemblyExports;
  locateFile(url: string): string;
  onCustomMessage(event: MessageEvent): void;

  Runtime: any;

  ccall(
    ident: string,
    returnType: Emscripten.ValueType | null,
    argTypes: Emscripten.ValueType[],
    args: Emscripten.TypeCompatibleWithC[],
    opts?: Emscripten.CCallOpts
  ): any;
  cwrap(
    ident: string,
    returnType: Emscripten.ValueType | null,
    argTypes: Emscripten.ValueType[],
    opts?: Emscripten.CCallOpts
  ): (...args: any[]) => any;

  setValue(ptr: number, value: any, type: string, noSafe?: boolean): void;
  getValue(ptr: number, type: string, noSafe?: boolean): number;

  ALLOC_NORMAL: number;
  ALLOC_STACK: number;
  ALLOC_STATIC: number;
  ALLOC_DYNAMIC: number;
  ALLOC_NONE: number;

  allocate(
    slab: any,
    types: string | string[],
    allocator: number,
    ptr: number
  ): number;

  // USE_TYPED_ARRAYS == 1
  HEAP: Int32Array;
  IHEAP: Int32Array;
  FHEAP: Float64Array;

  // USE_TYPED_ARRAYS == 2
  HEAP8: Int8Array;
  HEAP16: Int16Array;
  HEAP32: Int32Array;
  HEAPU8: Uint8Array;
  HEAPU16: Uint16Array;
  HEAPU32: Uint32Array;
  HEAPF32: Float32Array;
  HEAPF64: Float64Array;

  TOTAL_STACK: number;
  TOTAL_MEMORY: number;
  FAST_MEMORY: number;

  addOnPreRun(cb: () => any): void;
  addOnInit(cb: () => any): void;
  addOnPreMain(cb: () => any): void;
  addOnExit(cb: () => any): void;
  addOnPostRun(cb: () => any): void;

  // Tools
  intArrayFromString(
    stringy: string,
    dontAddNull?: boolean,
    length?: number
  ): number[];
  intArrayToString(array: number[]): string;
  writeStringToMemory(str: string, buffer: number, dontAddNull: boolean): void;
  writeArrayToMemory(array: number[], buffer: number): void;
  writeAsciiToMemory(str: string, buffer: number, dontAddNull: boolean): void;

  addRunDependency(id: any): void;
  removeRunDependency(id: any): void;

  preloadedImages: any;
  preloadedAudios: any;

  _malloc(size: number): number;
  _free(ptr: number): void;

  // Exported Functions - LB
  FS: EmscriptenFileSysten;
  UTF8ToString(ptr: number, maxBytesToRead?: number): string;
  getversion(ptr: number): number;
  geterror(errorCode: number, ptr: number): number;
  Epanet: EpanetProjectConstructable;
}

// EPANET
interface EpanetProjectConstructable {
  new (): EpanetProject;
}
interface EpanetProject {
  // Generated methods

  //Project Functions
  open(inputFile: string, reportFile: string, outputFile: string): number;
  close(): number;
  runproject(inputFile: string, reportFile: string, outputFile: string): number;
  init(
    reportFile: string,
    outputFile: string,
    unitsType: number,
    headLossType: number
  ): number;
  getcount(obj: number, count: number): number;
  gettitle(out_line1: number, out_line2: number, out_line3: number): number;
  settitle(line1: string, line2: string, line3: string): number;
  saveinpfile(filename: string): number;

  // Hydraulic Analysis Functions
  solveH(): number;
  usehydfile(filename: string): number;
  openH(): number;
  initH(initFlag: number): number;
  runH(currentTime: number): number;
  nextH(tStep: number): number;
  saveH(): number;
  savehydfile(filename: string): number;
  closeH(): number;

  // Water Quality Analysis Functions
  solveQ(): number;
  openQ(): number;
  initQ(initFlag: number): number;
  runQ(currentTime: number): number;
  nextQ(tStep: number): number;
  stepQ(timeLeft: number): number;
  closeQ(): number;

  // Reporting Functions
  writeline(line: string): number;
  report(): number;
  copyreport(filename: string): number;
  clearreport(): number;
  resetreport(): number;
  setreport(format: string): number;
  setstatusreport(level: number): number;
  getstatistic(type: number, value: number): number;
  getresultindex(type: number, index: number, value: number): number;

  // Analysis Options Functions
  getflowunits(units: number): number;
  getoption(option: number, value: number): number;
  getqualinfo(
    qualType: number,
    out_chemName: number,
    out_chemUnits: number,
    traceNode: number
  ): number;
  getqualtype(qualType: number, traceNode: number): number;
  gettimeparam(param: number, value: number): number;
  setflowunits(units: number): number;
  setoption(option: number, value: number): number;
  setqualtype(
    qualType: number,
    chemName: string,
    chemUnits: string,
    traceNode: string
  ): number;
  settimeparam(param: number, value: number): number;

  // Network Node Functions
  addnode(id: string, nodeType: number, index: number): number;
  deletenode(index: number, actionCode: number): number;
  getnodeindex(id: string, index: number): number;
  getnodeid(index: number, out_id: number): number;
  setnodeid(index: number, newid: string): number;
  getnodetype(index: number, nodeType: number): number;
  getnodevalue(index: number, property: number, value: number): number;
  setnodevalue(index: number, property: number, value: number): number;
  setjuncdata(
    index: number,
    elev: number,
    dmnd: number,
    dmndpat: string
  ): number;
  settankdata(
    index: number,
    elev: number,
    initlvl: number,
    minlvl: number,
    maxlvl: number,
    diam: number,
    minvol: number,
    volcurve: string
  ): number;
  getcoord(index: number, x: number, y: number): number;
  setcoord(index: number, x: number, y: number): number;

  //Nodal Demand Functions
  adddemand(
    nodeIndex: number,
    baseDemand: number,
    demandPattern: string,
    demandName: string
  ): number;
  deletedemand(nodeIndex: number, demandIndex: number): number;
  getbasedemand(
    nodeIndex: number,
    demandIndex: number,
    baseDemand: number
  ): number;
  getdemandindex(
    nodeIndex: number,
    demandName: string,
    demandIndex: number
  ): number;
  getdemandmodel(
    type: number,
    pmin: number,
    preq: number,
    pexp: number
  ): number;
  getdemandname(
    nodeIndex: number,
    demandIndex: number,
    out_demandName: number
  ): number;
  getdemandpattern(
    nodeIndex: number,
    demandIndex: number,
    patIndex: number
  ): number;
  getnumdemands(nodeIndex: number, numDemands: number): number;
  setbasedemand(
    nodeIndex: number,
    demandIndex: number,
    baseDemand: number
  ): number;
  setdemandmodel(
    type: number,
    pmin: number,
    preq: number,
    pexp: number
  ): number;
  setdemandname(
    nodeIndex: number,
    demandIdx: number,
    demandName: string
  ): number;
  setdemandpattern(
    nodeIndex: number,
    demandIndex: number,
    patIndex: number
  ): number;

  // Network Link Functions
  addlink(
    id: string,
    linkType: number,
    fromNode: string,
    toNode: string,
    index: number
  ): number;
  deletelink(index: number, actionCode: number): number;
  getlinkindex(id: string, index: number): number;
  getlinkid(index: number, out_id: number): number;
  setlinkid(index: number, newid: string): number;
  getlinktype(index: number, linkType: number): number;
  setlinktype(
    inout_index: number,
    linkType: number,
    actionCode: number
  ): number;
  getlinknodes(index: number, node1: number, node2: number): number;
  setlinknodes(index: number, node1: number, node2: number): number;
  getlinkvalue(index: number, property: number, value: number): number;
  setlinkvalue(index: number, property: number, value: number): number;
  setpipedata(
    index: number,
    length: number,
    diam: number,
    rough: number,
    mloss: number
  ): number;
  getpumptype(linkIndex: number, pumpType: number): number;
  getheadcurveindex(linkIndex: number, curveIndex: number): number;
  setheadcurveindex(linkIndex: number, curveIndex: number): number;
  getvertexcount(index: number, count: number): number;
  getvertex(index: number, vertex: number, x: number, y: number): number;
  setvertices(index: number, x: number, y: number, count: number): number;

  // Time Pattern Functions
  addpattern(id: string): number;
  deletepattern(index: number): number;
  getpatternindex(id: string, index: number): number;
  getpatternid(index: number, out_id: number): number;
  setpatternid(index: number, id: string): number;
  getpatternlen(index: number, len: number): number;
  getpatternvalue(index: number, period: number, value: number): number;
  setpatternvalue(index: number, period: number, value: number): number;
  getaveragepatternvalue(index: number, value: number): number;
  setpattern(index: number, values: number, len: number): number;

  // Data Curve Functions
  addcurve(id: string): number;
  deletecurve(index: number): number;
  getcurveindex(id: string, index: number): number;
  getcurveid(index: number, out_id: number): number;
  setcurveid(index: number, id: string): number;
  getcurvelen(index: number, len: number): number;
  getcurvetype(index: number, type: number): number;
  getcurvevalue(
    curveIndex: number,
    pointIndex: number,
    x: number,
    y: number
  ): number;
  setcurvevalue(
    curveIndex: number,
    pointIndex: number,
    x: number,
    y: number
  ): number;
  setcurve(
    index: number,
    xValues: number,
    yValues: number,
    nPoints: number
  ): number;

  // Simple Control Functions
  addcontrol(
    type: number,
    linkIndex: number,
    setting: number,
    nodeIndex: number,
    level: number,
    index: number
  ): number;
  deletecontrol(index: number): number;
  getcontrol(
    index: number,
    type: number,
    linkIndex: number,
    setting: number,
    nodeIndex: number,
    level: number
  ): number;
  setcontrol(
    index: number,
    type: number,
    linkIndex: number,
    setting: number,
    nodeIndex: number,
    level: number
  ): number;

  // Rule-Based Control Functions
  addrule(rule: string): number;
  deleterule(index: number): number;
  getrule(
    index: number,
    nPremises: number,
    nThenActions: number,
    nElseActions: number,
    priority: number
  ): number;
  getruleID(index: number, out_id: number): number;
  getpremise(
    ruleIndex: number,
    premiseIndex: number,
    logop: number,
    object: number,
    objIndex: number,
    variable: number,
    relop: number,
    status: number,
    value: number
  ): number;
  setpremise(
    ruleIndex: number,
    premiseIndex: number,
    logop: number,
    object: number,
    objIndex: number,
    variable: number,
    relop: number,
    status: number,
    value: number
  ): number;
  setpremiseindex(
    ruleIndex: number,
    premiseIndex: number,
    objIndex: number
  ): number;
  setpremisestatus(
    ruleIndex: number,
    premiseIndex: number,
    status: number
  ): number;
  setpremisevalue(
    ruleIndex: number,
    premiseIndex: number,
    value: number
  ): number;
  getthenaction(
    ruleIndex: number,
    actionIndex: number,
    linkIndex: number,
    status: number,
    setting: number
  ): number;
  setthenaction(
    ruleIndex: number,
    actionIndex: number,
    linkIndex: number,
    status: number,
    setting: number
  ): number;
  getelseaction(
    ruleIndex: number,
    actionIndex: number,
    linkIndex: number,
    status: number,
    setting: number
  ): number;
  setelseaction(
    ruleIndex: number,
    actionIndex: number,
    linkIndex: number,
    status: number,
    setting: number
  ): number;
  setrulepriority(index: number, priority: number): number;
}

// By default Emscripten emits a single global Module.  Users setting -s
// MODULARIZE=1 -s EXPORT_NAME=MyMod should declare their own types, e.g.
// declare var MyMod: EmscriptenModule;
declare var Module: EmscriptenModule;

interface EmscriptenFileSysten {
  readFile(
    path: string,
    opts?: { encoding?: "binary" | "utf8"; flags?: string }
  ): string | Uint8Array;
  writeFile(
    path: string,
    data: string | ArrayBufferView,
    opts?: { flags?: string }
  ): void;
}

declare namespace FS {
  interface Lookup {
    path: string;
    node: FSNode;
  }

  interface FSStream {}
  interface FSNode {}
  interface ErrnoError {}

  let ignorePermissions: boolean;
  let trackingDelegate: any;
  let tracking: any;
  let genericErrors: any;

  //
  // paths
  //
  function lookupPath(path: string, opts: any): Lookup;
  function getPath(node: FSNode): string;

  //
  // nodes
  //
  function isFile(mode: number): boolean;
  function isDir(mode: number): boolean;
  function isLink(mode: number): boolean;
  function isChrdev(mode: number): boolean;
  function isBlkdev(mode: number): boolean;
  function isFIFO(mode: number): boolean;
  function isSocket(mode: number): boolean;

  //
  // devices
  //
  function major(dev: number): number;
  function minor(dev: number): number;
  function makedev(ma: number, mi: number): number;
  function registerDevice(dev: number, ops: any): void;

  //
  // core
  //
  function syncfs(populate: boolean, callback: (e: any) => any): void;
  function syncfs(callback: (e: any) => any, populate?: boolean): void;
  function mount(
    type: Emscripten.FileSystemType,
    opts: any,
    mountpoint: string
  ): any;
  function unmount(mountpoint: string): void;

  function mkdir(path: string, mode?: number): any;
  function mkdev(path: string, mode?: number, dev?: number): any;
  function symlink(oldpath: string, newpath: string): any;
  function rename(old_path: string, new_path: string): void;
  function rmdir(path: string): void;
  function readdir(path: string): any;
  function unlink(path: string): void;
  function readlink(path: string): string;
  function stat(path: string, dontFollow?: boolean): any;
  function lstat(path: string): any;
  function chmod(path: string, mode: number, dontFollow?: boolean): void;
  function lchmod(path: string, mode: number): void;
  function fchmod(fd: number, mode: number): void;
  function chown(
    path: string,
    uid: number,
    gid: number,
    dontFollow?: boolean
  ): void;
  function lchown(path: string, uid: number, gid: number): void;
  function fchown(fd: number, uid: number, gid: number): void;
  function truncate(path: string, len: number): void;
  function ftruncate(fd: number, len: number): void;
  function utime(path: string, atime: number, mtime: number): void;
  function open(
    path: string,
    flags: string,
    mode?: number,
    fd_start?: number,
    fd_end?: number
  ): FSStream;
  function close(stream: FSStream): void;
  function llseek(stream: FSStream, offset: number, whence: number): any;
  function read(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position?: number
  ): number;
  function write(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position?: number,
    canOwn?: boolean
  ): number;
  function allocate(stream: FSStream, offset: number, length: number): void;
  function mmap(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position: number,
    prot: number,
    flags: number
  ): any;
  function ioctl(stream: FSStream, cmd: any, arg: any): any;
  function readFile(
    path: string,
    opts?: { encoding?: "binary" | "utf8"; flags?: string }
  ): string | Uint8Array;
  function writeFile(
    path: string,
    data: string | ArrayBufferView,
    opts?: { flags?: string }
  ): void;

  //
  // module-level FS code
  //
  function cwd(): string;
  function chdir(path: string): void;
  function init(
    input: null | (() => number | null),
    output: null | ((c: number) => any),
    error: null | ((c: number) => any)
  ): void;

  function createLazyFile(
    parent: string | FSNode,
    name: string,
    url: string,
    canRead: boolean,
    canWrite: boolean
  ): FSNode;
  function createPreloadedFile(
    parent: string | FSNode,
    name: string,
    url: string,
    canRead: boolean,
    canWrite: boolean,
    onload?: () => void,
    onerror?: () => void,
    dontCreateFile?: boolean,
    canOwn?: boolean
  ): void;
}

declare var MEMFS: Emscripten.FileSystemType;
declare var NODEFS: Emscripten.FileSystemType;
declare var IDBFS: Emscripten.FileSystemType;

declare function UTF8ToString(ptr: number, maxBytesToRead?: number): string;
declare function stringToUTF8(
  str: string,
  outPtr: number,
  maxBytesToRead?: number
): void;
declare function lengthBytesUTF8(str: string): number;
declare function allocateUTF8(str: string): number;
declare function UTF16ToString(ptr: number): string;
declare function stringToUTF16(
  str: string,
  outPtr: number,
  maxBytesToRead?: number
): void;
declare function lengthBytesUTF16(str: string): number;
declare function UTF32ToString(ptr: number): string;
declare function stringToUTF32(
  str: string,
  outPtr: number,
  maxBytesToRead?: number
): void;
declare function lengthBytesUTF32(str: string): number;

interface Math {
  imul(a: number, b: number): number;
}

declare module "@model-create/epanet-engine" {
  export var epanetEngine: EmscriptenModule;
}
