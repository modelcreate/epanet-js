
# Workspace Class

### Class `Workspace`

Create a `Workspace` object by instancing the `epanetJs.Workspace` class.

```javascript
import { Workspace } from `epanet-js`
const ws = new Workspace()
```

### Class Methods

```typescript
writeFile(path: string, data: string | ArrayBufferView)

readFile(file: string): string;
readFile(file: string, encoding: 'utf8'): string;
readFile(file: string, encoding: 'binary'): Uint8Array;

```
