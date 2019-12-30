import Module from "../../dist/my-module";

class Workspace {
  constructor() {
    this._instance = Module();
    this._FS = this._instance.FS;
    this._FS.writeFile("/net1.inp", net1);
  }

  get version() {
    const intPointer = this._instance._malloc(4);
    var result = this._instance.getversion(intPointer);
    const returnValue = this._instance.getValue(intPointer, "i32");

    this._instance._free(intPointer);

    return returnValue;
  }

  getError(code) {
    const title1Ptr = this._instance._malloc(1);
    const result = this._instance.geterror(code, title1Ptr);
    const errMessage = this._instance.UTF8ToString(title1Ptr);
    this._instance._free(title1Ptr);
    return errMessage;
  }

  readFile(file) {
    return this._instance.intArrayToString(this._FS.readFile(file));
  }
}
