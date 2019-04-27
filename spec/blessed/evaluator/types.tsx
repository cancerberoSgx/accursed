import { Element } from '../../../src';
import { TODO } from 'misc-utils-of-mine-typescript';
import { EventEmitter } from 'events';
var Range = require('text-buffer/lib/range');
let types;
export interface Range {
}
export interface IEditor extends EventEmitter {
  focus(): void;
  indent(range: Range): void;
  buffer: Element;
  render(): void;
  append(text: string, options?: TODO): TODO;
  _updateCursor(): void;
  _updateContent(): void;
  setLanguageMode(opts: {
    getLanguageId: () => string;
  }): void;
  open(p: string): Promise<IEditor>;
  save(p: string): Promise<string>;
  undo(options: TODO): TODO;
  redo(options: TODO): TODO;
  textBuf: TextBuffer;
  copy: TODO;
  paste: TODO;
  toggleInsertMode(): void;
  language(s: string): void;
  selection: TODO;
}
interface TextBuffer extends EventEmitter {
  emitDidChangeTextEvent(...args: TODO): TODO;
  getText(): string;
  emitWillChangeTextEvent(): void;
  setText(s: string): void;
}
