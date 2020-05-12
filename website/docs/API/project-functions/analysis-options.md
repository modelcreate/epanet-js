# Analysis Options Functions

These functions are used to get and set analysis options.

| Function                                                      | Description                                                          |
| ------------------------------------------------------------- | -------------------------------------------------------------------- |
| <a href="#getflowunits"><code>getFlowUnits</code></a>         | Retrieves a project's flow units.                                    |
| <a href="#getoption"><code>getOption</code></a>               | Retrieves the value of an analysis option.                           |
| <a href="#getqualityinfo"><code>getQualityInfo</code></a>     | Gets information about the type of water quality analysis requested. |
| <a href="#getqualitytype"><code>getQualityType</code></a>     | Retrieves the type of water quality analysis to be run.              |
| <a href="#gettimeparameter"><code>getTimeParameter</code></a> | Retrieves the value of a time parameter.                             |
| <a href="#setflowunits"><code>setFlowUnits</code></a>         | Sets a project's flow units.                                         |
| <a href="#setoption"><code>setOption</code></a>               | Sets the value for an anlysis option.                                |
| <a href="#setqualitytype"><code>setQualityType</code></a>     | Sets the type of water quality analysis to run.                      |
| <a href="#settimeparameter"><code>setTimeParameter</code></a> | Sets the value of a time parameter.                                  |

---

#### getFlowUnits

Retrieves a project's flow units.

```typescript
getFlowUnits(): FlowUnits;
```

**Returns**

<code>Number</code>
a flow units code (see <a href="../enumerated-types#flowunits"><code>FlowUnits</code></a>)

Flow units in liters or cubic meters implies that SI metric units are used for all other quantities in addition to flow. Otherwise US Customary units are employed.

---

#### getOption

Retrieves the value of an analysis option.

```typescript
getOption(option: Option): number;
```

**Parameters**

| Parameter | Type                | Description                                                                                   |
| --------- | ------------------- | --------------------------------------------------------------------------------------------- |
| option    | <code>Option</code> | a type of analysis option (see <a href="../enumerated-types#option"><code>Option</code></a>). |

**Returns**

<code>Number</code>
the current value of the option.

---

#### getQualityInfo

Gets information about the type of water quality analysis requested.

```typescript
getQualityInfo(): {
qualType: QualityType;
chemName: string;
chemUnits: string;
traceNode: number;
};
```

**Returns**

<code>Object</code>

```typescript
{
  qualType: QualityType;
  chemName: string;
  chemUnits: string;
  traceNode: number;
}
```

| Property  | Type                     | Description                                                                                           |
| --------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| qualType  | <code>QualityType</code> | type of analysis to run (see <a href="../enumerated-types#qualitytype"><code>QualityType</code></a>). |
| chemName  | <code>string</code>      | name of chemical constituent.                                                                         |
| chemUnits | <code>string</code>      | concentration units of the constituent.                                                               |
| traceNode | <code>number</code>      | index of the node being traced (if applicable).                                                       |

|

---

#### getQualityType

Retrieves the type of water quality analysis to be run.

```typescript
getQualityType(): {
qualType: QualityType;
traceNode: number;
};
```

**Returns**

<code>Object</code>

```typescript
{
  qualType: QualityType;
  traceNode: number;
}
```

| Property  | Type                     | Description                                                                                               |
| --------- | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| qualType  | <code>QualityType</code> | the type of analysis to run (see <a href="../enumerated-types#qualitytype"><code>QualityType</code></a>). |
| traceNode | <code>number</code>      | the index of node being traced, if qualType = <code>QualityType.Trace</code>.                             |

---

#### getTimeParameter

Retrieves the value of a time parameter.

```typescript
getTimeParameter(param: TimeParameter): number;
```

**Parameters**

| Parameter | Type                       | Description                                                                                             |
| --------- | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| param     | <code>TimeParameter</code> | a time parameter code (see <a href="../enumerated-types#timeparameter"><code>TimeParameter</code></a>). |

**Returns**

<code>Number</code>
the current value of the time parameter (in seconds).

---

#### setFlowUnits

Sets a project's flow units.

```typescript
setFlowUnits(units: FlowUnits): void;
```

**Parameters**

| Parameter | Type                   | Description                                                                                |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| units     | <code>FlowUnits</code> | a flow units code (see <a href="../enumerated-types#flowunits"><code>FlowUnits</code></a>) |

Flow units in liters or cubic meters implies that SI metric units are used for all other quantities in addition to flow. Otherwise US Customary units are employed.

---

#### setOption

Sets the value for an anlysis option.

```typescript
setOption(option: Option, value: number): void;
```

**Parameters**

| Parameter | Type                | Description                                                                                   |
| --------- | ------------------- | --------------------------------------------------------------------------------------------- |
| option    | <code>Option</code> | a type of analysis option (see <a href="../enumerated-types#option"><code>Option</code></a>). |
| value     | <code>number</code> | the new value assigned to the option.                                                         |

---

#### setQualityType

Sets the type of water quality analysis to run.

```typescript
setQualityType(qualType: QualityType, chemName: string, chemUnits: string, traceNode: string): void;
```

**Parameters**

| Parameter | Type                     | Description                                                                                               |
| --------- | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| qualType  | <code>QualityType</code> | the type of analysis to run (see <a href="../enumerated-types#qualitytype"><code>QualityType</code></a>). |
| chemName  | <code>string</code>      | the name of the quality constituent.                                                                      |
| chemUnits | <code>string</code>      | the concentration units of the constituent.                                                               |
| traceNode | <code>string</code>      | the ID name of the node being traced if qualType = <code>QualityType.Trace</code>.                        |

Chemical name and units can be an empty string if the analysis is not for a chemical. The same holds for the trace node if the analysis is not for source tracing.

Note that the trace node is specified by ID name and not by index.

---

#### setTimeParameter

Sets the value of a time parameter.

```typescript
setTimeParameter(param: TimeParameter, value: number): void;
```

**Parameters**

| Parameter | Type                       | Description                                                                                             |
| --------- | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| param     | <code>TimeParameter</code> | a time parameter code (see <a href="../enumerated-types#timeparameter"><code>TimeParameter</code></a>). |
| value     | <code>number</code>        | the new value of the time parameter (in seconds)                                                        |
