# `SelectionCoordinates`

A class representing the line & column of the selection in a textarea. Should be used in pair with the [SelectionModel](selection-model.md) class.

## Constructor
```ts
constructor();
```

Implicit constructor. Takes no arguments, and does nothing except of creating a new instance.

## Public Properties
### `start` and `end`
```ts
start: LineAndColumn;
end: LineAndColumn;
```

Those properties represent the start and end of the selection in the form of line and column numbers. The line & column values are a 0-based index of the position.

### `direction`
```ts
direction: SelectionDirection;
```

Represents the direction of the selection. Can be any value permitted by [SelectionDirection](types.md#selectiondirection) type.

## Methods
### `generate`
```ts
generate(selection: SelectionModel, code: string): void;
```

Assigns new values to the `start` and `end` properties, based on the provided selection model and string of code from the textarea. Also updates the `direction` property accordingly.

- `selection` - A [SelectionModel](selection-model.md) instance containing the selection range.
- `code` - The code string where the selection was made.

### `get`
```ts
get(): SelectionRange<LineAndColumn>;
```

Returns the selection coordinates as a range of [LineAndColumn](types.md#lineandcolumn) objects.

### `getOrdered`
```ts
getOrdered(): SelectionRange<LineAndColumn>;
```

Returns the selection coordinates as a range of [LineAndColumn](types.md#lineandcolumn) objects, with the `start` and `end` values reversed if the selection direction is backward.