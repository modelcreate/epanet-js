## Project Class - Data Curve Functions

These functions are used for working with data curves.

| Function                                                                    | Description                                             |
| --------------------------------------------------------------------------- | ------------------------------------------------------- |
| <a href="Data-Curve-Functions#addCurve"><code>addCurve</code></a>           | Adds a new data curve to a project.                     |
| <a href="Data-Curve-Functions#deleteCurve"><code>deleteCurve</code></a>     | Deletes a data curve from a project.                    |
| <a href="Data-Curve-Functions#getCurveIndex"><code>getCurveIndex</code></a> | Retrieves the index of a curve given its ID name.       |
| <a href="Data-Curve-Functions#getCurveId"><code>getCurveId</code></a>       | Retrieves the ID name of a curve given its index.       |
| <a href="Data-Curve-Functions#setCurveId"><code>setCurveId</code></a>       | Changes the ID name of a data curve given its index.    |
| <a href="Data-Curve-Functions#getCurveLenth"><code>getCurveLenth</code></a> | Retrieves the number of points in a curve.              |
| <a href="Data-Curve-Functions#getCurveType"><code>getCurveType</code></a>   | Retrieves a curve's type.                               |
| <a href="Data-Curve-Functions#getCurveValue"><code>getCurveValue</code></a> | Retrieves the value of a single data point for a curve. |
| <a href="Data-Curve-Functions#setCurveValue"><code>setCurveValue</code></a> | Sets the value of a single data point for a curve.      |
| <a href="Data-Curve-Functions#setCurve"><code>setCurve</code></a>           | assigns a set of data points to a curve.                |

#### addCurve

Adds a new data curve to a project.

```typescript
addCurve(id: string): void;
```

**Parameters**

| Parameter | Type                | Description                           |
| --------- | ------------------- | ------------------------------------- |
| id        | <code>string</code> | The ID name of the curve to be added. |

The new curve contains a single data point (1.0, 1.0).

##

#### deleteCurve

Deletes a data curve from a project.

```typescript
deleteCurve(index: number): void;
```

**Parameters**

| Parameter | Type                | Description                               |
| --------- | ------------------- | ----------------------------------------- |
| index     | <code>number</code> | the data curve's index (starting from 1). |

##

#### getCurveIndex

Retrieves the index of a curve given its ID name.

```typescript
getCurveIndex(id: string): number;
```

**Parameters**

| Parameter | Type                | Description             |
| --------- | ------------------- | ----------------------- |
| id        | <code>string</code> | the ID name of a curve. |

**Returns**

<code>Number</code>
The curve's index (starting from 1).

##

#### getCurveId

Retrieves the ID name of a curve given its index.

```typescript
getCurveId(index: number): string;
```

**Parameters**

| Parameter | Type                | Description                        |
| --------- | ------------------- | ---------------------------------- |
| index     | <code>number</code> | a curve's index (starting from 1). |

**Returns**

<code>Number</code>
the curve's ID name.

##

#### setCurveId

Changes the ID name of a data curve given its index.

```typescript
setCurveId(index: number, id: string): void;
```

**Parameters**

| Parameter | Type                | Description                           |
| --------- | ------------------- | ------------------------------------- |
| index     | <code>number</code> | a data curve index (starting from 1). |
| id        | <code>string</code> | the data curve's new ID name.         |

##

#### getCurveLenth

Retrieves the number of points in a curve.

```typescript
getCurveLenth(index: number): number;
```

**Parameters**

| Parameter | Type                | Description                        |
| --------- | ------------------- | ---------------------------------- |
| index     | <code>number</code> | a curve's index (starting from 1). |

**Returns**

<code>Number</code>
The number of data points assigned to the curve.

##

#### getCurveType

Retrieves a curve's type.

```typescript
getCurveType(index: number): CurveType;
```

**Parameters**

| Parameter | Type                | Description                        |
| --------- | ------------------- | ---------------------------------- |
| index     | <code>number</code> | a curve's index (starting from 1). |

**Returns**

<code>CurveType</code>
the curve's type (see <a href="Enumerated-Types#CurveType"><code>CurveType</code></a>).

##

#### getCurveValue

Retrieves the value of a single data point for a curve.

```typescript
getCurveValue(curveIndex: number, pointIndex: number): {
x: number;
y: number;
};
```

**Parameters**

| Parameter  | Type                | Description                                          |
| ---------- | ------------------- | ---------------------------------------------------- |
| curveIndex | <code>number</code> | a curve's index (starting from 1).                   |
| pointIndex | <code>number</code> | the index of a point on the curve (starting from 1). |

**Returns**

<code>Object</code>

```typescript
{
  x: number;
  y: number;
}
```

| Property | Type                | Description          |
| -------- | ------------------- | -------------------- |
| x        | <code>number</code> | the point's x-value. |
| y        | <code>number</code> | the point's y-value. |

##

#### setCurveValue

Sets the value of a single data point for a curve.

```typescript
setCurveValue(curveIndex: number, pointIndex: number, x: number, y: number): void;
```

**Parameters**

| Parameter  | Type                | Description                                          |
| ---------- | ------------------- | ---------------------------------------------------- |
| curveIndex | <code>number</code> | a curve's index (starting from 1).                   |
| pointIndex | <code>number</code> | the index of a point on the curve (starting from 1). |
| x          | <code>number</code> | the point's new x-value.                             |
| y          | <code>number</code> | the point's new y-value.                             |

##

#### setCurve

Assigns a set of data points to a curve.

```typescript
setCurve(index: number, xValues: number[], yValues: number[]): void;
```

**Parameters**

| Parameter | Type                  | Description                             |
| --------- | --------------------- | --------------------------------------- |
| index     | <code> </code>        | a curve's index (starting from 1).      |
| xValues   | <code>number[]</code> | an array of new x-values for the curve. |
| yValues   | <code>number[]</code> | an array of new y-values for the curve. |

Use this function to redefine (and resize) a curve all at once; use <a href="#setCurveValue"><code>setCurveValue</code></a> to revise a curve's data points one at a time.
