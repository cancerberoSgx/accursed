import { Box, installExitKeys, isElement, Div, React, Screen, prompt, Columns, Column, Br, Rows, Row, Component, TextareaOptions, debug, Textarea, showInModal, TabPanel, Tab, TabBody, TabLabel, closeModal, Strong, AutoComplete, SelectOption, Select } from '../../../src';
import { inspect } from 'util';
import { waitFor } from '../../../src/blessed/waitFor';
import * as accursed from '../../../src';
import { enumNoValueKeys, enumKeys } from 'misc-utils-of-mine-generic';
import { examples } from './examples';
import { IEditor, Range } from './types';
const Editor = require('editor-widget')
var Point = require('text-buffer/lib/point');
var Range = require('text-buffer/lib/range');

enum Action {
  'Select All'='Select All',
  'Format'='Format',
  'Settings'='Settings',
  'Exit'='Exit',
  'Help'='Help',
  'Execute'='Execute',
  'Save as'='Save as',
  }

const focusableOpts: () => TextareaOptions = () => ({
  mouse: true,
  keys: true,
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
    },
  }
})
interface P {
  parent: Screen
}
export class App extends Component<P> {
  outputEl: Box;
  editor: IEditor;
  logEl: Box;
  editorContainer: Box;
  errorsEl: accursed.Widgets.BoxElement;
  outputPanel: TabPanel;
  render() {
    setTimeout(() => {
      this.afterRender()
    }, 10);
    return <Div parent={this.props.parent}>
      <Columns>
        <Column width="50%">
          <Rows>
            <Row height="60%">
              <box width="100%" height="100%" label="Core editor" border="line" focusable={true} ref={React.createRef<Box>(c => this.editorContainer = c)}></box>
              Code Editor<Br />
            </Row>
              <Row height="40%">
              <button {...focusableOpts()} name="execute-button" content="Execute" onPress={e => this.action(Action.Execute)}></button>
              <button {...focusableOpts()} name="exit-button" content="Exit" onPress={e => this.action(Action.Exit)}></button>
              <button {...focusableOpts()} name="help-button" content="Help" onPress={e => this.action(Action.Help)}></button>
              <checkbox content="clear output before execute?"></checkbox>
              <Br/>
            <Select  {...focusableOpts()}  height={4}   onSelect={e => this.setExample(e.value)}>
            {examples.map(e=><SelectOption>{e.name}</SelectOption>)}
            {}
            </Select>
            <Br/>
              <AutoComplete height={5} {...focusableOpts()} onChange={e => this.action(e.value)} options={enumKeys(Action)}/>
              <Br />
            </Row>{}
          </Rows>
        </Column>
        <Column width="50%">
          <Rows>
            <Row height="70%">
              <box width="100%" height="100%" label="Output" border="line" ref={React.createRef<Box>(c => this.outputEl = c)}></box>
            </Row>
            <Row height="30%">
              <TabPanel ref={React.createRef<TabPanel>(c => this.outputPanel = c)}>
                <Tab active={true}>
                  <TabLabel {...focusableOpts()}>Log</TabLabel>
                  <TabBody>
                    <box width="100%" height="100%" label="Log" border="line" ref={React.createRef<Box>(c => this.logEl = c)}></box>
                  </TabBody>{}
                </Tab>
                <Tab>
                  <TabLabel {...focusableOpts()}>Errors</TabLabel>
                  <TabBody>
                    <box width="100%" height="100%" label="Errors" border="line" ref={React.createRef<Box>(c => this.errorsEl = c)}></box>
                  </TabBody>{}
                </Tab>{}
              </TabPanel>{}
            </Row>{}
          </Rows>
        </Column>
        {} 
      </Columns>
    </Div>
  }
  
  setExample(value: any): void {
    const code = examples.find(e=>e.name===value).code
    this.editor.textBuf.setText(code)
      this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
      this.screen.render()
  }

  action(action: Action): void {
    if (action === Action.Execute) {
      return this.execute()
    }
    else if (action === Action.Exit) {
      this.screen.destroy()
      process.exit(0)
    }
    else if (action === Action.Help) {
      this.help()
    }
    this.screen.render()
  }

  help(): void {
    showInModal(this.screen, React.render(<Div>
      <Br />
      <Strong>Welcome to blessed Evaluator</Strong>
      <Br /><Br />
      <button {...focusableOpts()} content="Close This Modal" onPress={e => closeModal(this.screen)}></button> <Br /><Br />
      The idea is to edit JS or JSX code in the editor, execute it and see the blessed elements right next.
      <Strong> 	Keys: </Strong><Br />
      * control-right - control-left to focus controls and press enter to click buttons <Br />
      * you can use the mouse both in and outside the editor <Br />
      * the editor is similar to sublime/vscode  <Br />
      * control-c control-v to copy and paste <Br />
      * you can select with the mouse <Br />
      * control-z control-y to undo and redo <Br />
      <Br />
      <button {...focusableOpts()} content="Close This Modal" onPress={e => closeModal(this.screen)}></button>
    </Div>))
  }

  execute(): void {
    const _log = []
    const options = { // DONT REMOVE: will be evaluated!
      parent: this.outputEl,
      accursed,
      log(...args: any[]) {
        _log.push(...args.map(a => inspect(a)))
      }
    }
    let error:any
    const text = this.editor.textBuf.getText()
    const code = `
    (
    ${text}
    )(options)`
    try {
      eval(code)
    } catch (ex) {
      debug(ex)
      error = ex
    }
    this.logEl.content = _log.join('\n')
    if(error){
      this.errorsEl.content = inspect(error, error.stack)
      this.outputPanel.selectTab(1)
    }
    else {
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
      keyable: true,
    })
    this.editor.textBuf.setText(examples[0].code)
    this.editor.language('js')
    this.editor.once('focus', e => {
      this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
    })
    this.editorContainer.screen.render()
  }
}


