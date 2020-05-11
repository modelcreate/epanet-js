## Project Class - Time Pattern Functions

These functions are used for working with time patterns.

| Function                                                                                        | Description                                                     |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| <a href="Time-Pattern-Functions#addPattern"><code>addPattern</code></a>                         | Adds a new time pattern to a project.                           |
| <a href="Time-Pattern-Functions#deletePattern"><code>deletePattern</code></a>                   | Deletes a time pattern from a project.                          |
| <a href="Time-Pattern-Functions#getPatternIndex"><code>getPatternIndex</code></a>               | Retrieves the index of a time pattern given its ID name.        |
| <a href="Time-Pattern-Functions#getPatternId"><code>getPatternId</code></a>                     | Retrieves the ID name of a time pattern given its index.        |
| <a href="Time-Pattern-Functions#setPatternId"><code>setPatternId</code></a>                     | Changes the ID name of a time pattern given its index.          |
| <a href="Time-Pattern-Functions#getPatternLenth"><code>getPatternLenth</code></a>               | Retrieves the number of time periods in a time pattern.         |
| <a href="Time-Pattern-Functions#getPatternValue"><code>getPatternValue</code></a>               | Retrieves a time pattern's factor for a given time period.      |
| <a href="Time-Pattern-Functions#setPatternValue"><code>setPatternValue</code></a>               | Sets a time pattern's factor for a given time period.           |
| <a href="Time-Pattern-Functions#getAveragePatternValue"><code>getAveragePatternValue</code></a> | Retrieves the average of all pattern factors in a time pattern. |
| <a href="Time-Pattern-Functions#setPattern"><code>setPattern</code></a>                         | Sets the pattern factors for a given time pattern.              |

#### addPattern

Adds a new time pattern to a project.

```typescript
addPattern(id: string): void;
```

**Parameters**

| Parameter | Type                 | Description                        |
| --------- | -------------------- | ---------------------------------- |
| id        | <code> string</code> | the ID name of the pattern to add. |

The new pattern contains a single time period whose factor is 1.0.

##

#### deletePattern

Deletes a time pattern from a project.

```typescript
deletePattern(index: number): void;
```

**Parameters**

| Parameter | Type                | Description                                 |
| --------- | ------------------- | ------------------------------------------- |
| index     | <code>number</code> | the time pattern's index (starting from 1). |

##

#### getPatternIndex

Retrieves the index of a time pattern given its ID name.

```typescript
getPatternIndex(id: string): number;
```

**Parameters**

| Parameter | Type                | Description                    |
| --------- | ------------------- | ------------------------------ |
| id        | <code>string</code> | the ID name of a time pattern. |

**Returns**

<code>Number</code>
the time pattern's index (starting from 1).

##

#### getPatternId

Retrieves the ID name of a time pattern given its index.

```typescript
getPatternId(index: number): string;
```

**Parameters**

| Parameter | Type                | Description                             |
| --------- | ------------------- | --------------------------------------- |
| index     | <code>number</code> | a time pattern index (starting from 1). |

**Returns**

<code>string</code>
the time pattern's ID name.

##

#### setPatternId

Changes the ID name of a time pattern given its index.

```typescript
setPatternId(index: number, id: string): void;
```

**Parameters**

| Parameter | Type                | Description                             |
| --------- | ------------------- | --------------------------------------- |
| index     | <code>number</code> | a time pattern index (starting from 1). |
| id        | <code>string</code> | the time pattern's new ID name.         |

##

#### getPatternLenth

Retrieves the number of time periods in a time pattern.

```typescript
getPatternLenth(index: number): number;
```

**Parameters**

| Parameter | Type                | Description                             |
| --------- | ------------------- | --------------------------------------- |
| index     | <code>number</code> | a time pattern index (starting from 1). |

**Returns**

<code>Number</code>
the number of time periods in the pattern.

##

#### getPatternValue

Retrieves a time pattern's factor for a given time period.

```typescript
getPatternValue(index: number, period: number): number;
```

**Parameters**

| Parameter | Type                | Description                                     |
| --------- | ------------------- | ----------------------------------------------- |
| index     | <code>number</code> | a time pattern index (starting from 1).         |
| period    | <code>number</code> | a time period in the pattern (starting from 1). |

**Returns**

<code>Number</code>
the pattern factor for the given time period.

##

#### setPatternValue

Sets a time pattern's factor for a given time period.

```typescript
setPatternValue(index: number, period: number, value: number): void;
```

**Parameters**

| Parameter | Type                | Description                                                    |
| --------- | ------------------- | -------------------------------------------------------------- |
| index     | <code>number</code> | a time pattern index (starting from 1).                        |
| period    | <code>number</code> | a time period in the pattern (starting from 1).                |
| value     | <code>number</code> | the new value of the pattern factor for the given time period. |

##

#### getAveragePatternValue

Retrieves the average of all pattern factors in a time pattern.

```typescript
getAveragePatternValue(index: number): number;
```

**Parameters**

| Parameter | Type                | Description                             |
| --------- | ------------------- | --------------------------------------- |
| index     | <code>number</code> | a time pattern index (starting from 1). |

**Returns**

<code>Number</code>
The average of all of the time pattern's factors.

##

#### setPattern

Sets the pattern factors for a given time pattern.

```typescript
setPattern(index: number, values: number[]): void;
```

**Parameters**

| Parameter | Type                  | Description                             |
| --------- | --------------------- | --------------------------------------- |
| index     | <code>number</code>   | a time pattern index (starting from 1). |
| values    | <code>number[]</code> | an array of new pattern factor values.  |

Use this function to redefine (and resize) a time pattern all at once; use <a href="#setPatternValue"><code>setPatternValue</code></a> to revise pattern factors one at a time.
