import 'first-last';
import { caretPosToLineColumn, LineAndColumn } from './caret-manip';

/**
 * A type representing a range of selection, with a start and end value.
 *
 * @template T - The type of the start and end values. Default is `number`.
 */
export type SelectionRange<T = number> = { start: T, end: T };

/**
 * An object-based enum representing the direction of the selection.
 */
export const SelectionDirection = {
    None: 'none',
    Forward: 'forward',
    Backward: 'backward',
} as const;
/**
 * A type representing the direction of the selection.
 */
export type SelectionDirection = typeof SelectionDirection[keyof typeof SelectionDirection];

/**
 * A class representing a selection in a document.
 */
export class SelectionModel {
    /**
     * The starting position of the selection.
     */
    public start!: number;
    /**
     * The end position of the selection.
     */
    public end!: number;

    /**
     * The selection range from before the last update.
     */
    public previous: SelectionRange = { start: -1, end: -1 };

    /**
     * Initializes a new instance of the Selection class with a given position.
     *
     * @param pos - The position to set the start and end of the selection to.
     */
    constructor(pos?: number);

    /**
     * Initializes a new instance of the Selection class with a given range.
     *
     * @param range - The range to set the start and end of the selection to.
     */
    constructor(range?: SelectionRange);

    /**
     * Initializes a new instance of the Selection class with a given selection.
     *
     * @param selection - The selection to set the start and end of this selection to.
     */
    constructor(selection?: SelectionModel);

    /**
     * Initializes a new instance of the Selection class with a given value.
     *
     * @param a - The value to initialize the selection with. Can be a number, range, or selection.
     */
    constructor(a?: number | SelectionRange | SelectionModel) {
        if (typeof a == 'number') a = { start: a, end: a };
        this.start = a?.start ?? -1;
        this.end = a?.end ?? -1;
    }

    //! selection direction
    /**
     * Gets the direction of the selection.
     */
    get direction(): SelectionDirection {
        if (this.start > this.end) return 'backward';
        if (this.start == this.end) return 'none';
        return 'forward';
    }

    //! checking for relative position
    /**
     * Determines whether a given position is inside of the selection.
     *
     * @param pos - The position to check.
     * @returns True if the position is inside the selection, false otherwise.
     */
    isInSelection(pos: number): boolean {
        const { start, end } = this.getOrdered();
        return pos >= start && pos <= end;
    }

    /**
     * Determines whether a given position is before the selection.
     *
     * @param pos - The position to check.
     * @returns True if the position is before the selection, false otherwise.
     */
    isBeforeSelection(pos: number): boolean {
        const { start } = this.getOrdered();
        return pos <= start;
    }

    /**
     * Determines whether a given position is after the selection.
     *
     * @param pos - The position to check.
     * @returns True if the position is after the selection, false otherwise.
     */
    isAfterSelection(pos: number): boolean {
        const { end } = this.getOrdered();
        return pos >= end;
    }

    //! getters
    /**
     * Gets the range of the selection.
     *
     * @returns The range of the selection.
     */
    get(): SelectionRange {
        return { start: this.start, end: this.end };
    }

    /**
    * Gets the ordered selection range.
    * The ordered selection range has the smaller number as the start position, and the larger number as the end position.
    * 
    * @returns A `SelectionRange` object representing the ordered selection.
    */
    getOrdered(): SelectionRange {
        if (this.direction == 'backward') {
            return { start: this.end, end: this.start };
        }
        return this.get();
    }

    /**
     * Gets the range of the selection from before the last update.
     *
     * @returns The previous range of the selection.
     */
    getPrevious(): SelectionRange {
        return { start: this.previous.start, end: this.previous.end };
    }

    /**
     * Gets the absolute difference between start and end position of the selection.
     * 
     * @returns {number} A number indicating the amount of characters inside of the selection.
     */
    get size(): number {
        const { start, end } = this.getOrdered();
        return end - start;
    }

    //! setters
    /**
    * Sets the selection range with the provided position.
    *
    * @param {number} pos The position to set the selection to.
    */
    set(pos: number): void;
    /**
    * Sets the selection range with the provided range.
    *
    * @param {SelectionRange} pos The range to set the selection to.
    */
    set(range: SelectionRange): void;
    /**
    * Sets the selection range with the provided position or range.
    * If a number is provided, the start and end values of the selection are both set to the provided value.
    * If a range is provided, the start and end values of the selection are set to the start and end values of the provided range, respectively.
    *
    * @param {number | SelectionRange} a The position or range to set the selection to.
    */
    set(a: SelectionRange | number): void;
    /**
    * Sets the selection range with the provided range, following the direction.
    *
    * @param {SelectionRange} range The position or range to set the selection to.
    * @param {SelectionDirection} direction The direction of the selection.
    */
    set(range: SelectionRange, direction: SelectionDirection): void;
    /**
    * Sets the selection range with the provided position or range.
    * If a number is provided, the start and end values of the selection are both set to the provided value.
    * If a range is provided, the start and end values of the selection are set to the start and end values of the provided range, respectively.
    *
    * @param {number | SelectionRange} a The position or range to set the selection to.
    * @param {SelectionDirection} b The direction of the selection.
    */
    set(a: SelectionRange | number, b?: SelectionDirection): void {
        //if `a` is a number, convert it to a range
        if (typeof a == 'number') a = { start: a, end: a };
        //if the direction is "backward", swap the start and end in the range
        if (b === 'backward') a = { start: a.end, end: a.start };

        this._storePrevious();
        //set current selection
        this.start = a.start;
        this.end = a.end;
    }

    /**
    * Expands the selection range up to the provided position.
    *
    * @param {number} pos The position to expand the selection to.
    */
    expand(pos: number): void;
    /**
    * Expands the selection range up to the provided range.
    *
    * @param {SelectionRange} pos The range to expand the selection to.
    */
    expand(range: SelectionRange): void;
    /**
    * Expands the selection range up to the provided position or range.
    * If a number is provided, the start and end values of the selection are both expanded to the provided value.
    * If a range is provided, the start and end values of the selection are expanded to the start and end values of the provided range, respectively.
    *
    * @param {number | SelectionRange} a The position or range to expand the selection to.
    */
    expand(a: SelectionRange | number): void;
    /**
    * Expands the selection range up to the provided position or range.
    * If a number is provided, the start and end values of the selection are both expanded to the provided value.
    * If a range is provided, the start and end values of the selection are expanded to the start and end values of the provided range, respectively.
    *
    * @param {number | SelectionRange} a The position or range to expand the selection to.
    */
    expand(a: SelectionRange | number): void {
        //if `a` is a number, convert it to a range
        if (typeof a == 'number') a = { start: a, end: a };

        this._storePrevious();
        //expand the selection
        if (a.start < this.start) this.start = a.start;
        if (a.end > this.end) this.end = a.end;
    }

    /**
    * Sets the end position of the selection.
    *
    * @param {number} pos The end position to set the selection to.
    *
    * @returns {void}
    */
    setEnd(pos: number): void {
        this._storePrevious();
        this.end = pos;
    }
    /**
    * Offsets the selection range by the provided position.
    * Both the start and end values of the selection are increased by the provided value.
    *
    * @param {number | SelectionRange} pos The position to offset the selection by.
    */
    offset(pos: number): void;
    /**
    * Offsets the selection range by the provided range.
    * The start and end values of the selection are increased by the start and end values of the provided range, respectively.
    *
    * @param {number | SelectionRange} range The range to offset the selection by.
    */
    offset(range: SelectionRange): void;
    /**
    * Offsets the selection range by the provided position or range.
    * If a number is provided, both the start and end values of the selection are increased by the provided value.
    * If a range is provided, the start and end values of the selection are increased by the start and end values of the provided range, respectively.
    *
    * @param {number | SelectionRange} a The position or range to offset the selection by.
    */
    offset(a: SelectionRange | number): void;
    /**
    * Offsets the selection range by the provided position or range.
    * If a number is provided, both the start and end values of the selection are increased by the provided value.
    * If a range is provided, the start and end values of the selection are increased by the start and end values of the provided range, respectively.
    *
    * @param {number | SelectionRange} a The position or range to offset the selection by.
    */
    offset(a: SelectionRange | number): void {
        if (typeof a == 'number') a = { start: a, end: a };
        this._storePrevious();
        //set current selection
        if (this.direction == 'backward') {
            this.start += a.end;
            this.end += a.start;
            return;
        }
        this.start += a.start;
        this.end += a.end;
    }

    /**
     * Stores the current selection into the `previous` property.
     */
    private _storePrevious(): void {
        this.previous.start = this.start;
        this.previous.end = this.end;
    }
    
    //! saving and restoring
    /**
     * Stores the current selection saved for restoration.
     */
    private _savedSelection?: SelectionRange;
    /**
     * Stores the previous selection saved for restoration.
     */
    private _savedPrevSelection?: SelectionRange;

    /**
     * Saves the current selection range so that it can be restored later.
     */
    save(): void {
        this._savedSelection = {
            start: this.start,
            end: this.end,
        };
        this._savedPrevSelection = {
            start: this.previous.start,
            end: this.previous.end,
        };
    }

    /**
    * Restores the saved selection range if one exists.
    */
    restore(): void {
        if (!this._savedSelection) return;

        this.previous.start = this._savedPrevSelection!.start;
        this.previous.end = this._savedPrevSelection!.end;

        this.start = this._savedSelection.start;
        this.end = this._savedSelection.end;

        this._savedSelection = undefined;
        this._savedPrevSelection = undefined;
    }
}

export class SelectionCoordinates {
    /**
     * Represents the start of the selection in the form of line and column numbers.
     */
    public start: LineAndColumn = { line: 0, col: 0};
    /**
     * Represents the end of the selection in the form of line and column numbers.
     */
    public end: LineAndColumn = { line: 0, col: 0 };
    /**
     * The direction of the selection.
     */
    public direction: SelectionDirection = 'none';

    /**
     * Generates the start and end values of the selection based on the range of positions in the code and the code string.
     * @param selection The range of positions in the code that represent the selection.
     * @param code The code string where the selection was made.
     */
    generate(selection: SelectionModel, code: string): void {
        this.start = caretPosToLineColumn(code, selection.start);
        this.end = caretPosToLineColumn(code, selection.end);
        this.direction = selection.direction;
    }
    
    /**
     * Returns the selection as a range of `LineAndColumn` objects.
     */
    get(): SelectionRange<LineAndColumn> {
        return { start: this.start, end: this.end };
    }

    /**
     * Returns the ordered selection as a range of `LineAndColumn` objects, with the `start` and `end` values reversed if the selection direction is backward.
     */
    getOrdered(): SelectionRange<LineAndColumn> {
        if (this.direction == 'backward') {
            return { start: this.end, end: this.start };
        }
        return this.get();
    }
}

export function posToRange(posOrRange: number | SelectionRange<number>): SelectionRange<number> {
    if (typeof posOrRange == 'number') return { start: posOrRange, end: posOrRange };
    return posOrRange;
}
export function isSelectionRange<T>(v: any | SelectionRange<T>): v is SelectionRange<T> {
    const keys = Object.keys(v);
    return keys && keys.includes('start') && keys.includes('end');
}