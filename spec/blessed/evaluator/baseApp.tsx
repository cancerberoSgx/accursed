import * as blessed from 'blessed'
import { inspect } from 'util'
import * as accursed from '../../../src'
import {
  Box,
  Button,
  cleanNode,
  Component,
  debug,
  Element,
  isElement,
  isMaximized,
  Screen,
  setMaximized,
  TabPanel,
  TextareaOptions
} from '../../../src'
import { waitFor } from '../../../src/blessed/waitFor'
import { examples } from './examples'
import { IEditor, Range } from './types'
const Editor = require('editor-widget')
var Point = require('text-buffer/lib/point')
var Range = require('text-buffer/lib/range')

export enum Action {
  'Select All' = 'Select All',
  'Format' = 'Format',
  'Settings' = 'Settings',
  'Exit' = 'Exit',
  'Help' = 'Help',
  'Execute' = 'Execute',
  'Save as' = 'Save as'
}

export const focusableOpts: () => TextareaOptions = () => ({
  mouse: true,
  // keys: true,
  focusable: true,
  clickable: true,
  input: true,
  keyable: true,
  border: 'line',
  style: {
    bg: 'lightgray',
    fg: 'black',
    border: {
      type: 'line',
      fg: 'cyan'
    },
    focus: {
      fg: 'black',
      bg: '#507468',
      border: {
        fg: 'red'
      }
    }
  }
})
interface P {
  parent: Screen
}
interface S {
  cleanOutputBeforeExecute?: boolean
}

export abstract class BaseApp extends Component<P, S> {
  outputEl: Box
  editor: IEditor
  logEl: Box
  editorContainer: Box
  errorsEl: accursed.Widgets.BoxElement
  outputPanel: TabPanel

  protected abstract help()

  setExample(exampleName: string): void {
    const code = examples.find(e => e.name === exampleName).code
    this.editor.textBuf.setText(code)
    this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
    this.dispatch(Action.Execute)
    this.execute()
  }

  dispatch(action: Action): void {
    if (action === Action.Execute) {
      return this.execute()
    } else if (action === Action.Exit) {
      this.screen.destroy()
      process.exit(0)
    } else if (action === Action.Help) {
      this.help()
    }
    this.screen.render()
  }

  execute(): void {
    if (this.state.cleanOutputBeforeExecute) {
      cleanNode(this.outputEl)
    }
    const _log = []
    const options = {
      // DONT REMOVE this variable: will be evaluated!
      parent: this.outputEl,
      accursed,
      blessed,
      log(...args: any[]) {
        _log.push(...args.map(a => inspect(a)))
      }
    }
    let error: any
    const text = this.editor.textBuf.getText()
    const code = `
    (${text})(options)`
    try {
      eval(code)
    } catch (ex) {
      debug(ex)
      error = ex
    }
    this.logEl.content = _log.join('\n')
    if (error) {
      this.errorsEl.content = inspect(error, error.stack)
      this.outputPanel.selectTab(1)
    } else {
      this.outputPanel.selectTab(0)
    }
  }

  async afterRender() {
    await waitFor(() => this.editorContainer)
    const executeButton = this.findDescendant(b => isElement(b) && b.type === 'button' && b.name === 'execute-button')
    executeButton.focus()
    this.editor = new Editor({
      parent: this.editorContainer,
      ...focusableOpts(),
      top: 0,
      left: 0,
      width: '95%',
      height: '95%',
      keys: true,
      keyable: true
    })
    this.editor.textBuf.setText(examples[0].code)
    this.editor.language('js')
    this.editor.once('focus', e => {
      this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
    })
    this.editor.setBack()
    this.editorContainer.screen.render()
  }
}

export function toggleMaximized(container: Element, btn: Button, label?: string) {
  setMaximized(container, !isMaximized(container), { auto: false })
  btn.content = (isMaximized(container) ? 'Restore' : 'Maximize') + (label ? ' ' + label : '')
  container.screen.render()
}
