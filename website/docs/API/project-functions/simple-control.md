## Simple Control Functions

These functions are used for working with simple conditional controls.

| Function                                                                        | Description                                        |
| ------------------------------------------------------------------------------- | -------------------------------------------------- |
| <a href="Simple-Control-Functions#addControl"><code>addControl</code></a>       | Adds a new simple control to a project.            |
| <a href="Simple-Control-Functions#deleteControl"><code>deleteControl</code></a> | Deletes an existing simple control.                |
| <a href="Simple-Control-Functions#getControl"><code>getControl</code></a>       | Retrieves the properties of a simple control.      |
| <a href="Simple-Control-Functions#setControl"><code>setControl</code></a>       | Sets the properties of an existing simple control. |

#### addControl

Adds a new simple control to a project.

```typescript
addControl(type: ControlType, linkIndex: number, setting: number, nodeIndex: number, level: number): number;
```

**Parameters**

| Parameter | Type                     | Description                                                                                                                        |
| --------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| type      | <code>ControlType</code> | the type of control to add (see <a href="Enumerated-Types#ControlType"><code>ControlType</code></a>).                              |
| linkIndex | <code>number</code>      | the index of a link to control (starting from 1).                                                                                  |
| setting   | <code>number</code>      | control setting applied to the link.                                                                                               |
| nodeIndex | <code>number</code>      | index of the node used to control the link (0 for <code>ControlType.Timer</code> and <code>ControlType.TimeOfDay</code> controls). |
| level     | <code>number</code>      | action level (tank level, junction pressure, or time in seconds) that triggers the control.                                        |

**Returns**

<code>Number</code>
index of the new control.

##

#### deleteControl

Deletes an existing simple control.

```typescript
deleteControl(index: number): void;
```

**Parameters**

| Parameter | Type                | Description                                           |
| --------- | ------------------- | ----------------------------------------------------- |
| index     | <code>number</code> | the index of the control to delete (starting from 1). |

##

#### getControl

Retrieves the properties of a simple control.

```typescript
getControl(index: number): {
type: ControlType;
linkIndex: number;
setting: number;
nodeIndex: number;
level: number;
};
```

**Parameters**

| Parameter | Type                | Description                            |
| --------- | ------------------- | -------------------------------------- |
| index     | <code>number</code> | the control's index (starting from 1). |

**Returns**

<code>Object</code>

```typescript
{
  type: ControlType;
  linkIndex: number;
  setting: number;
  nodeIndex: number;
  level: number;
}
```

| Property  | Type                     | Description                                                                                                                        |
| --------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| type      | <code>ControlType</code> | the type of control to add (see <a href="Enumerated-Types#ControlType"><code>ControlType</code></a>).                              |
| linkIndex | <code>number</code>      | the index of a link to control (starting from 1).                                                                                  |
| setting   | <code>number</code>      | control setting applied to the link.                                                                                               |
| nodeIndex | <code>number</code>      | index of the node used to control the link (0 for <code>ControlType.Timer</code> and <code>ControlType.TimeOfDay</code> controls). |
| level     | <code>number</code>      | action level (tank level, junction pressure, or time in seconds) that triggers the control.                                        |

##

#### setControl

Sets the properties of an existing simple control.

```typescript
setControl(index: number, type: ControlType, linkIndex: number, setting: number, nodeIndex: number, level: number): void;
```

**Parameters**

| Parameter | Type                     | Description                                                                                                                        |
| --------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| index     | <code>number</code>      | the control's index (starting from 1).                                                                                             |
| type      | <code>ControlType</code> | the type of control to add (see <a href="Enumerated-Types#ControlType"><code>ControlType</code></a>).                              |
| linkIndex | <code>number</code>      | the index of a link to control (starting from 1).                                                                                  |
| setting   | <code>number</code>      | control setting applied to the link.                                                                                               |
| nodeIndex | <code>number</code>      | index of the node used to control the link (0 for <code>ControlType.Timer</code> and <code>ControlType.TimeOfDay</code> controls). |
| level     | <code>number</code>      | action level (tank level, junction pressure, or time in seconds) that triggers the control.                                        |
