# input-selection-model
![npm](https://img.shields.io/npm/v/input-selection-model?label=version) ![NPM](https://img.shields.io/npm/l/input-selection-model) ![npm bundle size](https://img.shields.io/bundlephobia/min/input-selection-model)

A class for handling HTML input selection range tasks.

## Highlights
* Supports TypeScript!
* Supports Node and browser
* Includes full JSDoc documentation
* Very lightweight!
* Contains tests


## Installation
### NodeJS
```
npm install input-selection-model --save
```

### Browser
Import the script:
```html
<script src="https://joker876.github.io/input-selection-model/input-selection-model.min.js">
```
And import the class from a global object:
```js
new InputSelectionModel.SelectionModel(/* initial value */);
```

## Exported members
- `SelectionModel` - a class for dealing with the selection in HTML inputs and textareas
- `SelectionCoordinates` - a class for dealing with line & column based coordinates in an HTML textarea
- `SelectionDirection` - an enum-like object and type respresenting the direction of the selection
- `SelectionRange<T>` - a type representing an object `{ start: T, end: T }`
- `LineAndColumn` - a type representing an object `{ line: number, col: number }`
- `caretPosToLineColumn` and `lineColumnToCaretPos` - a set of functions for converting between a singular caret position and line & column based coordinates and back
- `isSelectionRange` - a type-guard function for checking if a value is a valid `SelectionRange`
- `posToRange` - a function for unifying `number` and `SelectionRange` values (always returns a `SelectionRange`).

## Basic Usage
> More detailed documentation available [here](docs/index.md).

```typescript
import { SelectionModel } from 'input-selection-model';

const selectionModel = new SelectionModel();
```

SelectionModel constructor takes a single initializer that sets the selection start and end.
- `undefined` - both start and end will be set to -1 (invalid state).
- `number` - both start and end will be set to the provided value
- `SelectionRange<number>` - the start and end values will be copied from the `SelectionRange` object.
- `SelectionModel` - the start and end values will be copied from the other instance of `SelectionModel`.

### Properties
- `start: number` - the start position of the selection.
- `end: number` - the end position of the selection.
- `previous: SelectionRange<number>` - the selection range from before the last update.
- `direction: SelectionDirection` - (getter) the selection direction. Can be any of `none`, `forward`, and `backward`.
- `size: number` - (getter) the absolute difference between start and end position of the selection.

### Methods
- `get(): SelectionRange` - returns the selection range.
- `getOrdered(): SelectionRange` - returns the selection range, with the `start` property always being the less than or equal to the `end`.
- `getPrevious(): SelectionRange` - returns the selection range from before the last update.

- `set(value, direction)` - sets the selection start and end to a single pos, or a range, following the direction.
- `expand(value)` - expands the selection up to the provided position. Accepts a single position or a selection range.
- `setEnd(value)` - sets the selection end to the provided value.
- `offset(value)` - offsets the whole selection by a value, or start and end properties by their respective values from a range.
- `save()` - saves the current selection so that it can be restored later.
- `restore()` - restores the previously saved selection.