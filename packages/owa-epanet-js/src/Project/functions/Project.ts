import Project from '../Project';

class ProjectFunctions {
  init(
    this: Project,
    rptFile: string,
    outFile: string,
    unitType: number,
    headLosstype: number
  ) {
    const result = this._EN.init(rptFile, outFile, unitType, headLosstype);
    this._checkError(result);
    return result;
  }

  saveinpfile(this: Project, filename: string) {
    const result = this._EN.saveinpfile(filename);
    return result;
  }
}

export default ProjectFunctions;
