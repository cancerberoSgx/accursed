import { Box, installExitKeys, Div, React, Screen, prompt, Columns, Column, createScreen, Element, Br, Rows, Row, Component, TextareaOptions, debug, Textarea } from '../../src';
import { inspect } from 'util';
import { waitFor } from '../../src/blessed/waitFor';
import * as accursed from '../../src';
import { TODO } from 'misc-utils-of-mine-typescript';
import { EventEmitter } from 'events';
import { renderer, isElement } from '../../dist/src';
import { sleep } from '../blessedTestUtil';
const Editor = require('editor-widget')

const focusableOpts: () => TextareaOptions = () => ({
  mouse: true,
  keys: true,
  focusable: true,
  clickable: true,
  // tags: true,
  // draggable: true,
  input: true,
  // inputOnFocus: true,
  keyable: true,
  // vi: true,
  border: 'line',
  style: {
    bg: 'gray',
    fg: 'white',
    border: {
      type: 'line',
      fg: 'cyan'
    },
    focus: {
      bg: 'lightgray',
      fg: 'black',
      border: {
        // type: 'line',
        fg: 'red'
      }
    },
  }
})
interface P {
  parent: Screen
}
class App extends Component<P> {
  outputEl: Box;
  editor: IEditor;
  logEl: Box;
  editorContainer: Box;
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
              {/* <textarea label="Blessed Code" {...focusableOpts()} focused={true} width="100%" height="100%" value={examples[0].code} ref={React.createRef<Textarea
      >(c=>this.editor=c)}></textarea> */}
            </Row>
            <Row height="40%">
              Actions<Br />
              <button {...focusableOpts()}  name="execute-button" content="execute" onPress={e => this.execute()}></button>
            </Row>{}
          </Rows>
        </Column>
        <Column width="50%">
          <Rows>
            <Row height="60%">
              <box width="100%" height="100%" label="Output" border="line" ref={React.createRef<Box>(c => this.outputEl = c)}></box>
            </Row>
            <Row height="40%">
              <box width="100%" height="100%" label="Log" border="line" ref={React.createRef<Box>(c => this.logEl = c)}></box>
            </Row>{}
          </Rows>
        </Column>
        {}
      </Columns>
    </Div>
  }
  execute(): void {
    // debug(this.editor, this.editor && this.editor.textBuf)
    const _log = []
    var options = {
      parent: this.outputEl,
      accursed,
      log(...args: any[]) {
        _log.push(...args.map(a => inspect(a)))
      }
    }
    const text = this.editor.textBuf.getText()
    // debug(text)
    const code = `
    (
    ${text}
    )(options)`
    try {
      eval(code)
    } catch (error) {
debug(error)
    }
  }
  async afterRender() {
    await waitFor(() => this.editorContainer)
    
    const executeButton = this.findDescendant(b=>isElement(b) && b.type==='button' && b.name==='execute-button')
    executeButton.focus()
    // const screen = blessed.screen({ smartCSR: true, title: 'editor-widget example' })
    this.editor = new Editor({
      // normal blessed widget, use like you would any other blessed element
      parent: this.editorContainer,
      // parent: this.screen,
      ...focusableOpts(),
      // focused: true,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      keys: true, 
      vi: true,
      keyable: true,

      // buffer: {
      //   bg: 'green ',
      //   focusable: true,
      //   focused: true,
      //   focus: { bg: 'green' },
      // },
      // bg: 'red',
      styles:{bg: 'red',
        buffer: {
          bg: 'green ',
          // focusable: true,
          // focused: true,
          focus: { bg: 'green' }
,

        },

      },
      // text: examples[0].code
    })

    // const changes = this.editor.append('sldkfjhsldkjflskdjf')
    // this.editor.setText( examples[0].code)
    // this.editor._updateCursor()
    // this.editor._updateContent()
    // this.editor.
    // this.editor.setLanguageMode({getLanguageId: ()=>'js'})
    // this.editor.textBuf.emitDidChangeTextEvent()
    // this.editorContainer.screen.render()
    // this.editor.buffer.focus()
    // this.editor.focus()
    // this.editor.render()
    // this.editorContainer.screen.render()
    
    
    // this.editor.textBuf.emitWillChangeTextEvent()
    this.editor.textBuf.setText(examples[0].code)
    this.editor.language('js')
    this.editor.toggleInsertMode()

    // this.screen.program.write('\n')
    // .emit('click', {})
    // await sleep(1000)
    // this.editor.textBuf.emitDidChangeTextEvent()
    // this.editorContainer.screen.emit('key down', undefined, {name: 'down'})
    // this.editorContainer.screen.emit('key enter', undefined, {name: 'enter'})
    // this.editor.emit('keypress', {name: 'a'}, {name: 'a'})
    this.editorContainer.screen.render()
    // this.editor.
  }
}


interface IEditor extends EventEmitter {
  focus():void
  buffer: Element
  render(): void
  append(text: string, options?: TODO): TODO
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
  toggleInsertMode():void
  
  language(s: string): void
  selection: TODO
}
/** */
interface TextBuffer extends EventEmitter {
  emitDidChangeTextEvent(...args: TODO): TODO
  getText(): string
  emitWillChangeTextEvent():void
  setText(s: string): void
  // buffer1.onDidChange(({changes}) => {
  //   for (const {oldRange, newText} of changes.reverse()) {
  //     buffer2.setTextInRange(oldRange, newText)
  //   }
  // })

  //   .getTextInRange({
  //   start: new Point(scroll.row, 0),
  //   end: scroll.translate(size)
  // })))
}
const examples = [
  {
    name: 'simple1',
    code: `
function simple1(options){
  options.log('starting')
  options.accursed.box({
    parent: options.parent,
    content: 'hello world'
  })
  options.parent.screen.render()
}
    `
  }
]
function start() {
  try {
    var screen = createScreen({
      // sendFocus: true, 
      smartCSR: true, title: 'editor-widget example'
      // , focusable: true,
      // tput: true
    })
    installExitKeys(screen)
    screen.key('tab', k => screen.focusNext())
    screen.key('S-tab', k => screen.focusPrevious())
    // main(screen)
    const app = React.render(<App parent={screen}></App>)
    // screen.append(app)
    // screen.focusNext()
    // screen.render()
    screen.render()
  } catch (error) {
    debug(error)

  }
}
start()


