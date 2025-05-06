import EpanetEngine from '@model-create/epanet-engine';

export class Workspace {
  private _emscriptenModule: typeof EpanetEngine;
  private _instance: Awaited<ReturnType<typeof EpanetEngine>> | undefined;
  private _FS: Awaited<ReturnType<typeof EpanetEngine>>['FS'] | undefined;
  constructor() {
    this._emscriptenModule = EpanetEngine;
  }

  async loadModule(): Promise<void> {
    const engine = await this._emscriptenModule();
    this._instance = engine;
    this._FS = engine.FS;
  }

  private checkEngineLoaded(): void {
    if (!this._instance) {
      throw new Error('EPANET engine not loaded. Call loadModule() first.');
    }
  }

  get instance(): NonNullable<typeof this._instance> {
    this.checkEngineLoaded();
    return this._instance!;
  }

  private get FS(): NonNullable<typeof this._FS> {
    this.checkEngineLoaded();
    return this._FS!;
  }

  get version() {
    const intPointer = this.instance._malloc(4);
    this.instance._EN_getversion(intPointer);
    const returnValue = this.instance.getValue(intPointer, 'i32');

    this.instance._free(intPointer);

    return returnValue;
  }

  getError(code: number) {
    const title1Ptr = this.instance._malloc(256); //EN_MAXMSG
    this.instance._EN_geterror(code, title1Ptr, 256);
    const errMessage = this.instance.UTF8ToString(title1Ptr);
    this.instance._free(title1Ptr);
    return errMessage;
  }

  writeFile(path: string, data: string | Uint8Array) {
    this.FS.writeFile(path, data);
  }

  readFile(file: string): string;
  readFile(file: string, encoding: 'utf8'): string;
  readFile(file: string, encoding: 'binary'): Uint8Array;
  readFile(file: any, encoding?: 'utf8' | 'binary'): any {
    if (!encoding || encoding === 'utf8') {
      encoding = 'utf8';
      return this.FS.readFile(file, {
        encoding,
      }) as string;
    }
    return this.FS.readFile(file, {
      encoding,
    }) as Uint8Array;
  }

} 


export default Workspace;