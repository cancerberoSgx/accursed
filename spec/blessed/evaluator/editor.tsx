import { EventEmitter } from 'events'
import { TODO } from 'misc-utils-of-mine-typescript'
import { Element, TextareaOptions } from '../../../src'

const Range = require('text-buffer/lib/range')
const Editor = require('editor-widget')
const Point = require('text-buffer/lib/point')

export interface Range {}

export interface IEditor extends Element {
  focus(): void
  indent(range: Range): void
  buffer: Element
  _updateCursor(): void
  _updateContent(): void
  setLanguageMode(opts: { getLanguageId: () => string }): void
  open(p: string): Promise<IEditor>
  save(p: string): Promise<string>
  undo(options: TODO): TODO
  redo(options: TODO): TODO
  textBuf: TextBuffer
  copy: TODO
  paste: TODO
  toggleInsertMode(): void
  language(s: string): void
  selection: TODO
}

export interface TextBuffer extends EventEmitter {
  emitDidChangeTextEvent(...args: TODO): TODO
  onDidChange(l: (...args: any[]) => TODO): void
  onDidStopChanging(l: () => TODO): void
  getText(): string
  emitWillChangeTextEvent(): void
  setText(s: string): void
}
export interface EditorOptions extends TextareaOptions {
  language?: string
  text?: string
}
export function buildEditor(options: EditorOptions) {
  const editor = new Editor(options)
  editor.textBuf.setText(options.text || '')
  editor.language(options.language || 'js')
  setTimeout(() => {
    editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
  }, 100)
  return editor
}
