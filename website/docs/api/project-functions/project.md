# Project Functions

These functions are used to manage a project.

| Function                                            | Description                                                   |
| --------------------------------------------------- | ------------------------------------------------------------- |
| <a href="#open"><code>open</code></a>               | Opens an EPANET input file & reads in network data.           |
| <a href="#close"><code>close</code></a>             | Closes a project and frees all of its memory.                 |
| <a href="#runproject"><code>runProject</code></a>   | Runs a complete EPANET simulation.                            |
| <a href="#init"><code>init</code></a>               | Initializes an EPANET project.                                |
| <a href="#getcount"><code>getCount</code></a>       | Retrieves the number of objects of a given type in a project. |
| <a href="#gettitle"><code>getTitle</code></a>       | Retrieves the title lines of the project.                     |
| <a href="#settitle"><code>setTitle</code></a>       | Sets the title lines of the project.                          |
| <a href="#saveinpfile"><code>saveInpFile</code></a> | Saves a project's data to an EPANET-formatted text file.      |

---

#### runProject

Runs a complete EPANET simulation.

```typescript
runProject(
  inputFile: String,
  reportFile: String,
  outputFile: String
  ): void
```

**Parameters**

| Parameter  | Type                 | Description                                                          |
| ---------- | -------------------- | -------------------------------------------------------------------- |
| inputFile  | <code>String </code> | the name of an existing EPANET-formatted input file.                 |
| reportFile | <code>String </code> | the name of a report file to be created (or "" if not needed)        |
| outputFile | <code>String </code> | the name of a binary output file to be created (or "" if not needed) |

Future versions of the epanetJS library will include the ability to attach a callback function similar to the <code>EN_runproject</code> function in `OWA-EPANET`.

---

#### init

Initializes an EPANET project.

```typescript
runProject(rptFile: String, outFile: String, unitType: FlowUnits, headLosstype: HeadLossType): void
```

**Parameters**

| Parameter    | Type                      | Description                                                                                                    |
| ------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| rptFile      | <code>String</code>       | the name of a report file to be created (or "" if not needed)                                                  |
| outFile      | <code>String</code>       | the name of a binary output file to be created (or "" if not needed).                                          |
| unitType     | <code>FlowUnits</code>    | the choice of flow units (see <a href="../enumerated-types#flowunits"><code>FlowUnits</code></a>)              |
| headLosstype | <code>HeadLossType</code> | the choice of head loss formula (see <a href="../enumerated-types#headlosstype"><code>HeadLossType</code></a>) |

This function should be called immediately after a `Project` object is created if an EPANET-formatted input file will not be used to supply network data. If the project receives it's network data from an input file then there is no need to call this function.

---

#### open

Opens an EPANET input file & reads in network data.

```typescript
open(inputFile: String, reportFile: String, outputFile: String): void
```

**Parameters**

| Parameter  | Type                 | Description                                                           |
| ---------- | -------------------- | --------------------------------------------------------------------- |
| inputFile  | <code> String</code> | the name of an existing EPANET-formatted input file.                  |
| reportFile | <code>String </code> | the name of a report file to be created (or "" if not needed).        |
| outputFile | <code> String</code> | the name of a binary output file to be created (or "" if not needed). |

---

#### getCount

Retrieves the number of objects of a given type in a project.

```typescript
getCount(obj: CountType): Number
```

**Parameters**

| Parameter | Type                   | Description                                                                                         |
| --------- | ---------------------- | --------------------------------------------------------------------------------------------------- |
| obj       | <code>CountType</code> | a type of object to count. (see <a href="../enumerated-types#counttype"><code>CountType</code></a>) |

**Returns**

<code>Number</code>
The number of objects of the specified type

---

#### getTitle

Retrieves the title lines of the project.

```typescript
getTitle(): Object
```

**Returns**

<code>Object</code>

```typescript
{
  line1: String;
  line2: String;
  line3: String;
}
```

| Property | Type                | Description        |
| -------- | ------------------- | ------------------ |
| line1    | <code>String</code> | first title line.  |
| line2    | <code>String</code> | second title line. |
| line3    | <code>String</code> | third title line.  |

---

#### setTitle

Sets the title lines of the project.

```typescript
setTitle( line1: String, line2: String, line3: String): void
```

**Parameters**

| Parameter | Type                | Description        |
| --------- | ------------------- | ------------------ |
| line1     | <code>String</code> | first title line.  |
| line2     | <code>String</code> | second title line. |
| line3     | <code>String</code> | third title line.  |

---

#### saveInpFile

Saves a project's data to an EPANET-formatted text file.

```typescript
saveInpFile( filename: String): void
```

**Parameters**

| Parameter | Type                 | Description                     |
| --------- | -------------------- | ------------------------------- |
| filename  | <code>String </code> | the name of the file to create. |

---

#### close

Closes a project and frees all of its memory.

```typescript
close(): void
```

This function clears all existing data from a project but does not delete the project, so it can be re-used with another set of network data.
