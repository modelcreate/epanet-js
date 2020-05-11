# Hydraulic Analysis

## Project Class - Hydraulic Analysis Functions

These functions are used to perform a hydraulic analysis.

| Function                                            | Description                                                                                                                                                            |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="#solveH"><code>solveH</code></a>           | Runs a complete hydraulic simulation with results for all time periods written to a temporary hydraulics file.                                                         |
| <a href="#useHydFile"><code>useHydFile</code></a>   | Uses a previously saved binary hydraulics file to supply a project's hydraulics.                                                                                       |
| <a href="#openH"><code>openH</code></a>             | Opens a project's hydraulic solver.                                                                                                                                    |
| <a href="#initH"><code>initH</code></a>             | Initializes a network prior to running a hydraulic analysis.                                                                                                           |
| <a href="#runH"><code>runH</code></a>               | Computes a hydraulic solution for the current point in time.                                                                                                           |
| <a href="#nextH"><code>nextH</code></a>             | Determines the length of time until the next hydraulic event occurs in an extended period simulation.                                                                  |
| <a href="#saveH"><code>saveH</code></a>             | Transfers a project's hydraulics results from its temporary hydraulics file to its binary output file, where results are only reported at uniform reporting intervals. |
| <a href="#savehydfile"><code>saveHydFile</code></a> | Saves a project's temporary hydraulics file to disk.                                                                                                                   |
| <a href="#closeh"><code>closeH</code></a>           | Closes the hydraulic solver freeing all of its allocated memory.                                                                                                       |

#### solveH

Runs a complete hydraulic simulation with results for all time periods written to a temporary hydraulics file.

```typescript
solveH(): void
```

Use `solveH` to generate a complete hydraulic solution which can stand alone or be used as input to a water quality analysis. This function will not allow one to examine intermediate hydraulic results as they are generated. It can also be followed by calls to <a href="#saveH"><code>saveH</code></a> and <a href="Reporting-Functions#report"><code>report</code></a> to write hydraulic results to the report file.

The sequence <a href="#openH"><code>openH</code></a> - <a href="#initH"><code>initH</code></a> - <a href="#runH"><code>runH</code></a> - <a href="#nextH"><code>nextH</code></a> - <a href="#closeH"><code>closeH</code></a> can be used instead to gain access to results at intermediate time periods and directly adjust link status and control settings as a simulation proceeds.

---

#### useHydFile

Uses a previously saved binary hydraulics file to supply a project's hydraulics.

```typescript
useHydFile(filename: string): void
```

**Parameters**

| Parameter | Type                 | Description                                               |
| --------- | -------------------- | --------------------------------------------------------- |
| filename  | <code> String</code> | the name of the binary file containing hydraulic results. |

Call this function to re-use a set of hydraulic analysis results saved previously. This can save computational time if water quality analyses are being made under the same set of hydraulic conditions.

Do not call this function while the hydraulics solver is open.

---

#### openH

Opens a project's hydraulic solver.

```typescript
openH(): void
```

Call `openH` prior to running the first hydraulic analysis using the <a href="#initH"><code>initH</code></a> - <a href="#runH"><code>runH</code></a> - <a href="#nextH"><code>nextH</code></a> sequence. Multiple analyses can be made before calling <a href="#closeH"><code>closeH</code></a> to close the hydraulic solver.

Do not call this function if <a href="#solveH"><code>solveH</code></a> is being used to run a complete hydraulic analysis or if hydraulics are being supplied by a previously saved hydraulics file using <a href="#useHydFile"><code>useHydFile</code></a>.

---

#### initH

Initializes a network prior to running a hydraulic analysis.

```typescript
initH(initFlag: InitHydOption): void
```

**Parameters**

| Parameter | Type                        | Description                                                                                                  |
| --------- | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| initFlag  | <code> InitHydOption</code> | a 2-digit initialization flag (see <a href="Enumerated-Types#InitHydOption"><code>InitHydOption</code></a>). |

This function initializes storage tank levels, link status and settings, and the simulation time clock prior to running a hydraulic analysis.

The initialization flag is a two digit number where the 1st (left) digit indicates if link flows should be re-initialized (1) or not (0), and the 2nd digit indicates if hydraulic results should be saved to a temporary binary hydraulics file (1) or not (0).

Be sure to call `initH` prior to running a hydraulic analysis using a <a href="#runH"><code>runH</code></a> - <a href="#nextH"><code>nextH</code></a> loop.

Choose to save hydraulics results if you will be:

- making a subsequent water quality run,
- using <a href="Reporting-Functions#report"><code>report</code></a> to generate a report
- using <a href="#saveHydFile"><code>saveHydFile</code></a> to save the binary hydraulics file.

There is no need to save hydraulics if you will be writing custom code to process hydraulic results as they are generated using the functions <a href="Network-Node-Functions#getNodeValue"><code>getNodeValue</code></a> and <a href="Network-Link-Functions#getLinkValue"><code>getLinkValue</code></a>.

---

#### runH

Computes a hydraulic solution for the current point in time.

```typescript
runH(): Number
```

**Returns**

<code>Number</code>
The current simulation time in seconds.

This function is used in a loop with <a href="#nextH"><code>nextH</code></a> to run an extended period hydraulic simulation.

<a href="#initH"><code>initH</code></a> must have been called prior to running the <a href="#runH"><code>runH</code></a> - <a href="#nextH"><code>nextH</code></a> loop.

---

#### nextH

Determines the length of time until the next hydraulic event occurs in an extended period simulation.

```typescript
nextH(): Number
```

**Returns**

<code>Number</code>
The time (in seconds) until the next hydraulic event or 0 if at the end of the full simulation duration.

This function is used in a loop with <a href="#runH"><code>runH</code></a> to run an extended period hydraulic simulation.

The return value is automatically computed as the smaller of:

- the time interval until the next hydraulic time step begins
- the time interval until the next reporting time step begins
- the time interval until the next change in demands occurs
- the time interval until a tank becomes full or empty
- the time interval until a control or rule fires.

---

#### saveH

Transfers a project's hydraulics results from its temporary hydraulics file to its binary output file, where results are only reported at uniform reporting intervals.

```typescript
saveH(): void
```

`saveH` is used when only a hydraulic analysis is run and results at uniform reporting intervals need to be transferred to a project's binary output file. Such would be the case when results are to be written in formatted fashion to the project's report file using <a href="Reporting-Functions#report"><code>report</code></a>.

---

#### saveHydFile

Saves a project's temporary hydraulics file to disk.

```typescript
saveHydFile( filename: String): void
```

**Parameters**

| Parameter | Type                 | Description                         |
| --------- | -------------------- | ----------------------------------- |
| filename  | <code> String</code> | the name of the file to be created. |

Use this function to save the current set of hydraulics results to a file, either for post-processing or to be used at a later time by calling the <a href="#useHydFile"><code>useHydFile</code></a> function.

The hydraulics file contains nodal demands and heads and link flows, status, and settings for all hydraulic time steps, even intermediate ones.

Before calling this function hydraulic results must have been generated and saved by having called <a href="#solveH"><code>solveH</code></a> or the <a href="#initH"><code>initH</code></a> - <a href="#runH"><code>runH</code></a> - <a href="#nextH"><code>nextH</code></a> sequence with the `initflag` argument of <a href="#initH"><code>initH</code></a> set to <a href="Enumerated-Types#InitHydOption"><code>InitHydOption.Save</code></a> or <a href="Enumerated-Types#InitHydOption"><code>InitHydOption.SaveAndInit</code></a>.

---

#### closeH

Closes the hydraulic solver freeing all of its allocated memory.

```typescript
closeH(): void
```

Call `closeH` after all hydraulics analyses have been made using <a href="#initH"><code>initH</code></a> - <a href="#runH"><code>runH</code></a> - <a href="#nextH"><code>nextH</code></a>. Do not call this function if <a href="#solveH"><code>solveH</code></a> is being used.
