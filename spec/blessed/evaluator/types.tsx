import { EventEmitter } from 'events'
import { TODO } from 'misc-utils-of-mine-typescript'
import { Element } from '../../../src'
var Range = require('text-buffer/lib/range')

export interface Range {}

export interface IEditor extends Element {
  focus(): void
  indent(range: Range): void
  buffer: Element
  // render(): void
  // append(text: string, options?: TODO): TODO
  // append(node: Node|string):void
  // append(...args: any[]):any
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
  onDidChange(l: (...args: any[])=>TODO ):void
  onDidStopChanging(l: ()=>TODO ):void
  getText(): string
  emitWillChangeTextEvent(): void
  setText(s: string): void
}
