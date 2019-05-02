import { TODO } from 'misc-utils-of-mine-typescript'
import { TextareaOptions } from '..'
import { Box, Node } from '../blessedTypes'

export interface EditorOptions extends TextareaOptions {
  language?: string
  text?: string
  defaultEncoding?: string
  multiLine?: boolean
  buffer?: BufferOptions
}
/**
 * The Buffer visual concept represent the editor area and has these settings:
 */
interface BufferOptions {
  useSpaces?: boolean
  tabSize?: number
}

interface EditorBuffer extends BaseWidget {}

type Direction = -1 | 1

interface BaseWidget extends Box {
  walkDepthFirst(direction: Direction, after: Node, fn: (n: Node, i?: number, arr?: Node[]) => void)
  focusFirst(direction: Direction, after: Node)
  focusNext(): this
  focusPrev(): this
  isAttached(): boolean
  hasFocus(asChild?: boolean): boolean
  pos(): TextBuffer.Point
  size(): TextBuffer.Point
  shrinkWidth(): number
  getBindings(): any
  resolveBinding(key: string): string | undefined
}
export interface IEditor extends BaseWidget {
  /** @internal */
  buffer: EditorBuffer

  /**
   * The main text buffer. It's responsible of maintaining the text, apply changed, notify, etc.
   */
  textBuf: TextBuffer.TextBuffer

  /**
   * Maintains current selection in the editor. (and cursor without selection also? TODO)
   */
  selection: TextBuffer.Marker

  /**
   * Increases the indentation to the right one level in given range or, if none if provided, in current [[selection]]
   */
  indent(range?: TextBuffer.Range): void

  _updateCursor(): void
  _updateContent(): void
  _getTabString(): string
  setLanguageMode(opts: { getLanguageId: () => string }): void
  open(p: string): Promise<IEditor>
  save(p: string): Promise<string>
  undo(options: TODO): TODO
  redo(options: TODO): TODO
  indent(range: TextBuffer.Range, dedent?: boolean): this
  /**
   * Copies current selected text to system clipboard
   */
  copy(): Promise<this>
  /**
   * Pastes current system clipboard content into current cursor range, possible replacing selected text if any
   */
  pageXOffset(): Promise<this>
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

  /**
   * If range not provided it will delete current selection range
   */
  delete(range?: TextBuffer.Range)
  /**
   * Gets the current visible position.
   */
  visiblePos(pos: TextBuffer.Range): TextBuffer.Range
  visiblePos(pos: TextBuffer.Point): TextBuffer.Point
  visiblePos(pos: [number, number]): TextBuffer.Point
  /**
   * Gets the current visible position.
   */
  realPos(pos: TextBuffer.Range): TextBuffer.Range
  realPos(pos: TextBuffer.Point): TextBuffer.Point
  realPos(pos: [number, number]): TextBuffer.Point

  moveCursorVertical(count: number, paragraphs?: boolean): this

  moveCursorHorizontal(count: number, words?: boolean): this
}
