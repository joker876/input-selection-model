# Standalone Functions

These are the standalone functions exported by input-selection-model.

## `posToRange`
```ts
posToRange(posOrRange: number | SelectionRange<number>): SelectionRange<number>;
```

Unifies the provided value to always be a [SelectionRange](types.md#selectionrange).

## `isSelectionRange`
```ts
isSelectionRange<T>(v: any): v is SelectionRange<T>;
```

A type guard function that checks if a value is a `SelectionRange`-like object.

## `caretPosToLineColumn` and `lineColumnToCaretPos`
```ts
caretPosToLineColumn(textValue: string, caretPos: number): LineAndColumn;

lineColumnToCaretPos(textValue: string, lineAndCol: LineAndColumn): number;
```

A set of two functions for converting a numeric caret position into a line & column object and the other way around.

Also requires a text value to determine the values from.