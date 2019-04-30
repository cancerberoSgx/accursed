import { EventEmitter } from 'events';
import { TODO } from 'misc-utils-of-mine-typescript';
import { debug, Element, Textarea, TextareaOptions } from '..';
import { React, EventOptions } from '../jsx';
import { box } from '../';
import { Box } from '../';
import {Marker, Range, Point, TextBuffer } from 'text-buffer'
const Editor = require('editor-widget')

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

export interface EditorOptions extends TextareaOptions {
  language?: string
  text?: string
  defaultEncoding?: string
  multiLine?: boolean
}
/**
 * The Buffer visual concept represent the editor area and has these settings:
 */
interface BufferOptions{
  useSpaces?: boolean
  tabSize?: number
}

export interface IEditor extends Textarea {
  focus(): void

  indent(range: Range): void
  buffer: Element
  focus(): void
  _updateCursor(): void
  _updateContent(): void
  _getTabString(): string
  setLanguageMode(opts: { getLanguageId: () => string }): void
  open(p: string): Promise<IEditor>
  save(p: string): Promise<string>
  undo(options: TODO): TODO
  redo(options: TODO): TODO
  indent(range: Range, dedent?: boolean) : this
  textBuf: TextBuffer

  /**
   * Copies current selected text to system clipboard
   */
  copy(): Promise<this>
  /**
   * Pastes current system clipboard content into current cursor range, possible replacing selected text if any
   */
  pageXOffset(): Promise<this>

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

/**
 * 
 * Builds editor widget by calling its constructor as it is, without any tricks for auto-highlighting, focus or bypass the required parent option. There's only a workaround to load option.text as string [[options.text]]  but just that. 
 * 
 * Passing [[options.parent]] is mandatory here. 
 *  
 * For a higher level creator, see [[createEditor]] which allows to create the widget without passing [[options.parent]] and will auto-highlight and focus the editor at startup. 
 */
export function buildEditor(options: EditorOptions&{parent: Element|Screen}) {
  try {
    const editor = new Editor(options)
    if(options.text){
      editor.textBuf.setText(options.text )
    }
    if(options.language){
      editor.language(options.language)
    }
  return editor
  } catch (error) {
    debug(error)
    throw error
  }
}

interface CreateEditorOptions extends EditorOptions{
  disableSyntaxHighlighAtStartup?: boolean, 
  /** 
   * the workaround to initially highlight and focus the editor has some trouble when the screen is being
   * rendered multiple times asynchronously. If that's the case the text could be missing or focus not enable,
   * and this timeout can be increased to solve the issue. Default value 300 */
  waitBeforeHighlight?: number
}
/**
 * This creator function is a high level version of [[buildEditor]] that doesn't require to pass `parent`.
 * What it does is to create a box reference and after it renders it will use buildEditor to instantiate the editor-widget.
 * 
 */
export function createEditor(options: CreateEditorOptions) {
  return box({...options ,ref: React.createRef<Box>(c=>{
      const editor = buildEditor({...options, parent: c})
      
      if(!options.disableSyntaxHighlighAtStartup){
        // workaround to automatically syntax highlight and focus the editor 
        // setTimeout(() => {
        //   c.screen.emit('key', undefined, {name: 'up'})
        //   c.screen.emit('key up', undefined, {name: 'up'})
        // }, 300)
        setTimeout(() => {
          editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
        }, 700)
      }

    try {
      // support user's options.ref
  if(options.ref){
    if((options.ref as any).callback){
      (options.ref as any).callback(editor)
    }
    (options.ref as any).current = editor
  }  
  } catch (error) {
    debug(error)
  }
    // }, 2000);
//       ref: React.createRef(editor=>{

// if(options.ref){
//   (options.ref as any).callback (options.ref as any).callback(editor)
//   (options.ref as any).current = editor
// }
//     })})
    //TODO: support options.ref and pass the real widget
  })})
  // // debug(Object.keys(options))
  // const editor = new Editor(options)
  // editor.textBuf.setText(options.text || '')
  // editor.language(options.language || 'js')
  // setTimeout(() => {
  //   editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
  // }, 100)
  // return editor
}


export type RemoveProperties<O, K extends keyof O> = Pick<O, Exclude<keyof O, K>>

React.addIntrinsicElementConstructors({ editor: createEditor })

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      editor: OptionsProps<EditorOptions> & EventOptions<IEditor>
    }
  }
}


