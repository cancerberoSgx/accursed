import { question } from 'blessed'
import { Point, Range } from 'text-buffer'
import { debug, EditorBindingsOptions, EditorGutterStyle, EditorOptions, EditorPerf, EditorStyle, IEditor } from '..'
import { box } from '../'
import { Element, Node, Screen } from '../blessedTypes'
import { EventOptions, React, ref } from '../jsx'
import { resolveRef } from '../jsx/createElement'
import { focusableOpts } from '../util/sharedOptions'
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
 */
export function createEditorAsync(options: CreateEditorOptions): Promise<IEditor> {
  return new Promise((resolve, fail) => {
    try {
      createEditor({
        ...options,
        ref: ref<IEditor>(c => {
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

React.addIntrinsicElementConstructors({ editor: createEditor })

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      editor: OptionsProps<EditorOptions> & EventOptions<IEditor>
    }
  }
}

export const editorBindings: EditorBindingsOptions = {
  goLeft: ['left'],
  goLeftWord: ['C-left', 'M-left', '\u001b\u001b[D', 'M-b', 'M-S-b'],
  goLeftInfinity: ['home'],
  goRight: ['right'],
  goRightWord: ['C-right', 'M-right', '\u001b\u001b[C', 'M-f', 'M-S-f'],
  goRightInfinity: ['end', 'C-e'],
  goUpParagraph: ['C-up', 'M-{', 'M-up', '\u001b\u001b[A'],
  goUp: ['up'],
  goUpPage: ['pageup'],
  goUpInfinity: ['C-home', 'M-home', 'M-<'],
  goDownParagraph: ['\u001b\u001b[B', 'C-down', 'M-down', 'M-}'],
  goDown: ['down'],
  goDownPage: ['pagedown'],
  goDownInfinity: ['C-end', 'M-end', 'M->'],
  goMatchingBracket: ['C-m', 'C-]', '\u001d'],
  selectAll: ['C-a'],
  selectLeft: ['S-left'],
  selectLeftWord: ['C-S-left', 'M-S-left'],
  selectLeftInfinity: ['S-home'],
  selectRight: ['S-right'],
  selectRightWord: ['C-S-right', 'M-S-right'],
  selectRightInfinity: ['S-end'],
  selectUp: ['S-up'],
  selectUpParagraph: ['C-S-up', 'M-S-up'],
  selectUpPage: ['S-pageup'],
  selectUpInfinity: ['C-S-home', 'M-S-home'],
  selectDown: ['S-down'],
  selectDownParagraph: ['C-S-down', 'M-S-down'],
  selectDownPage: ['S-pagedown'],
  selectDownInfinity: ['C-S-end', 'M-S-end'],
  selectMatchingBracket: ['C-S-m'],
  deleteLeft: ['backspace'],
  deleteRight: ['delete'],
  deleteLeftWord: ['C-backspace', 'M-backspace', 'C-d', 'M-delete'],
  deleteRightWord: ['C-delete', 'M-d'],
  deleteLeftInfinity: ['C-S-backspace', 'M-S-backspace'],
  deleteRightInfinity: ['C-S-delete', 'M-S-delete'],
  deleteLine: ['C-k'],
  duplicateLine: ['C-b'],
  indent: ['tab', 'C-tab'],
  dedent: ['S-tab'],
  undo: ['C-z'],
  redo: ['C-y'],
  copy: ['C-c'],
  cut: ['C-x'],
  paste: ['C-v'],
  toggleInsertMode: ['insert'],
  focusNext: false,
  focusPrev: false
}

export const editorStyle: EditorStyle = {
  selection: '{lightgray-bg}{black-fg}{bold}',
  match: '{yellow-bg}',
  matchingBracket: '{green-bg}{bold}',
  mismatchedBracket: '{red-bg}{bold}',
  whiteSpace: '{blue-fg}',
  keyword: '{red-fg}',
  built_in: '{yellow-fg}',
  preprocessor: '{red-fg}',
  title: '{underline}',
  params: '{yellow-fg}',
  class: '{yellow-fg}',
  function: '{yellow-fg}',
  decorator: '{bold}',
  shebang: '{yellow-bg}{black-fg}',
  variable: '{yellow-fg}',
  operator: '{green-fg}',
  subst: '',
  number: '{green-fg}{bold}',
  string: '{green-fg}{bold}',
  regexp: '{green-fg}{bold}',
  literal: '{green-fg}{bold}',
  comment: '{gray-fg}',
  header: '{bold}',
  strong: '{bold}',
  code: '{green-fg}',
  link_label: '',
  link_url: '{yellow-fg}',
  bullet: '{magenta-fg}',
  attribute: '{yellow-fg}',
  value: '{green-fg}{bold}',
  setting: '',
  label: '',
  symbol: '{red-fg}',
  constant: '{yellow-fg}'
}
export const editorGutterStyle: EditorGutterStyle = {
  bg: 'blue',
  currentLine: '{white-bg}{black-fg}{bold}'
}

export const editorPerf: EditorPerf = {
  matchesRenderThrottle: 150,
  updateContentThrottle: 16
}

/**
 * Install exit keys in given screen, considering EditorWidget. tab/S-tab will switch focus only if current
 * focused element is not a EditorWidget. If focused element is EditorWidget, 'C-S-tab', 'escape' can be used
 * to focus next element. Finally, exit keys 'C-q', 'q', 'Q', 'C-c' can be used, if current focused element is
 * not a EditorWidget and it will ask the user to confirm the action.
 */
export function installFocusAndExitKeysForEditorWidget(screen: Screen) {
  screen.key(['C-q'], k => {
    if (!isEditorWidget(screen.focused)) {
      screen.destroy()
      process.exit(0)
    }
  })
  screen.key(['q', 'Q', 'C-c'], k => {
    if (!isEditorWidget(screen.focused)) {
      const q = question({
        ...focusableOpts(),
        parent: screen
      }).ask('Do you really want to exit? (y/n)', (err, value) => {
        if (value) {
          screen.destroy()
          process.exit(0)
        } else {
          ;((q as any) as Element).hide()
          ;((q as any) as Element).detach()
          ;((q as any) as Element).destroy()
        }
      })
    }
  })
  screen.key(['C-S-tab', 'escape'], k => {
    if (isEditorWidget(screen.focused)) {
      screen.focusNext()
    }
  })
  screen.key('tab', k => {
    if (!isEditorWidget(screen.focused)) {
      screen.focusNext()
    }
  })
  screen.key('S-tab', k => {
    if (!isEditorWidget(screen.focused)) {
      screen.focusPrevious()
    }
  })
}
