# `input-selection-model` documentation

## Table of Contents
- [SelectionModel](selection-model.md) class
- [SelectionCoordinates](selection-coordintes.md) class
- Related [types](types.md)
  - `SelectionRange<T>`
  - `SelectionDirection`
  - `LineAndColumn`
- Standalone [functions](functions.md)
  - `posToRange` converter function
  - `isSelectionRange` type guard
  - `caretPosToLineColumn` and `lineColumnToCaretPos` converter functions

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