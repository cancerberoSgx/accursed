import { TODO } from 'misc-utils-of-mine-typescript'
import { Box, BoxOptions, Node, Padding, Style } from '../blessedTypes'

export interface EditorOptions extends BoxOptions {
  //RemoveProperties<BoxOptions, 'style'> {
  language?: string
  text?: string
  defaultEncoding?: string
  multiLine?: boolean
  pageLines?: number
  doubleClickDuration?: number
  highlight?: boolean

  buffer?: EditorBufferOptions
  gutter?: GutterOptions

  bindings?: EditorBindingsOptions
  style?: EditorStyle
}

/**
 * The Buffer visual concept represent the editor area and has these settings:
 */
interface EditorBufferOptions extends BoxOptions {
  useSpaces?: boolean
  tabSize?: number
  visibleWhiteSpace?: boolean
  visibleLineEndings?: boolean
  cursorPadding?: Padding
}

interface GutterOptions extends BoxOptions {
  lineNumberWidth?: number
  style: Style & { currentLine?: string }
}

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
  buffer: BaseWidget
  /** @internal */
  gutter: BaseWidget

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

export interface EditorBindingsOptions {
  goLeft?: string | string[] | false
  goLeftWord?: string | string[] | false
  goLeftInfinity?: string | string[] | false
  goRight?: string | string[] | false
  goRightWord?: string | string[] | false
  goRightInfinity?: string | string[] | false
  goUpParagraph?: string | string[] | false
  goUp?: string | string[] | false
  goUpPage?: string | string[] | false
  goUpInfinity?: string | string[] | false
  goDownParagraph?: string | string[] | false
  goDown?: string | string[] | false
  goDownPage?: string | string[] | false
  goDownInfinity?: string | string[] | false
  goMatchingBracket?: string | string[] | false
  selectAll?: string | string[] | false
  selectLeft?: string | string[] | false
  selectLeftWord?: string | string[] | false
  selectLeftInfinity?: string | string[] | false
  selectRight?: string | string[] | false
  selectRightWord?: string | string[] | false
  selectRightInfinity?: string | string[] | false
  selectUp?: string | string[] | false
  selectUpParagraph?: string | string[] | false
  selectUpPage?: string | string[] | false
  selectUpInfinity?: string | string[] | false
  selectDown?: string | string[] | false
  selectDownParagraph?: string | string[] | false
  selectDownPage?: string | string[] | false
  selectDownInfinity?: string | string[] | false
  selectMatchingBracket?: string | string[] | false
  deleteLeft?: string | string[] | false
  deleteRight?: string | string[] | false
  deleteLeftWord?: string | string[] | false
  deleteRightWord?: string | string[] | false
  deleteLeftInfinity?: string | string[] | false
  deleteRightInfinity?: string | string[] | false
  deleteLine?: string | string[] | false
  duplicateLine?: string | string[] | false
  indent?: string | string[] | false
  dedent?: string | string[] | false
  undo?: string | string[] | false
  redo?: string | string[] | false
  copy?: string | string[] | false
  cut?: string | string[] | false
  paste?: string | string[] | false
  toggleInsertMode?: string | string[] | false
  focusNext?: string | string[] | false
  focusPrev?: string | string[] | false
}

export interface EditorStyle extends Style {
  //RemoveProperties<Style, 'label'> {
  selection?: string
  match?: string
  matchingBracket?: string
  mismatchedBracket?: string
  whiteSpace?: string
  keyword?: string
  built_in?: string
  preprocessor?: string
  title?: string
  params?: string
  class?: string
  function?: string
  decorator?: string
  shebang?: string
  variable?: string
  operator?: string
  subst?: string
  number?: string
  string?: string
  regexp?: string
  literal?: string
  comment?: string
  header?: string
  strong?: string
  code?: string
  link_label?: string
  link_url?: string
  bullet?: string
  attribute?: string
  value?: string
  setting?: string
  // label?: string
  symbol?: string
  constant?: string
}

export interface EditorGutterStyle extends Style {
  currentLine?: string
}
export interface EditorPerf {
  matchesRenderThrottle?: number
  updateContentThrottle?: number
}
