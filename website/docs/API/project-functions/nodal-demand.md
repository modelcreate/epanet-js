## Project Class Nodal Demand Functions

These functions are used for managing nodal demands.

| Function                                                                                | Description                                                                          |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| <a href="Nodal-Demand-Functions#addDemand"><code>addDemand</code></a>                   | appends a new demand to a junction node demands list.                                |
| <a href="Nodal-Demand-Functions#deleteDemand"><code>deleteDemand</code></a>             | deletes a demand from a junction node.                                               |
| <a href="Nodal-Demand-Functions#getBaseDemand"><code>getBaseDemand</code></a>           | Gets the base demand for one of a node's demand categories.                          |
| <a href="Nodal-Demand-Functions#getDemandIndex"><code>getDemandIndex</code></a>         | Retrieves the index of a node's named demand category.                               |
| <a href="Nodal-Demand-Functions#getDemandModel"><code>getDemandModel</code></a>         | Retrieves the type of demand model in use and its parameters.                        |
| <a href="Nodal-Demand-Functions#getDemandName"><code>getDemandName</code></a>           | Retrieves the name of a node's demand category.                                      |
| <a href="Nodal-Demand-Functions#getDemandPattern"><code>getDemandPattern</code></a>     | Retrieves the index of a time pattern assigned to one of a node's demand categories. |
| <a href="Nodal-Demand-Functions#getNumberOfDemands"><code>getNumberOfDemands</code></a> | Retrieves the number of demand categories for a junction node.                       |
| <a href="Nodal-Demand-Functions#setBaseDemand"><code>setBaseDemand</code></a>           | Sets the base demand for one of a node's demand categories.                          |
| <a href="Nodal-Demand-Functions#setDemandModel"><code>setDemandModel</code></a>         | Sets the type of demand model to use and its parameters.                             |
| <a href="Nodal-Demand-Functions#setDemandName"><code>setDemandName</code></a>           | Assigns a name to a node's demand category.                                          |
| <a href="Nodal-Demand-Functions#setDemandPattern"><code>setDemandPattern</code></a>     | Sets the index of a time pattern used for one of a node's demand categories.         |

#### addDemand

appends a new demand to a junction node demands list.

```typescript
addDemand(nodeIndex: number, baseDemand: number, demandPattern: string, demandName: string): void;
```

**Parameters**

| Parameter     | Type                | Description                                   |
| ------------- | ------------------- | --------------------------------------------- |
| nodeIndex     | <code>number</code> | the index of a node (starting from 1).        |
| baseDemand    | <code>number</code> | the demand's base value.                      |
| demandPattern | <code>string</code> | the name of a time pattern used by the demand |
| demandName    | <code>string</code> | the name of the demand's category             |

A NULL or blank string can be used for demandPattern and for demandName to indicate that no time pattern or category name is associated with the demand.

##

#### deleteDemand

Deletes a demand from a junction node.

```typescript
deleteDemand(nodeIndex: number, demandIndex: number): void;
```

**Parameters**

| Parameter   | Type           | Description                                                              |
| ----------- | -------------- | ------------------------------------------------------------------------ |
| nodeIndex   | <code> </code> | the index of a node (starting from 1).                                   |
| demandIndex | <code> </code> | the position of the demand in the node's demands list (starting from 1). |

##

#### getBaseDemand

Gets the base demand for one of a node's demand categories.

```typescript
getBaseDemand(nodeIndex: number, demandIndex: number): number;
```

**Parameters**

| Parameter   | Type                | Description                                                    |
| ----------- | ------------------- | -------------------------------------------------------------- |
| nodeIndex   | <code>number</code> | a node's index (starting from 1).                              |
| demandIndex | <code>number</code> | the index of a demand category for the node (starting from 1). |

**Returns**

<code>Number</code>
the category's base demand.

##

#### getDemandIndex

Retrieves the index of a node's named demand category.

```typescript
getDemandIndex(nodeIndex: number, demandName: string): number;
```

**Parameters**

| Parameter  | Type                | Description                                |
| ---------- | ------------------- | ------------------------------------------ |
| nodeIndex  | <code>number</code> | the index of a node (starting from 1)      |
| demandName | <code>string</code> | the name of a demand category for the node |

**Returns**

<code>Number</code>
the index of the demand being sought

##

#### getDemandModel

Retrieves the type of demand model in use and its parameters.

```typescript
getDemandModel(): {
type: DemandModel;
pmin: number;
preq: number;
pexp: number;
};
```

**Returns**

<code>Object</code>

```typescript
{
  type: DemandModel;
  pmin: number;
  preq: number;
  pexp: number;
}
```

| Property | Type                     | Description                                                                                     |
| -------- | ------------------------ | ----------------------------------------------------------------------------------------------- |
| type     | <code>DemandModel</code> | Type of demand model (see <a href="Enumerated-Types#DemandModel"><code>DemandModel</code></a>). |
| pmin     | <code>number</code>      | Pressure below which there is no demand.                                                        |
| preq     | <code>number</code>      | Pressure required to deliver full demand.                                                       |
| pexp     | <code>number</code>      | Pressure exponent in demand function.                                                           |

Parameters pmin, preq, and pexp are only used when the demand model is <code>DemandModel.PDA</code>.

##

#### getDemandName

Retrieves the name of a node's demand category.

```typescript
getDemandName(nodeIndex: number, demandIndex: number): string;
```

**Parameters**

| Parameter   | Type                | Description                                                         |
| ----------- | ------------------- | ------------------------------------------------------------------- |
| nodeIndex   | <code>number</code> | a node's index (starting from 1).                                   |
| demandIndex | <code>number</code> | the index of one of the node's demand categories (starting from 1). |

**Returns**

<code>String</code>
The name of the selected category.

##

#### getDemandPattern

Retrieves the index of a time pattern assigned to one of a node's demand categories.

```typescript
getDemandPattern(nodeIndex: number, demandIndex: number): number;
```

**Parameters**

| Parameter   | Type                | Description                                                    |
| ----------- | ------------------- | -------------------------------------------------------------- |
| nodeIndex   | <code>number</code> | the node's index (starting from 1).                            |
| demandIndex | <code>number</code> | the index of a demand category for the node (starting from 1). |

**Returns**

<code>Number</code>
the index of the category's time pattern.

A returned pattern index of 0 indicates that no time pattern has been assigned to the demand category.

##

#### getNumberOfDemands

Retrieves the number of demand categories for a junction node.

```typescript
getNumberOfDemands(nodeIndex: number): number;
```

**Parameters**

| Parameter | Type                | Description                            |
| --------- | ------------------- | -------------------------------------- |
| nodeIndex | <code>number</code> | the index of a node (starting from 1). |

**Returns**

<code>Number</code>
the number of demand categories assigned to the node.

##

#### setBaseDemand

Sets the base demand for one of a node's demand categories.

```typescript
setBaseDemand(nodeIndex: number, demandIndex: number, baseDemand: number): void;
```

**Parameters**

| Parameter   | Type                | Description                                                    |
| ----------- | ------------------- | -------------------------------------------------------------- |
| nodeIndex   | <code>number</code> | a node's index (starting from 1).                              |
| demandIndex | <code>number</code> | the index of a demand category for the node (starting from 1). |
| baseDemand  | <code>number</code> | the new base demand for the category.                          |

##

#### setDemandModel

Sets the type of demand model to use and its parameters.

```typescript
setDemandModel(type: DemandModel, pmin: number, preq: number, pexp: number): void;
```

**Parameters**

| Parameter | Type                     | Description                                                                                     |
| --------- | ------------------------ | ----------------------------------------------------------------------------------------------- |
| type      | <code>DemandModel</code> | Type of demand model (see <a href="Enumerated-Types#DemandModel"><code>DemandModel</code></a>). |
| pmin      | <code>number</code>      | Pressure below which there is no demand.                                                        |
| preq      | <code>number</code>      | Pressure required to deliver full demand.                                                       |
| pexp      | <code>number</code>      | Pressure exponent in demand function.                                                           |

Set type to EN_DDA for a traditional demand driven analysis (in which case the remaining three parameter values are ignored) or to EN_PDA for a pressure driven analysis. In the latter case a node's demand is computed as:

`Dfull * [ (P - pmin) / (preq - pmin) ] ^ pexp`

where Dfull is the full demand and P is the current pressure.

Setting preq equal to pmin will result in a solution with the smallest amount of demand reductions needed to insure that no node delivers positive demand at a pressure below pmin.

##

#### setDemandName

Assigns a name to a node's demand category.

```typescript
setDemandName(nodeIndex: number, demandIdx: number, demandName: string): void;
```

**Parameters**

| Parameter  | Type                | Description                                                         |
| ---------- | ------------------- | ------------------------------------------------------------------- |
| nodeIndex  | <code>number</code> | a node's index (starting from 1).                                   |
| demandIdx  | <code>number</code> | the index of one of the node's demand categories (starting from 1). |
| demandName | <code>string</code> | the new name assigned to the category.                              |

##

#### setDemandPattern

Sets the index of a time pattern used for one of a node's demand categories.

```typescript
setDemandPattern(nodeIndex: number, demandIndex: number, patIndex: number): void;
```

**Parameters**

| Parameter   | Type                | Description                                                         |
| ----------- | ------------------- | ------------------------------------------------------------------- |
| nodeIndex   | <code>number</code> | a node's index (starting from 1).                                   |
| demandIndex | <code>number</code> | the index of one of the node's demand categories (starting from 1). |
| patIndex    | <code>number</code> | the index of the time pattern assigned to the category.             |

Specifying a pattern index of 0 indicates that no time pattern is assigned to the demand category.
