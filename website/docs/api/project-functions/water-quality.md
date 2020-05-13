# Water Quality Analysis Functions

These functions are used to perform a water quality analysis.

| Function                                  | Description                                                                                                                       |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <a href="#solveq"><code>solveQ</code></a> | Runs a complete water quality simulation with results at uniform reporting intervals written to the project's binary output file. |
| <a href="#openq"><code>openQ</code></a>   | Opens a project's water quality solver.                                                                                           |
| <a href="#initq"><code>initQ</code></a>   | Initializes a network prior to running a water quality analysis.                                                                  |
| <a href="#runq"><code>runQ</code></a>     | Makes hydraulic and water quality results at the start of the current time period available to a project's water quality solver.  |
| <a href="#nextq"><code>nextQ</code></a>   | Advances a water quality simulation over the time until the next hydraulic event.                                                 |
| <a href="#stepq"><code>stepQ</code></a>   | Advances a water quality simulation by a single water quality time step.                                                          |
| <a href="#closeq"><code>closeQ</code></a> | Closes the water quality solver, freeing all of its allocated memory.                                                             |

---

#### solveQ

Runs a complete water quality simulation with results at uniform reporting intervals written to the project's binary output file.

```typescript
solveQ(): void;
```

A hydraulic analysis must have been run and saved to a hydraulics file before calling `solveQ`. This function will not allow one to examine intermediate water quality results as they are generated. It can be followed by a call to <a href="../reporting#report"><code>report</code></a> to write all hydraulic and water quality results to a formatted report file.

One can instead use the <a href="#openq"><code>openQ</code></a> - <a href="#initq"><code>initQ</code></a> - <a href="#runq"><code>runQ</code></a> - <a href="#nextq"><code>nextQ</code></a> - <a href="#closeq"><code>closeQ</code></a> sequence to gain access to water quality results at intermediate time periods.

---

#### openQ

Opens a project's water quality solver.

```typescript
openQ(): void;
```

Call `openQ` prior to running the first water quality analysis using an <a href="#initq"><code>initQ</code></a> - <a href="#runq"><code>runQ</code></a> - <a href="#nextq"><code>nextQ</code></a> (or <a href="#stepq"><code>stepQ</code></a>) sequence. Multiple water quality analyses can be made before calling <a href="#closeq"><code>closeQ</code></a> to close the water quality solver.

Do not call this function if a complete water quality analysis will be made using <a href="#solveq"><code>solveQ</code></a>.

---

#### initQ

Initializes a network prior to running a water quality analysis.

```typescript
initQ(initFlag: InitHydOption.Save | InitHydOption.NoSave): void;
```

**Parameters**

| Parameter | Type                                                                | Description                                                                                                                                                                                                                             |
| --------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initFlag  | <code>InitHydOption.Save </code> <code>InitHydOption.NoSave </code> | set to <code>InitHydOption.Save</code> if results are to be saved to the project's binary output file, or to <code>InitHydOption.NoSave</code> if not. (see <a href="../enumerated-types#inithydoption"><code>InitHydOption</code></a>) |

Call `initQ` prior to running a water quality analysis using <a href="#runq"><code>runQ</code></a> in conjunction with either <a href="#nextq"><code>nextQ</code></a> or <a href="#stepq"><code>stepQ</code></a>.

<a href="#openq"><code>openQ</code></a> must have been called prior to calling `initQ`.

Do not call `initQ` if a complete water quality analysis will be made using <a href="#solveq"><code>solveQ</code></a>.

---

#### runQ

Makes hydraulic and water quality results at the start of the current time period available to a project's water quality solver.

```typescript
runQ(): number;
```

**Returns**

<code>Number</code>
current simulation time in seconds.

Use `runQ` along with <a href="#nextq"><code>nextQ</code></a> in a loop to access water quality results at the start of each hydraulic period in an extended period simulation. Or use it in a loop with <a href="#stepq"><code>stepQ</code></a> to access results at the start of each water quality time step.

<a href="#initq"><code>initQ</code></a> must have been called prior to running an <a href="#runq"><code>runQ</code></a> - <a href="#nextq"><code>nextQ</code></a> (or <a href="#stepq"><code>stepQ</code></a>) loop.

The current time of the simulation is determined from information saved with the hydraulic analysis that preceded the water quality analysis.

---

#### nextQ

Advances a water quality simulation over the time until the next hydraulic event.

```typescript
nextQ(): number;
```

**Returns**

<code>Number</code>
time (in seconds) until the next hydraulic event or 0 if at the end of the full simulation duration.

This function is used in a loop with <a href="#runq"><code>runQ</code></a> to perform an extended period water quality analysis. It reacts and routes a project's water quality constituent over a time step determined by when the next hydraulic event occurs. Use <a href="#stepq"><code>stepQ</code></a> instead if you wish to generate results over each water quality time step.

The return is determined from information produced by the hydraulic analysis that preceded the water quality analysis.

---

#### stepQ

Advances a water quality simulation by a single water quality time step.

```typescript
stepQ(): number;
```

**Returns**

<code>Number</code>
time left (in seconds) to the overall simulation duration.

This function is used in a loop with <a href="#runq"><code>runQ</code></a> to perform an extended period water quality simulation. It allows one to generate water quality results at each water quality time step of the simulation, rather than over each hydraulic event period as with <a href="#nextq"><code>nextQ</code></a>.

Use the returned value to determine when no more calls to <a href="#runq"><code>runQ</code></a> are needed because the end of the simulation period has been reached (i.e., when timeLeft = 0).

---

#### closeQ

Closes the water quality solver, freeing all of its allocated memory.

```typescript
closeQ(): void;
```

Call `closeQ` after all water quality analyses have been made using the <a href="#initq"><code>initQ</code></a> - <a href="#runq"><code>runQ</code></a> - <a href="#nextq"><code>nextQ</code></a> (or <a href="#stepq"><code>stepQ</code></a>) sequence of function calls.

Do not call this function if <a href="#solveq"><code>solveQ</code></a> is being used.
