import { SelectionModel, SelectionRange, SelectionDirection } from './selection';

describe('Selection class', () => {
    let selection: SelectionModel;

    beforeEach(() => {
        selection = new SelectionModel();
    });

    describe('constructor', () => {
        it('should initialize the start and end properties with -1 if no value is passed in the constructor', () => {
            expect(selection.start).toEqual(-1);
            expect(selection.end).toEqual(-1);
        });

        it('should initialize the start and end properties with the provided position if a number is passed in the constructor', () => {
            selection = new SelectionModel(10);
            expect(selection.start).toEqual(10);
            expect(selection.end).toEqual(10);
        });

        it('should initialize the start and end properties with the start and end values of the provided range if a range is passed in the constructor', () => {
            const range: SelectionRange = { start: 10, end: 20 };
            selection = new SelectionModel(range);
            expect(selection.start).toEqual(10);
            expect(selection.end).toEqual(20);
        });

        it('should initialize the start and end properties with the start and end values of the provided selection if a selection is passed in the constructor', () => {
            const selectionToCopy = new SelectionModel({ start: 10, end: 20 });
            selection = new SelectionModel(selectionToCopy);
            expect(selection.start).toEqual(10);
            expect(selection.end).toEqual(20);
        });
    });

    describe('direction', () => {
        it('should return "forward" for the direction if the start is less than the end', () => {
            selection.start = 10;
            selection.end = 20;
            expect(selection.direction).toEqual(SelectionDirection.Forward);
        });

        it('should return "backward" for the direction if the start is greater than the end', () => {
            selection.start = 20;
            selection.end = 10;
            expect(selection.direction).toEqual(SelectionDirection.Backward);
        });

        it('should return "none" for the direction if the start is equal to the end', () => {
            selection.start = 10;
            selection.end = 10;
            expect(selection.direction).toEqual(SelectionDirection.None);
        });
    });

    describe('isInSelection method', () => {
        it('should return true for the isInSelection method if the provided position is inside the selection', () => {
            selection.start = 10;
            selection.end = 20;
            expect(selection.isInSelection(15)).toBeTrue();
        });

        it('should return false for the isInSelection method if the provided position is outside the selection', () => {
            selection.start = 10;
            selection.end = 20;
            expect(selection.isInSelection(25)).toBeFalse();
        });
    });

    describe('isBeforeSelection', () => {
        it('should return true for the isBeforeSelection method if the provided position is before the selection', () => {
            selection.start = 10;
            selection.end = 20;
            expect(selection.isBeforeSelection(5)).toBeTrue();
        });
        it('should return false for the isBeforeSelection method if the provided position is equal to the start of the selection', () => {
            selection.start = 10;
            selection.end = 20;
            expect(selection.isBeforeSelection(10)).toBeFalse();
        });

        it('should return false for the isBeforeSelection method if the provided position is equal to the end of the selection', () => {
            selection.start = 10;
            selection.end = 20;
            expect(selection.isBeforeSelection(20)).toBeFalse();
        });

        it('should return false for the isBeforeSelection method if the provided position is within the selection', () => {
            selection.start = 10;
            selection.end = 20;
            expect(selection.isBeforeSelection(15)).toBeFalse();
        });

        it('should return false for the isBeforeSelection method if the provided position is after the selection', () => {
            selection.start = 10;
            selection.end = 20;
            expect(selection.isBeforeSelection(25)).toBeFalse();
        });
    });
    describe('get', () => {
        it('should return an array containing start and end position when called', () => {
            selection.start = 5;
            selection.end = 10;
            expect(selection.get()).toEqual({ start: 5, end: 10 });
        });

        it('should return an array with start as the smaller value and end as the larger value even if end is before start', () => {
            selection.start = 10;
            selection.end = 5;
            expect(selection.get()).toEqual({ start: 10, end: 5 });
        });
    });

    describe('getOrdered', () => {
        it('should return an array containing start and end position in ascending order when called', () => {
            selection.start = 5;
            selection.end = 10;
            expect(selection.getOrdered()).toEqual({ start: 5, end: 10 });
        });

        it('should return an array with start as the smaller value and end as the larger value in ascending order even if end is before start', () => {
            selection.start = 10;
            selection.end = 5;
            expect(selection.getOrdered()).toEqual({ start: 5, end: 10 });
        });
    });

    describe('set', () => {
        it('should set start and end values to provided values when start is smaller than end', () => {
            selection.set({ start: 5, end: 10 });
            expect(selection.get()).toEqual({ start: 5, end: 10 });
        });

        it('should set start and end values to provided values when start is greater than end', () => {
            selection.set({ start: 10, end: 5 });
            expect(selection.get()).toEqual({ start: 10, end: 5 });
        });

        it('should set start and end values to the same value when start and end are equal', () => {
            selection.set(5);
            expect(selection.get()).toEqual({ start: 5, end: 5 });
        });
    });

    describe('offset method', () => {
        it('should offset both start and end by the same value', () => {
            selection.start = 5;
            selection.end = 10;
            selection.offset(5);
            expect(selection.get()).toEqual({ start: 10, end: 15 });

            selection.start = 10;
            selection.end = 5;
            selection.offset(5);
            expect(selection.get()).toEqual({ start: 15, end: 10 });
        });

        it('should offset start and end by two different values', () => {
            selection.start = 5;
            selection.end = 10;
            selection.offset({ start: 2, end: 8 });
            expect(selection.get()).toEqual({ start: 7, end: 18 });

            selection.start = 10;
            selection.end = 5;
            selection.offset({ start: 2, end: 8 });
            expect(selection.get()).toEqual({ start: 12, end: 13 });
        });
    });

    describe('setEnd', () => {
        it('should correctly set end to a new value', () => {
            selection.start = 5;
            selection.end = 10;
            selection.setEnd(20);
            expect(selection.end).toBe(20);
        });

        it('should correctly set end to a value smaller than start', () => {
            selection.start = 20;
            selection.end = 10;
            selection.setEnd(5);
            expect(selection.end).toBe(5);
        });

        it('should correctly set end to a value equal to start', () => {
            selection.start = 5;
            selection.end = 10;
            selection.setEnd(5);
            expect(selection.end).toBe(5);
        });

        it('should correctly set end to zero', () => {
            selection.start = 5;
            selection.end = 10;
            selection.setEnd(0);
            expect(selection.end).toBe(0);
        });
    });

    describe('save and restore methods', () => {
        it('should correctly save the current selection', () => {
            selection.start = 5;
            selection.end = 10;
            selection.save();
            expect(selection.get()).toEqual({ start: 5, end: 10 });
        });

        it('should correctly restore a previously saved selection', () => {
            selection.start = 5;
            selection.end = 10;
            selection.save();
            selection.start = 20;
            selection.end = 30;
            selection.restore();
            expect(selection.get()).toEqual({ start: 5, end: 10 });
        });

        it('should correctly restore a previously saved selection even if the values have been changed', () => {
            selection.start = 5;
            selection.end = 10;
            selection.save();
            selection.start = 20;
            selection.end = 30;
            selection.start = 40;
            selection.end = 50;
            selection.restore();
            expect(selection.get()).toEqual({ start: 5, end: 10 });
        });
    });
});
