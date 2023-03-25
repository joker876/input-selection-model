# `SelectionModel`

A class representing a selection range in text.

## Properties

### `start`

The starting position of the selection.

### `end`

The end position of the selection.

### `previous`

The selection range from before the last update.

## Constructors

### `constructor(pos?: number)`

Initializes a new instance of the `SelectionModel` class with a given position.

- `pos` - The position to set the start and end of the selection to.

### `constructor(range?: SelectionRange)`

Initializes a new instance of the `SelectionModel` class with a given range.

- `range` - The range to set the start and end of the selection to.

### `constructor(selection?: SelectionModel)`

Initializes a new instance of the `SelectionModel` class with a given selection.

- `selection` - The selection to set the start and end of this selection to.

## Getters

### `direction: SelectionDirection`

Gets the direction of the selection. Returns a value of type [SelectionDirection](types.md#selectiondirection).

### `size: number`

Gets sie of the selection, that is the absolute difference between start and end position of the selection.

## Methods

### `isInSelection`
```ts
isInSelection(pos: number): boolean
```

Determines whether a given position is inside of the selection.

- `pos` - The position to check.

### `isBeforeSelection`
```ts
isBeforeSelection(pos: number): boolean
```

Determines whether a given position is before the selection.

- `pos` - The position to check.

### `isAfterSelection`
```ts
isAfterSelection(pos: number): boolean
```

Determines whether a given position is after the selection.

- `pos` - The position to check.

### `get`
```ts
get(): SelectionRange<number>
```

Gets the range of the selection.

### `getOrdered`
```ts
getOrdered(): SelectionRange<number>
```

Gets the ordered selection range.

The ordered selection range has the smaller number as the start position, and the larger number as the end position.

### `getPrevious`
```ts
getPrevious(): SelectionRange<number>
```

Gets the range of the selection from before the last update.

### `set`
```ts
set(pos: number): void;
set(range: SelectionRange<number>): void;
set(range: SelectionRange<number>, direction: SelectionDirection): void;
```

Sets the selection range to the provided value, following the `direction`, if provided.

- If a `number` value is provided, the start and end values of the selection are both set to the provided value.
- If a `SelectionRange` value is provided, the start and end values of the selection are set to the start and end values of the provided range, respectively.

If a direction is provided, the new selection start & end values are swapped if `direction` is set `"backward"`. Otherwise, nothing is changed.

### `expand`
```ts
expand(pos: number): void;
expand(range: SelectionRange<number>): void;
```

Expands the selection range up to the provided position or range.

- If a `number` value is provided, the start and end values of the selection are both expanded to the provided value.
- If a `SelectionRange` value is provided, the start and end values of the selection are expanded to the start and end values of the provided range, respectively.

### `setEnd`
```ts
setEnd(pos: number): void
```

Sets the end position of the selection.

- `pos` - The end position to set the selection to.

### `offset`
```ts
offset(pos: number): void;
offset(range: SelectionRange<number>): void;
```
Offsets the selection range by the provided position or range.

- If a `number` value is provided, both the start and end values of the selection are increased by the provided value.
- If a `SelectionRange` value is provided, the start and end values of the selection are increased by the start and end values of the provided range, respectively.

### `save` and `restore`
```ts
save(): void;
restore(): void;
```

Methods for saving and later restoring the current state of the selection.

If the `restore` method is called, but the selection was never saved before, nothing happens.
