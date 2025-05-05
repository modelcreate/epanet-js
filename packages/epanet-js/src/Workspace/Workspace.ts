import { epanetEngine } from '@model-create/epanet-engine';

class Workspace {
  _instance: EmscriptenModule;

  _FS: EmscriptenFileSysten;
  constructor() {
    this._instance = epanetEngine;
    this._FS = this._instance.FS;
  }

  get version() {
    const intPointer = this._instance._malloc(4);
    this._instance.getversion(intPointer);
    const returnValue = this._instance.getValue(intPointer, 'i32');

    this._instance._free(intPointer);

    return returnValue;
  }

  loadModule() {}

  getError(code: number) {
    const title1Ptr = this._instance._malloc(256); //EN_MAXMSG
    this._instance.geterror(code, title1Ptr);
    const errMessage = this._instance.UTF8ToString(title1Ptr);
    this._instance._free(title1Ptr);
    return errMessage;
  }

  writeFile(path: string, data: string | ArrayBufferView) {
    this._FS.writeFile(path, data);
  }

  readFile(file: string): string;
  readFile(file: string, encoding: 'utf8'): string;
  readFile(file: string, encoding: 'binary'): Uint8Array;
  readFile(file: any, encoding?: 'utf8' | 'binary'): any {
    if (!encoding || encoding === 'utf8') {
      encoding = 'utf8';
      return this._FS.readFile(file, {
        encoding,
      }) as string;
    }
    return this._FS.readFile(file, {
      encoding,
    }) as Uint8Array;
  }
}

export default Workspace;
