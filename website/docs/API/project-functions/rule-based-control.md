## Project Class - Rule-Based Control Functions

These functions are used for working with rule-based controls.

| Function                                                                                  | Description                                                             |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <a href="Rule-Based-Control-Functions#addRule"><code>addRule</code></a>                   | Adds a new rule-based control to a project.                             |
| <a href="Rule-Based-Control-Functions#deleteRule"><code>deleteRule</code></a>             | Deletes an existing rule-based control.                                 |
| <a href="Rule-Based-Control-Functions#getRule"><code>getRule</code></a>                   | Retrieves summary information about a rule-based control.               |
| <a href="Rule-Based-Control-Functions#getRuleId"><code>getRuleId</code></a>               | Gets the ID name of a rule-based control given its index.               |
| <a href="Rule-Based-Control-Functions#getPremise"><code>getPremise</code></a>             | Gets the properties of a premise in a rule-based control.               |
| <a href="Rule-Based-Control-Functions#setPremise"><code>setPremise</code></a>             | Sets the properties of a premise in a rule-based control.               |
| <a href="Rule-Based-Control-Functions#setPremiseIndex"><code>setPremiseIndex</code></a>   | Sets the index of an object in a premise of a rule-based control.       |
| <a href="Rule-Based-Control-Functions#setPremiseStatus"><code>setPremiseStatus</code></a> | Sets the status being compared to in a premise of a rule-based control. |
| <a href="Rule-Based-Control-Functions#setPremiseValue"><code>setPremiseValue</code></a>   | Sets the value in a premise of a rule-based control.                    |
| <a href="Rule-Based-Control-Functions#getThenAction"><code>getThenAction</code></a>       | Gets the properties of a THEN action in a rule-based control.           |
| <a href="Rule-Based-Control-Functions#setThenAction"><code>setThenAction</code></a>       | Sets the properties of a THEN action in a rule-based control.           |
| <a href="Rule-Based-Control-Functions#getElseAction"><code>getElseAction</code></a>       | Gets the properties of an ELSE action in a rule-based control.          |
| <a href="Rule-Based-Control-Functions#setElseAction"><code>setElseAction</code></a>       | Sets the properties of an ELSE action in a rule-based control.          |
| <a href="Rule-Based-Control-Functions#setRulePriority"><code>setRulePriority</code></a>   | Sets the priority of a rule-based control.                              |

#### addRule

Adds a new rule-based control to a project.

```typescript
addRule(rule: string): void;
```

**Parameters**

| Parameter | Type              | Description                                                         |
| --------- | ----------------- | ------------------------------------------------------------------- |
| rule      | <code>rule</code> | text of the rule following the format used in an EPANET input file. |

Consult the [RULES] section of the Input File topic to learn about a rule's format. Each clause of the rule must end with a newline character \n.

##

#### deleteRule

Deletes an existing rule-based control.

```typescript
deleteRule(index: number): void;
```

**Parameters**

| Parameter | Type                | Description                                            |
| --------- | ------------------- | ------------------------------------------------------ |
| index     | <code>number</code> | the index of the rule to be deleted (starting from 1). |

##

#### getRule

Retrieves summary information about a rule-based control.

```typescript
getRule(index: number): {
premiseCount: number;
thenActionCount: number;
elseActionCount: number;
priority: number;
};
```

**Parameters**

| Parameter | Type                | Description                         |
| --------- | ------------------- | ----------------------------------- |
| index     | <code>number</code> | the rule's index (starting from 1). |

**Returns**

<code>Object</code>

```typescript
{
  premiseCount: number;
  thenActionCount: number;
  elseActionCount: number;
  priority: number;
}
```

| Property        | Type                | Description                                   |
| --------------- | ------------------- | --------------------------------------------- |
| premiseCount    | <code>number</code> | number of premises in the rule's IF section.  |
| thenActionCount | <code>number</code> | number of actions in the rule's THEN section. |
| elseActionCount | <code>number</code> | number of actions in the rule's ELSE section. |
| priority        | <code>number</code> | the rule's priority value.                    |

##

#### getRuleId

Gets the ID name of a rule-based control given its index.

```typescript
getRuleId(index: number): string;
```

**Parameters**

| Parameter | Type                | Description                         |
| --------- | ------------------- | ----------------------------------- |
| index     | <code>number</code> | the rule's index (starting from 1). |

**Returns**

<code>string</code>
the rule's ID name.

##

#### getPremise

Gets the properties of a premise in a rule-based control.

```typescript
getPremise(ruleIndex: number, premiseIndex: number): {
logop: number;
object: RuleObject;
objIndex: number;
variable: RuleVariable;
relop: RuleOperator;
status: RuleStatus;
value: number;
};
```

**Parameters**

| Parameter    | Type                 | Description                                                                   |
| ------------ | -------------------- | ----------------------------------------------------------------------------- |
| ruleIndex    | <code>number </code> | the rule's index (starting from 1).                                           |
| premiseIndex | <code>number </code> | the position of the premise in the rule's list of premises (starting from 1). |

**Returns**

<code>Object</code>

```typescript
{
  logop: number;
  object: RuleObject;
  objIndex: number;
  variable: RuleVariable;
  relop: RuleOperator;
  status: RuleStatus;
  value: number;
}
```

| Property | Type                      | Description                                                                                                                 |
| -------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| logop    | <code>number</code>       | the premise's logical operator ( IF = 1, AND = 2, OR = 3 ).                                                                 |
| object   | <code>RuleObject</code>   | the type of object the premise refers to (see <a href="Enumerated-Types#RuleObject"><code>RuleObject</code></a>).           |
| objIndex | <code>number</code>       | the index of the object (e.g. the index of a tank).                                                                         |
| variable | <code>RuleVariable</code> | the object's variable being compared (see <a href="Enumerated-Types#RuleVariable"><code>RuleVariable</code></a>).           |
| relop    | <code>RuleOperator</code> | the premise's comparison operator (see <a href="Enumerated-Types#RuleOperator"><code>RuleOperator</code></a>).              |
| status   | <code>RuleStatus</code>   | the status that the object's status is compared to (see <a href="Enumerated-Types#RuleStatus"><code>RuleStatus</code></a>). |
| value    | <code>number</code>       | the value that the object's variable is compared to.                                                                        |

##

#### setPremise

Sets the properties of a premise in a rule-based control.

```typescript
setPremise(ruleIndex: number, premiseIndex: number, logop: number, object: RuleObject, objIndex: number, variable: RuleVariable, relop: RuleOperator, status: RuleStatus, value: number): void;
```

**Parameters**

| Parameter    | Type                      | Description                                                                                                                 |
| ------------ | ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ruleIndex    | <code>number </code>      | the rule's index (starting from 1).                                                                                         |
| premiseIndex | <code>number </code>      | the position of the premise in the rule's list of premises (starting from 1).                                               |
| logop        | <code>number</code>       | the premise's logical operator ( IF = 1, AND = 2, OR = 3 ).                                                                 |
| object       | <code>RuleObject</code>   | the type of object the premise refers to (see <a href="Enumerated-Types#RuleObject"><code>RuleObject</code></a>).           |
| objIndex     | <code>number</code>       | the index of the object (e.g. the index of a tank).                                                                         |
| variable     | <code>RuleVariable</code> | the object's variable being compared (see <a href="Enumerated-Types#RuleVariable"><code>RuleVariable</code></a>).           |
| relop        | <code>RuleOperator</code> | the premise's comparison operator (see <a href="Enumerated-Types#RuleOperator"><code>RuleOperator</code></a>).              |
| status       | <code>RuleStatus</code>   | the status that the object's status is compared to (see <a href="Enumerated-Types#RuleStatus"><code>RuleStatus</code></a>). |
| value        | <code>number</code>       | the value that the object's variable is compared to.                                                                        |

##

#### setPremiseIndex

Sets the index of an object in a premise of a rule-based control.

```typescript
setPremiseIndex(ruleIndex: number, premiseIndex: number, objIndex: number): void;
```

**Parameters**

| Parameter    | Type                | Description                                                   |
| ------------ | ------------------- | ------------------------------------------------------------- |
| ruleIndex    | <code>number</code> | the rule's index (starting from 1).                           |
| premiseIndex | <code>number</code> | the premise's index (starting from 1).                        |
| objIndex     | <code>number</code> | the index of the premise's object (e.g. the index of a tank). |

##

#### setPremiseStatus

Sets the status being compared to in a premise of a rule-based control.

```typescript
setPremiseStatus(ruleIndex: number, premiseIndex: number, status: RuleStatus): void;
```

**Parameters**

| Parameter    | Type                    | Description                                                                                                                         |
| ------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| ruleIndex    | <code>number</code>     | the rule's index (starting from 1).                                                                                                 |
| premiseIndex | <code>number</code>     | the premise's index (starting from 1).                                                                                              |
| status       | <code>RuleStatus</code> | the status that the premise's object status is compared to (see <a href="Enumerated-Types#RuleStatus"><code>RuleStatus</code></a>). |

##

#### setPremiseValue

Sets the value in a premise of a rule-based control.

```typescript
setPremiseValue(ruleIndex: number, premiseIndex: number, value: number): void;
```

**Parameters**

| Parameter    | Type                | Description                                           |
| ------------ | ------------------- | ----------------------------------------------------- |
| ruleIndex    | <code>number</code> | the rule's index (starting from 1).                   |
| premiseIndex | <code>number</code> | the premise's index (starting from 1).                |
| value        | <code>number</code> | The value that the premise's variable is compared to. |

##

#### getThenAction

Gets the properties of a THEN action in a rule-based control.

```typescript
getThenAction(ruleIndex: number, actionIndex: number): {
linkIndex: number;
status: RuleStatus;
setting: number;
};
```

**Parameters**

| Parameter   | Type                | Description                                                 |
| ----------- | ------------------- | ----------------------------------------------------------- |
| ruleIndex   | <code>number</code> | the rule's index (starting from 1).                         |
| actionIndex | <code>number</code> | the index of the THEN action to retrieve (starting from 1). |

**Returns**

<code>Object</code>

```typescript
{
  linkIndex: number;
  status: RuleStatus;
  setting: number;
}
```

| Property  | Type                    | Description                                                                                             |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| linkIndex | <code>number</code>     | the index of the link in the action (starting from 1).                                                  |
| status    | <code>RuleStatus</code> | the status assigned to the link (see <a href="Enumerated-Types#RuleStatus"><code>RuleStatus</code></a>) |
| setting   | <code>number</code>     | the value assigned to the link's setting.                                                               |

##

#### setThenAction

Sets the properties of a THEN action in a rule-based control.

```typescript
setThenAction(ruleIndex: number, actionIndex: number, linkIndex: number, status: RuleStatus, setting: number): void;
```

**Parameters**

| Parameter   | Type                     | Description                                                                                                  |
| ----------- | ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| ruleIndex   | <code> number</code>     | the rule's index (starting from 1).                                                                          |
| actionIndex | <code>number </code>     | the index of the THEN action to modify (starting from 1).                                                    |
| linkIndex   | <code> number</code>     | the index of the link in the action.                                                                         |
| status      | <code>RuleStatus </code> | the new status assigned to the link (see <a href="Enumerated-Types#RuleStatus"><code>RuleStatus</code></a>). |
| setting     | <code>number </code>     | the new value assigned to the link's setting.                                                                |

##

#### getElseAction

Sets the properties of an ELSE action in a rule-based control.

```typescript
getElseAction(ruleIndex: number, actionIndex: number): {
linkIndex: number;
status: RuleStatus;
setting: number;
};
```

**Parameters**

| Parameter   | Type                | Description                                                 |
| ----------- | ------------------- | ----------------------------------------------------------- |
| ruleIndex   | <code>number</code> | the rule's index (starting from 1).                         |
| actionIndex | <code>number</code> | the index of the ELSE action to retrieve (starting from 1). |

**Returns**

<code>Object</code>

```typescript
{
  linkIndex: number;
  status: RuleStatus;
  setting: number;
}
```

| Property  | Type                    | Description                                                                                             |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| linkIndex | <code>number</code>     | the index of the link in the action (starting from 1).                                                  |
| status    | <code>RuleStatus</code> | the status assigned to the link (see <a href="Enumerated-Types#RuleStatus"><code>RuleStatus</code></a>) |
| setting   | <code>number</code>     | the value assigned to the link's setting.                                                               |

##

#### setElseAction

Sets the properties of an ELSE action in a rule-based control.

```typescript
setElseAction(ruleIndex: number, actionIndex: number, linkIndex: number, status: RuleStatus, setting: number): void;
```

**Parameters**

| Parameter   | Type                    | Description                                                                                             |
| ----------- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| ruleIndex   | <code>number</code>     | the rule's index (starting from 1).                                                                     |
| actionIndex | <code>number</code>     | the index of the ELSE action being modified (starting from 1).                                          |
| linkIndex   | <code>number</code>     | the index of the link in the action (starting from 1).                                                  |
| status      | <code>RuleStatus</code> | the status assigned to the link (see <a href="Enumerated-Types#RuleStatus"><code>RuleStatus</code></a>) |
| setting     | <code>number</code>     | the value assigned to the link's setting.                                                               |

##

#### setRulePriority

Sets the priority of a rule-based control.

```typescript
setRulePriority(index: number, priority: number): void;
```

**Parameters**

| Parameter | Type                | Description                              |
| --------- | ------------------- | ---------------------------------------- |
| index     | <code>number</code> | the rule's index (starting from 1).      |
| priority  | <code>number</code> | the priority value assigned to the rule. |
