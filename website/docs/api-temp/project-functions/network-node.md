# Network Node Functions

These functions are used for working with network nodes. [More...]()

| Function                                                    | Description                                     |
| ----------------------------------------------------------- | ----------------------------------------------- |
| <a href="#addnode"><code>addNode</code></a>                 | Adds a new node to a project.                   |
| <a href="#deletenode"><code>deleteNode</code></a>           | Deletes a node from a project.                  |
| <a href="#getnodeindex"><code>getNodeIndex</code></a>       | Gets the index of a node given its ID name.     |
| <a href="#getnodeid"><code>getNodeId</code></a>             | Gets the ID name of a node given its index.     |
| <a href="#setnodeid"><code>setNodeId</code></a>             | Changes the ID name of a node.                  |
| <a href="#getnodetype"><code>getNodeType</code></a>         | Retrieves a node's type given its index.        |
| <a href="#getnodevalue"><code>getNodeValue</code></a>       | Retrieves a property value for a node.          |
| <a href="#setnodevalue"><code>setNodeValue</code></a>       | Sets a property value for a node.               |
| <a href="#setjunctiondata"><code>setJunctionData</code></a> | Sets a group of properties for a junction node. |
| <a href="#settankdata"><code>setTankData</code></a>         | Sets a group of properties for a tank node.     |
| <a href="#getcoordinates"><code>getCoordinates</code></a>   | Gets the (x,y) coordinates of a node.           |
| <a href="#setcoordinates"><code>setCoordinates</code></a>   | Sets the (x,y) coordinates of a node.           |

---

#### addNode

Adds a new node to a project.

```typescript
addNode(id: string, nodeType: NodeType): number;
```

**Parameters**

| Parameter | Type                  | Description                                                                                         |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| id        | <code>string</code>   | the ID name of the node to be added.                                                                |
| nodeType  | <code>NodeType</code> | the type of node being added (see <a href="../enumerated-types#nodetype"><code>NodeType</code></a>) |

**Returns**

<code>Number</code>
the index of the newly added node

When a new node is created all of its properties (see <a href="../enumerated-types#nodeproperty"><code>NodeProperty</code></a>) are set to 0.

---

#### deleteNode

Deletes a node from a project.

```typescript
deleteNode(index: number, actionCode: ActionCodeType): void;
```

**Parameters**

| Parameter  | Type                        | Description                                                      |
| ---------- | --------------------------- | ---------------------------------------------------------------- |
| index      | <code>number</code>         | the index of the node to be deleted.                             |
| actionCode | <code>ActionCodeType</code> | the action taken if any control contains the node and its links. |

If actionCode is <code>ActionCodeType.Unconditional</code> then the node, its incident links and all simple and rule-based controls that contain them are deleted. If set to <code>ActionCodeType.Conditional</code> then the node is not deleted if it or its incident links appear in any controls and error code 261 is returned.

---

#### getNodeIndex

Gets the index of a node given its ID name.

```typescript
getNodeIndex(id: string): number;
```

**Parameters**

| Parameter | Type                | Description     |
| --------- | ------------------- | --------------- |
| id        | <code>string</code> | a node ID name. |

**Returns**

<code>Number</code>
the node's index (starting from 1).

---

#### getNodeId

Gets the ID name of a node given its index.

```typescript
getNodeId(index: number): string;
```

**Parameters**

| Parameter | Type                | Description                       |
| --------- | ------------------- | --------------------------------- |
| index     | <code>number</code> | a node's index (starting from 1). |

**Returns**

<code>String</code>
the node's ID name.

---

#### setNodeId

Changes the ID name of a node.

```typescript
setNodeId(index: number, newid: string): void;
```

**Parameters**

| Parameter | Type                | Description                       |
| --------- | ------------------- | --------------------------------- |
| index     | <code>number</code> | a node's index (starting from 1). |
| newid     | <code>string</code> | the new ID name for the node.     |

---

#### getNodeType

Retrieves a node's type given its index.

```typescript
getNodeType(index: number): NodeType;
```

**Parameters**

| Parameter | Type                | Description                       |
| --------- | ------------------- | --------------------------------- |
| index     | <code>number</code> | a node's index (starting from 1). |

**Returns**

<code>NodeType</code>
the node's type (see <a href="../enumerated-types#nodetype"><code>NodeType</code></a>).

---

#### getNodeValue

Retrieves a property value for a node.

```typescript
getNodeValue(index: number, property: NodeProperty): number;
```

**Parameters**

| Parameter | Type                      | Description                                                                                              |
| --------- | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| index     | <code>number</code>       | a node's index.                                                                                          |
| property  | <code>NodeProperty</code> | the property to retrieve (see <a href="../enumerated-types#nodeproperty"><code>NodeProperty</code></a>). |

**Returns**

<code>Number</code>
the current value of the property.

Values are returned in units that depend on the units used for flow rate (see Measurement Units).

---

#### setNodeValue

Sets a property value for a node.

```typescript
setNodeValue(index: number, property: NodeProperty, value: number): void;
```

**Parameters**

| Parameter | Type                      | Description                                                                                         |
| --------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| index     | <code>number</code>       | a node's index (starting from 1).                                                                   |
| property  | <code>NodeProperty</code> | the property to set (see <a href="../enumerated-types#nodeproperty"><code>NodeProperty</code></a>). |
| value     | <code>number</code>       | the new value for the property.                                                                     |

Values are in units that depend on the units used for flow rate (see Measurement Units).

---

#### setJunctionData

Sets a group of properties for a junction node.

```typescript
setJunctionData(index: number, elev: number, dmnd: number, dmndpat: string): void;
```

**Parameters**

| Parameter | Type                | Description                                                  |
| --------- | ------------------- | ------------------------------------------------------------ |
| index     | <code>number</code> | a junction node's index (starting from 1).                   |
| elev      | <code>number</code> | the value of the junction's elevation.                       |
| dmnd      | <code>number</code> | the value of the junction's primary base demand.             |
| dmndpat   | <code>string</code> | the ID name of the demand's time pattern ("" for no pattern) |

These properties have units that depend on the units used for flow rate (see Measurement Units).

---

#### setTankData

Sets a group of properties for a tank node.

```typescript
setTankData(index: number, elev: number, initlvl: number, minlvl: number, maxlvl: number, diam: number, minvol: number, volcurve: string): void;
```

**Parameters**

| Parameter | Type                | Description                                            |
| --------- | ------------------- | ------------------------------------------------------ |
| index     | <code>number</code> | a tank node's index (starting from 1).                 |
| elev      | <code>number</code> | the tank's bottom elevation.                           |
| initlvl   | <code>number</code> | the initial water level in the tank.                   |
| minlvl    | <code>number</code> | the minimum water level for the tank.                  |
| maxlvl    | <code>number</code> | the maximum water level for the tank.                  |
| diam      | <code>number</code> | the tank's diameter (0 if a volume curve is supplied). |
| minvol    | <code>number</code> | the volume of the tank at its minimum water level.     |
| volcurve  | <code>string</code> | the name of the tank's volume curve ("" for no curve)  |

These properties have units that depend on the units used for flow rate (see Measurement Units).

---

#### getCoordinates

Gets the (x,y) coordinates of a node.

```typescript
getCoordinates(index: number): {
x: number;
y: number;
};
```

**Parameters**

| Parameter | Type                | Description                     |
| --------- | ------------------- | ------------------------------- |
| index     | <code>number</code> | a node index (starting from 1). |

**Returns**

<code>Object</code>

```typescript
{
  x: number;
  y: number;
}
```

| Property | Type                | Description                    |
| -------- | ------------------- | ------------------------------ |
| x        | <code>number</code> | the node's X-coordinate value. |
| y        | <code>number</code> | the node's Y-coordinate value. |

---

#### setCoordinates

Sets the (x,y) coordinates of a node.

```typescript
setCoordinates(index: number, x: number, y: number): void;
```

**Parameters**

| Parameter | Type                | Description                     |
| --------- | ------------------- | ------------------------------- |
| index     | <code>number</code> | a node index (starting from 1). |
| x         | <code>number</code> | the node's X-coordinate value.  |
| y         | <code>number</code> | the node's Y-coordinate value.  |
