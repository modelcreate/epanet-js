import Project from '../Project';

class RuleBasedControlFunctions {
  addRule(this: Project, rule: string) {
    this._checkError(this._EN.addrule(rule));
  }

  deleteRule(this: Project, index: number) {
    this._checkError(this._EN.deleterule(index));
  }

  getRule(this: Project, index: number) {
    const memory = this._allocateMemory('int', 'int', 'int', 'double');
    this._checkError(this._EN.getrule(index, ...memory));
    return {
      premiseCount: this._getValue(memory[0], 'int'),
      thenActionCount: this._getValue(memory[1], 'int'),
      elseActionCount: this._getValue(memory[2], 'int'),
      priority: this._getValue(memory[3], 'double'),
    };
  }

  getRuleId(this: Project, index: number) {
    const memory = this._allocateMemory('char');
    this._checkError(this._EN.getruleID(index, ...memory));
    return this._getValue(memory[0], 'char');
  }

  getPremise(this: Project, ruleIndex: number, premiseIndex: number) {
    const memory = this._allocateMemory(
      'int',
      'int',
      'int',
      'int',
      'int',
      'int',
      'double'
    );
    this._checkError(this._EN.getpremise(ruleIndex, premiseIndex, ...memory));
    return {
      logop: this._getValue(memory[0], 'int'),
      object: this._getValue(memory[1], 'int'),
      objIndex: this._getValue(memory[2], 'int'),
      variable: this._getValue(memory[3], 'int'),
      relop: this._getValue(memory[4], 'int'),
      status: this._getValue(memory[5], 'int'),
      value: this._getValue(memory[6], 'double'),
    };
  }

  setPremise(
    this: Project,
    ruleIndex: number,
    premiseIndex: number,
    logop: number,
    object: number,
    objIndex: number,
    variable: number,
    relop: number,
    status: number,
    value: number
  ) {
    this._checkError(
      this._EN.setpremise(
        ruleIndex,
        premiseIndex,
        logop,
        object,
        objIndex,
        variable,
        relop,
        status,
        value
      )
    );
  }

  setPremiseIndex(
    this: Project,
    ruleIndex: number,
    premiseIndex: number,
    objIndex: number
  ) {
    this._checkError(
      this._EN.setpremiseindex(ruleIndex, premiseIndex, objIndex)
    );
  }

  setPremiseStatus(
    this: Project,
    ruleIndex: number,
    premiseIndex: number,
    status: number
  ) {
    this._checkError(
      this._EN.setpremisestatus(ruleIndex, premiseIndex, status)
    );
  }

  setPremiseValue(
    this: Project,
    ruleIndex: number,
    premiseIndex: number,
    value: number
  ) {
    this._checkError(this._EN.setpremisevalue(ruleIndex, premiseIndex, value));
  }

  getThenAction(this: Project, ruleIndex: number, actionIndex: number) {
    const memory = this._allocateMemory('int', 'int', 'double');
    this._checkError(this._EN.getthenaction(ruleIndex, actionIndex, ...memory));
    return {
      linkIndex: this._getValue(memory[0], 'int'),
      status: this._getValue(memory[1], 'int'),
      setting: this._getValue(memory[2], 'double'),
    };
  }

  setThenAction(
    this: Project,
    ruleIndex: number,
    actionIndex: number,
    linkIndex: number,
    status: number,
    setting: number
  ) {
    this._checkError(
      this._EN.setthenaction(ruleIndex, actionIndex, linkIndex, status, setting)
    );
  }

  getElseAction(this: Project, ruleIndex: number, actionIndex: number) {
    const memory = this._allocateMemory('int', 'int', 'double');
    this._checkError(this._EN.getelseaction(ruleIndex, actionIndex, ...memory));
    return {
      linkIndex: this._getValue(memory[0], 'int'),
      status: this._getValue(memory[1], 'int'),
      setting: this._getValue(memory[2], 'double'),
    };
  }

  setElseAction(
    this: Project,
    ruleIndex: number,
    actionIndex: number,
    linkIndex: number,
    status: number,
    setting: number
  ) {
    this._checkError(
      this._EN.setelseaction(ruleIndex, actionIndex, linkIndex, status, setting)
    );
  }

  setRulePriority(this: Project, index: number, priority: number) {
    this._checkError(this._EN.setrulepriority(index, priority));
  }
}

export default RuleBasedControlFunctions;
