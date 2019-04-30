import { TODO } from 'misc-utils-of-mine-typescript'
import { Marker, Point, Range, TextBuffer } from 'text-buffer'
import { Element, Textarea, TextareaOptions } from '..'

export interface EditorOptions extends TextareaOptions {
  language?: string
  text?: string
  defaultEncoding?: string
  multiLine?: boolean
}
/**
 * The Buffer visual concept represent the editor area and has these settings:
 */
interface BufferOptions {
  useSpaces?: boolean
  tabSize?: number
}
export interface IEditor extends Textarea {
  // focus(): void;
  /**
   * Increases the indentation to the right one level in given range or, if none if provided, in current [[selection]]
   */
  indent(range?: Range): void
  /** @internal */
  buffer: Element
  _updateCursor(): void
  _updateContent(): void
  _getTabString(): string
  setLanguageMode(opts: { getLanguageId: () => string }): void
  open(p: string): Promise<IEditor>
  save(p: string): Promise<string>
  undo(options: TODO): TODO
  redo(options: TODO): TODO
  indent(range: Range, dedent?: boolean): this
  /**
   * The main text buffer. It's responsible of maintaining the text, apply changed, notify, etc.
   */
  textBuf: TextBuffer
  /**
   * Copies current selected text to system clipboard
   */
  copy(): Promise<this>
  /**
   * Pastes current system clipboard content into current cursor range, possible replacing selected text if any
   */
  pageXOffset(): Promise<this>
  /**
   * Maintains current selection in the editor. (and cursor without selection also? TODO)
   */
  selection: Marker
  /**
   * Getter and Setter for insertMode
   */
  insertMode(value?: boolean): boolean
  toggleInsertMode(): void
  /**
   * Getter and Setter for readOnly
   */
  readOnly(value?: boolean): boolean
  /**
   * Getter and Setter for language
   */
  language(lang?: string): string
  /**
   *
   */
  lineWithEndingForRow(row: number): number

  /** If range not provided it will delete current selection range  */
  delete(range?: Range)
  /**
   * Gets the current visible position.
   */
  visiblePos(pos: Range): Range
  visiblePos(pos: Point): Point
  visiblePos(pos: [number, number]): Point
  /**
   * Gets the current visible position.
   */
  realPos(pos: Range): Range
  realPos(pos: Point): Point
  realPos(pos: [number, number]): Point

  moveCursorVertical(count: number, paragraphs?: boolean): this

  moveCursorHorizontal(count: number, words?: boolean): this
}

// export interface TextBuffer extends EventEmitter {
//   emitDidChangeTextEvent(...args: TODO): TODO
//   onDidChange(l: (...args: any[]) => TODO): void
//   onDidStopChanging(l: () => TODO): void
//   getText(): string
//   delete(range?: Range)
//   lineForRow(row: number): number
//   emitWillChangeTextEvent(): void
//   setText(s: string): void
// }

// let editorWidgetTypes;
// const Range = require('text-buffer/lib/range') as Range
// const Point = require('text-buffer/lib/point')
// export interface Range {
//   start: number
//   end: number
// }
// export interface Point {
//   row: number
//   column: number
// }
