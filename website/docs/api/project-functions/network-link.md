# Network Link Functions

These functions are used for working with network links.

| Function                                                        | Description                                                        |
| --------------------------------------------------------------- | ------------------------------------------------------------------ |
| <a href="#addlink"><code>addLink</code></a>                     | Adds a new link to a project.                                      |
| <a href="#deletelink"><code>deleteLink</code></a>               | Deletes a link from the project.                                   |
| <a href="#getlinkindex"><code>getLinkIndex</code></a>           | Gets the index of a link given its ID name.                        |
| <a href="#getlinkid"><code>getLinkId</code></a>                 | Gets the ID name of a link given its index.                        |
| <a href="#setlinkid"><code>setLinkId</code></a>                 | Changes the ID name of a link.                                     |
| <a href="#getlinktype"><code>getLinkType</code></a>             | Retrieves a link's type.                                           |
| <a href="#setlinktype"><code>setLinkType</code></a>             | Changes a link's type.                                             |
| <a href="#getlinknodes"><code>getLinkNodes</code></a>           | Gets the indexes of a link's start- and end-nodes.                 |
| <a href="#setlinknodes"><code>setLinkNodes</code></a>           | Sets the indexes of a link's start- and end-nodes.                 |
| <a href="#getlinkvalue"><code>getLinkValue</code></a>           | Retrieves a property value for a link.                             |
| <a href="#setlinkvalue"><code>setLinkValue</code></a>           | Sets a property value for a link.                                  |
| <a href="#setpipedata"><code>setPipeData</code></a>             | Sets a group of properties for a pipe link.                        |
| <a href="#getpumptype"><code>getPumpType</code></a>             | Retrieves the type of head curve used by a pump.                   |
| <a href="#getheadcurveindex"><code>getHeadCurveIndex</code></a> | Retrieves the curve assigned to a pump's head curve.               |
| <a href="#setheadcurveindex"><code>setHeadCurveIndex</code></a> | Assigns a curve to a pump's head curve.                            |
| <a href="#getvertexcount"><code>getVertexCount</code></a>       | Retrieves the number of internal vertex points assigned to a link. |
| <a href="#getvertex"><code>getVertex</code></a>                 | Retrieves the coordinate's of a vertex point assigned to a link.   |
| <a href="#setvertices"><code>setVertices</code></a>             | Assigns a set of internal vertex points to a link.                 |

---

#### addLink

Adds a new link to a project.

```typescript
addLink(id: string, linkType: LinkType, fromNode: string, toNode: string): number;
```

**Parameters**

| Parameter | Type                  | Description                                                                                         |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| id        | <code>string</code>   | the ID name of the link to be added.                                                                |
| linkType  | <code>LinkType</code> | The type of link being added (see <a href="../enumerated-types#linktype"><code>LinkType</code></a>) |
| fromNode  | <code>string</code>   | The ID name of the link's starting node.                                                            |
| toNode    | <code>string</code>   | The ID name of the link's ending node.                                                              |

**Returns**

<code>Number</code>
the index of the newly added link.

A new pipe is assigned a diameter of 10 inches (254 mm) and a length of 330 feet (~ 100 meters). Its roughness coefficient depends on the head loss formula in effect (see <a href="../enumerated-types#headlosstype"><code>HeadLossType</code></a>) as follows:

- Hazen-Williams formula: 130
- Darcy-Weisbach formula: 0.5 millifeet (0.15 mm)
  \*Chezy-Manning formula: 0.01

All other pipe properties are set to 0.

A new pump has a status of <code>LinkStatusType.Open</code>, a speed setting of 1, and has no pump curve or power rating assigned to it.

A new valve has a diameter of 10 inches (254 mm) and all other properties set to 0.

See <a href="../enumerated-types#linkproperty"><code>LinkProperty</code></a>.

---

#### deleteLink

Deletes a link from the project.

```typescript
deleteLink(index: number, actionCode: ActionCodeType): void;
```

**Parameters**

| Parameter  | Type                        | Description                                        |
| ---------- | --------------------------- | -------------------------------------------------- |
| index      | <code>number</code>         | the index of the link to be deleted.               |
| actionCode | <code>ActionCodeType</code> | The action taken if any control contains the link. |

If actionCode is <code>ActionCodeType.Unconditional</code> then the link and all simple and rule-based controls that contain it are deleted. If set to <code>ActionCodeType.Conditional</code> then the link is not deleted if it appears in any control and error 261 is returned.

---

#### getLinkIndex

Gets the index of a link given its ID name.

```typescript
getLinkIndex(id: string): number;
```

**Parameters**

| Parameter | Type                | Description       |
| --------- | ------------------- | ----------------- |
| id        | <code>string</code> | a link's ID name. |

**Returns**

<code>Number</code>
the link's index (starting from 1).

---

#### getLinkId

Gets the ID name of a link given its index.

```typescript
getLinkId(index: number): string;
```

**Parameters**

| Parameter | Type                | Description                       |
| --------- | ------------------- | --------------------------------- |
| index     | <code>number</code> | a link's index (starting from 1). |

**Returns**

<code>string</code>
The link's ID name.

---

#### setLinkId

Changes the ID name of a link.

```typescript
setLinkId(index: number, newid: string): void;
```

**Parameters**

| Parameter | Type                | Description                       |
| --------- | ------------------- | --------------------------------- |
| index     | <code>number</code> | a link's index (starting from 1). |
| newid     | <code>string</code> | the new ID name for the link.     |

---

#### getLinkType

Retrieves a link's type.

```typescript
getLinkType(index: number): LinkType;
```

**Parameters**

| Parameter | Type                | Description                       |
| --------- | ------------------- | --------------------------------- |
| index     | <code>number</code> | a link's index (starting from 1). |

**Returns**

<code>LinkType</code>
the link's type (see <a href="../enumerated-types#linktype"><code>LinkType</code></a>).

---

#### setLinkType

Changes a link's type.

```typescript
setLinkType(index: number, linkType: LinkType, actionCode: ActionCodeType): number;
```

**Parameters**

| Parameter  | Type                        | Description                                                                                                |
| ---------- | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| index      | <code>number</code>         | the link's index                                                                                           |
| linkType   | <code>LinkType</code>       | the new type to change the link to (see <a href="../enumerated-types#linktype"><code>LinkType</code></a>). |
| actionCode | <code>ActionCodeType</code> | the action taken if any controls contain the link.                                                         |

**Returns**

<code>Number</code>
the link's new index after the type change.

If actionCode is <code>ActionCodeType.Unconditional</code> then all simple and rule-based controls that contain the link are deleted when the link's type is changed. If set to <code>ActionCodeType.Conditional</code> then the type change is cancelled if the link appears in any control and error 261 is returned.

---

#### getLinkNodes

Gets the indexes of a link's start- and end-nodes.

```typescript
getLinkNodes(index: number): {
node1: number;
node2: number;
};
```

**Parameters**

| Parameter | Type                | Description                       |
| --------- | ------------------- | --------------------------------- |
| index     | <code>number</code> | a link's index (starting from 1). |

**Returns**

<code>Object</code>

```typescript
{
  node1: number;
  node2: number;
}
```

| Property | Type                | Description                                           |
| -------- | ------------------- | ----------------------------------------------------- |
| node1    | <code>number</code> | the index of the link's start node (starting from 1). |
| node2    | <code>number</code> | the index of the link's end node (starting from 1).   |

---

#### setLinkNodes

Sets the indexes of a link's start- and end-nodes.

```typescript
setLinkNodes(index: number, node1: number, node2: number): void;
```

**Parameters**

| Parameter | Type                | Description                                           |
| --------- | ------------------- | ----------------------------------------------------- |
| index     | <code>number</code> | a link's index (starting from 1).                     |
| node1     | <code>number</code> | The index of the link's start node (starting from 1). |
| node2     | <code>number</code> | The index of the link's end node (starting from 1).   |

---

#### getLinkValue

Retrieves a property value for a link.

```typescript
getLinkValue(index: number, property: LinkProperty): number;
```

**Parameters**

| Parameter | Type                      | Description                                                                                              |
| --------- | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| index     | <code>number</code>       | a link's index (starting from 1).                                                                        |
| property  | <code>LinkProperty</code> | the property to retrieve (see <a href="../enumerated-types#linkproperty"><code>LinkProperty</code></a>). |

**Returns**

<code>Number</code>
the current value of the property.

Values are returned in units that depend on the units used for flow rate (see Measurement Units).

---

#### setLinkValue

Sets a property value for a link.

```typescript
setLinkValue(index: number, property: number, value: number): void;
```

**Parameters**

| Parameter | Type                | Description                                                                                         |
| --------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| index     | <code>number</code> | a link's index.                                                                                     |
| property  | <code>number</code> | the property to set (see <a href="../enumerated-types#linkproperty"><code>LinkProperty</code></a>). |
| value     | <code>number</code> | the new value for the property.                                                                     |

Values are in units that depend on the units used for flow rate (see Measurement Units).

---

#### setPipeData

Sets a group of properties for a pipe link.

```typescript
setPipeData(index: number, length: number, diam: number, rough: number, mloss: number): void;
```

**Parameters**

| Parameter | Type                | Description                                 |
| --------- | ------------------- | ------------------------------------------- |
| index     | <code>number</code> | the index of a pipe link (starting from 1). |
| length    | <code>number</code> | the pipe's length.                          |
| diam      | <code>number</code> | the pipe's diameter.                        |
| rough     | <code>number</code> | the pipe's roughness coefficient.           |
| mloss     | <code>number</code> | the pipe's minor loss coefficient.          |

These properties have units that depend on the units used for flow rate (see Measurement Units).

---

#### getPumpType

Retrieves the type of head curve used by a pump.

```typescript
getPumpType(index: number): PumpType;
```

**Parameters**

| Parameter | Type                | Description                                 |
| --------- | ------------------- | ------------------------------------------- |
| index     | <code>number</code> | the index of a pump link (starting from 1). |

**Returns**

<code>PumpType</code>
the type of head curve used by the pump (see <a href="../enumerated-types#pumptype"><code>PumpType</code></a>).

---

#### getHeadCurveIndex

Retrieves the curve assigned to a pump's head curve.

```typescript
getHeadCurveIndex(linkIndex: number): number;
```

**Parameters**

| Parameter | Type                | Description                                 |
| --------- | ------------------- | ------------------------------------------- |
| linkIndex | <code>number</code> | the index of a pump link (starting from 1). |

**Returns**

<code>Number</code>
the index of the curve assigned to the pump's head curve.

---

#### setHeadCurveIndex

Assigns a curve to a pump's head curve.

```typescript
setHeadCurveIndex(linkIndex: number, curveIndex: number): void;
```

**Parameters**

| Parameter  | Type                | Description                                                   |
| ---------- | ------------------- | ------------------------------------------------------------- |
| linkIndex  | <code>number</code> | the index of a pump link (starting from 1).                   |
| curveIndex | <code>number</code> | the index of a curve to be assigned as the pump's head curve. |

---

#### getVertexCount

Retrieves the number of internal vertex points assigned to a link.

```typescript
getVertexCount(index: number): number;
```

**Parameters**

| Parameter | Type                | Description                       |
| --------- | ------------------- | --------------------------------- |
| index     | <code>number</code> | a link's index (starting from 1). |

**Returns**

<code>Number</code>
the number of vertex points that describe the link's shape.

---

#### getVertex

Retrieves the coordinate's of a vertex point assigned to a link.

```typescript
getVertex(index: number, vertex: number): {
x: number;
y: number;
};
```

**Parameters**

| Parameter | Type                | Description                             |
| --------- | ------------------- | --------------------------------------- |
| index     | <code>number</code> | a link's index (starting from 1).       |
| vertex    | <code>number</code> | a vertex point index (starting from 1). |

**Returns**

<code>Object</code>

```typescript
{
  x: number;
  y: number;
}
```

| Property | Type                | Description                      |
| -------- | ------------------- | -------------------------------- |
| x        | <code>number</code> | the vertex's X-coordinate value. |
| y        | <code>number</code> | the vertex's Y-coordinate value. |

---

#### setVertices

Assigns a set of internal vertex points to a link.

```typescript
setVertices(index: number, x: number[], y: number[]): void;
```

**Parameters**

| Parameter | Type                  | Description                                      |
| --------- | --------------------- | ------------------------------------------------ |
| index     | <code>number</code>   | a link's index (starting from 1).                |
| x         | <code>Number[]</code> | an array of X-coordinates for the vertex points. |
| y         | <code>Number[]</code> | an array of Y-coordinates for the vertex points. |

Replaces any existing vertices previously assigned to the link.
