import { Point, Range } from 'text-buffer'
import { debug } from '..'
import { box } from '../'
import { ElementOptions, Node } from '../blessedTypes'
import { EventOptions, React, ref } from '../jsx'
import { EditorOptions, IEditor } from './editorWidgetTypes'
const Editor = require('editor-widget')

/**
 * Builds editor widget by calling its constructor as it is, without any tricks for auto-highlighting, focus
 * or bypass the required parent option. There's only a workaround to load option.text as string
 * [[options.text]]  but just that.
 *
 * Passing [[options.parent]] is mandatory here.
 *
 * For a higher level creator, see [[createEditor]] which allows to create the widget without passing
 * [[options.parent]] and will auto-highlight and focus the editor at startup.
 */
export function buildEditor(options: EditorOptions & { parent: Node }) {
  try {
    const editor = new Editor(options)
    if (options.text) {
      editor.textBuf.setText(options.text)
    }
    if (options.language) {
      editor.language(options.language)
    }
    return editor
  } catch (error) {
    debug(error)
    throw error
  }
}

interface CreateEditorOptions extends EditorOptions {
  /**
   * Dont execute the workaround to give initial syntax highlight and focus. Default: false.
   */
  disableSyntaxHighlighAtStartup?: boolean
  /**
   * the workaround to initially highlight and focus the editor has some trouble when the screen is being
   * rendered multiple times asynchronously. If that's the case the text could be missing or focus not enable,
   * and this timeout can be increased to solve the issue. Default value 300
   */
  waitBeforeHighlight?: number
}

/**
 * This creator function is a high level version of [[buildEditor]] that doesn't require to pass `parent`.
 * What it does is to create a box reference and after it renders it will use buildEditor to instantiate the
 * editor-widget.
 *
 * @returns the editor's parent BoxElement
 */
export function createEditor(options: CreateEditorOptions) {
  const parent = box({})
  let editor: IEditor
  try {
    editor = buildEditor({ ...options, parent })
    resolveRef(options, editor)
    if (!options.disableSyntaxHighlighAtStartup) {
      // TODO: when this happens, just pressing up or down keys solves it but I'm dont known how to emit them.
      setTimeout(() => {
        editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
      }, 700)
    }
  } catch (error) {
    debug(error)
    throw error
  }
  return parent
}

/**
 * This creator function is a high level version of [[buildEditor]] that doesn't require to pass `parent`.
 * What it does is to create a box reference and after it renders it will use buildEditor to instantiate the
 * editor-widget.
 *
 */
export function createEditorAsync(options: CreateEditorOptions): Promise<IEditor> {
  return new Promise((resolve, fail) => {
    try {
      debug('createEditorAsync', options.ref)
      createEditor({
        ...options,
        ref: ref<IEditor>(c => {
          debug('createEditorAsync', !!c, options.ref)
          resolveRef(options, c)
          resolve(c)
        })
      })
    } catch (error) {
      debug(error)
      fail(error)
      throw error
    }
  })
}

export function isEditorWidget(n: Node): n is IEditor {
  return n && (n as any).moveCursorHorizontal && (n as any).lineWithEndingForRow
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

function resolveRef(options: ElementOptions, current: any) {
  try {
    if (options.ref) {
      options.ref.current = current
      if (options.ref.callback) {
        options.ref.callback(current)
      }
    }
  } catch (error) {
    debug(error)
    throw error
  }
}
