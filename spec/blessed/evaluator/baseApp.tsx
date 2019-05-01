import * as blessed from 'blessed'
import { readFileSync, writeFileSync } from 'fs'
import { inspect } from 'util'
import * as accursed from '../../../src'
import {
  Box,
  Button,
  cleanNode,
  Component,
  debug,
  Element,
  isMaximized,
  Screen,
  setMaximized,
  TabPanel
} from '../../../src'
import { waitFor } from '../../../src/blessed/waitFor'
import { buildEditor } from '../../../src/editorWidget/editorWidget'
import { IEditor } from '../../../src/editorWidget/editorWidgetTypes'
import { focusableOpts } from '../../../src/util/sharedOptions'
import { examples } from './examples'
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

interface P {
  parent: Screen
}

interface S {
  autoExecute?: boolean
  cleanOutputBeforeExecute?: boolean
}

export abstract class BaseApp extends Component<P, S> {
  outputEl: Box
  editor: IEditor
  logEl: Box
  editorContainer: Box

  protected settingsEditorContainer: Box
  protected settingsEditor: IEditor

  errorsEl: accursed.Widgets.BoxElement
  outputPanel: TabPanel
  state: S = { cleanOutputBeforeExecute: true, autoExecute: true }
  private readonly EDITOR_SETTINGS_INI_PATH = 'node_modules/editor-widget/editor-widget.ini'

  protected setState(s: Partial<S>) {
    this.state = { ...this.state, ...s }
  }

  protected abstract help()

  setExample(exampleName: string): void {
    const code = examples.find(e => e.name === exampleName).code
    this.editor.textBuf.setText(code)
    this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
  }

  dispatch(action: Action): void {
    try {
      if (action === Action.Execute) {
        this.execute()
      } else if (action === Action.Exit) {
        this.screen.destroy()
        process.exit(0)
      } else if (action === Action.Help) {
        this.help()
      } else if (action === Action.Settings) {
        this.editorSettings()
      }
      this.screen.render()
    } catch (error) {
      debug('Error dispatching ' + action, error)
    }
  }

  async editorSettings() {
    this.editorSettingsModal({
      onSave: () => {
        const text = this.settingsEditor.textBuf.getText()
        if (!text.trim()) {
          return // TODO; comes a second time
        }
        debug(text, typeof text)
        writeFileSync(this.EDITOR_SETTINGS_INI_PATH, text + ' ')
      }
    })

    await waitFor(() => this.settingsEditorContainer)

    this.settingsEditor = buildEditor({
      ...focusableOpts(),
      parent: this.settingsEditorContainer,
      text: readFileSync(this.EDITOR_SETTINGS_INI_PATH).toString(),
      language: 'ini',
      keys: true,
      keyable: true
    })
  }
  abstract editorSettingsModal(props: { onSave: () => void }): void

  async execute(): Promise<any> {
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
    let result: any
    const code = `
    (${text})(options)`
    try {
      result = eval(code)
    } catch (ex) {
      debug(ex)
      error = ex
    }
    await result
    this.logEl.content = _log.join('\n')
    this.logEl.setScrollPerc(100)
    if (error) {
      this.errorsEl.content = inspect(error, error.stack)
      this.outputPanel.selectTab(1)
    } else {
      this.outputPanel.selectTab(0)
      this.errorsEl.content = ''
    }
    this.screen.render()
  }

  async afterRender() {
    await waitFor(() => this.editorContainer)
    this.editor = buildEditor({
      parent: this.editorContainer,
      ...focusableOpts(),
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      keys: true,
      keyable: true,
      language: 'js',
      text: examples[0].code
    })
    this.editor.focus()
    this.editor.textBuf.onDidStopChanging(() => {
      if (this.state.autoExecute) {
        this.dispatch(Action.Execute)
      }
    })
    this.editor.setBack()
    this.screen.render()
  }
  toggleMaximized(container: Element, btn: Button, label?: string) {
    setMaximized(container, !isMaximized(container), { auto: false })
    btn.content = (isMaximized(container) ? 'Restore' : 'Maximize') + (label ? ' ' + label : '')
    container.screen.render()
  }
}
