

/**
 * A type representing a line and column in the editor.
 */
export type LineAndColumn = {
    /**
     * The line number.
     */
    line: number;

    /**
     * The column number.
     */
    col: number;
}

/**
 * Converts a caret position in the editor to the corresponding line and column.
 * 
 * @param textValue The text in the editor.
 * @param caretPos The caret position in the editor.
 * @returns A `LineAndColumn` object representing the line and column of the caret position.
 */
export function caretPosToLineColumn(textValue: string, caretPos: number): LineAndColumn {
    let textLines = textValue.substring(0, caretPos).split('\n');
    return {
        line: textLines.length - 1,
        col: textLines.last().length,
    }
}

/**
 * Converts a line and column in the editor to the corresponding caret position.
 * 
 * @param textValue The text in the editor.
 * @param lineAndCol A `LineAndColumn` object representing the line and column.
 * @returns The caret position in the editor corresponding to the given line and column.
 */
export function lineColumnToCaretPos(textValue: string, lineAndCol: LineAndColumn): number {
    if (lineAndCol.line < 0) return 0;
    let textLines = textValue.split('\n');
    if (lineAndCol.line >= textLines.length) return textValue.length;
    let lengthSum = 0;
    for (let i = 0; i < textLines.length; i++) {
        const line = textLines[i];
        if (lineAndCol.line == i) {
            let newCol = Math.min(lineAndCol.col, line.length);
            return lengthSum + newCol;
        }
        lengthSum += line.length + 1;
    }
    return lengthSum;
}