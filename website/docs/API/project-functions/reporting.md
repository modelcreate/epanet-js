# Reporting Functions

These functions are used to report simulation results.

| Function                                                    | Description                                                               |
| ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| <a href="#writeline"><code>writeLine</code></a>             | Writes a line of text to a project's report file.                         |
| <a href="#report"><code>report</code></a>                   | Writes simulation results in a tabular format to a project's report file. |
| <a href="#copyreport"><code>copyReport</code></a>           | Copies the current contents of a project's report file to another file.   |
| <a href="#clearreport"><code>clearReport</code></a>         | Clears the contents of a project's report file.                           |
| <a href="#resetreport"><code>resetReport</code></a>         | Resets a project's report options to their default values.                |
| <a href="#setreport"><code>setReport</code></a>             | Processes a reporting format command.                                     |
| <a href="#setstatusreport"><code>setStatusReport</code></a> | Sets the level of hydraulic status reporting.                             |
| <a href="#getstatistic"><code>getStatistic</code></a>       | Retrieves a particular simulation statistic.                              |
| <a href="#getresultindex"><code>getResultIndex</code></a>   | Retrieves the order in which a node or link appears in an output file.    |

---

#### writeLine

Writes a line of text to a project's report file.

```typescript
writeLine(line: string): void;
```

**Parameters**

| Parameter | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| line      | <code> String </code> | a text string to write. |

---

#### report

Writes simulation results in a tabular format to a project's report file.

```typescript
report(): void;
```

Either a full hydraulic analysis or full hydraulic and water quality analysis must have been run, with results saved to file, before `report` is called. In the former case, <a href="../hydraulic-analysis#saveh"><code>saveH</code></a> must also be called first to transfer results from the project's intermediate hydraulics file to its output file.

The format of the report is controlled by commands issued with <a href="#setreport"><code>setreport</code></a>.

---

#### copyReport

Copies the current contents of a project's report file to another file.

```typescript
copyReport(filename: string): void;
```

**Parameters**

| Parameter | Type                | Description                                 |
| --------- | ------------------- | ------------------------------------------- |
| filename  | <code>String</code> | the full path name of the destination file. |

This function allows toolkit clients to retrieve the contents of a project's report file while the project is still open.

---

#### clearReport

Clears the contents of a project's report file.

```typescript
clearReport(): void;
```

---

#### resetReport

Resets a project's report options to their default values.

```typescript
resetReport(): void;
```

After calling this function the default reporting options are in effect. These are:

- no status report
- no energy report
- no nodes reported on
- no links reported on
- node variables reported to 2 decimal places
- link variables reported to 2 decimal places (3 for friction factor)
- node variables reported are elevation, head, pressure, and quality
- link variables reported are flow, velocity, and head loss.

---

#### setReport

Processes a reporting format command.

```typescript
setReport(format: string): void;
```

**Parameters**

| Parameter | Type                | Description                  |
| --------- | ------------------- | ---------------------------- |
| format    | <code>String</code> | a report formatting command. |

Acceptable report formatting commands are described in the [REPORT] section of the Input File topic.

Formatted results of a simulation can be written to a project's report file using the <a href="#report"><code>report</code></a> function.

---

#### setStatusReport

Sets the level of hydraulic status reporting.

```typescript
setStatusReport(level: StatusReport): void;
```

**Parameters**

| Parameter | Type                       | Description                                                                                                   |
| --------- | -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| level     | <code>StatusReport </code> | a status reporting level code (see <a href="../enumerated-types#statusreport"><code>StatusReport</code></a>). |

Status reporting writes changes in the hydraulics status of network elements to a project's report file as a hydraulic simulation unfolds. There are three levels of reporting: <code>StatusReport.NoReport</code> (no status reporting), <code>StatusReport.NormalReport</code> (normal reporting) <code>StatusReport.FullReport</code> (full status reporting).

The full status report contains information at each trial of the solution to the system hydraulic equations at each time step of a simulation. It is useful mainly for debugging purposes.

If many hydraulic analyses will be run in the application it is recommended that status reporting be turned off (level = <code>StatusReport.NoReport</code>).

---

#### getStatistic

Retrieves a particular simulation statistic.

```typescript
getStatistic(type: AnalysisStatistic): number;
```

**Parameters**

| Parameter | Type                           | Description                                                                                                                 |
| --------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| type      | <code>AnalysisStatistic</code> | the type of statistic to retrieve (see <a href="../enumerated-types#analysisstatistic"><code>AnalysisStatistic</code></a>). |

**Returns**

<code>Number</code>
the value of the statistic.

---

#### getResultIndex

Retrieves the order in which a node or link appears in an output file.

```typescript
getResultIndex(type: ObjectType.Node | ObjectType.Link, index: number): number;
```

**Parameters**

| Parameter | Type                                                      | Description                                                                              |
| --------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| type      | <code>ObjectType.Node</code> <code>ObjectType.Link</code> | a type of element (either <code>ObjectType.Node</code> or <code>ObjectType.Link</code>). |
| index     | <code>Number</code>                                       | the element's current index (starting from 1).                                           |

**Returns**

<code>Number</code>
the order in which the element's results were written to file.

If the element does not appear in the file then its result index is 0.

This function can be used to correctly retrieve results from an EPANET binary output file after the order of nodes or links in a network's database has been changed due to editing operations.
