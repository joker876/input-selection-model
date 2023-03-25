# Types

## `SelectionRange`
```ts
type SelectionRange<T = number> = { start: T, end: T };
```

A type representing a range of selection, with a start and end value.

## `SelectionDirection`
```ts
type SelectionDirection = 'none' | 'forward' | 'bacward';
```

An object-based enum representing the direction of the selection.

Can be used as both a type and an object, such as `SelectionDirection.Backward`.

## `LineAndColumn`
```ts
type LineAndColumn = { line: number, col: number };
```

A type representing a line and column coordinates.