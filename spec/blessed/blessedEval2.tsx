import { Box, installExitKeys, Div, React, Screen, prompt, Columns, Column , createScreen, Br, Rows, Row, Component, TextareaOptions, Textarea} from '../../src';
import { debug, inspect } from 'util';
import { waitFor } from '../../src/blessed/waitFor';
import * as accursed from '../../src';

const focusableOpts:()=>TextareaOptions = ()=>({
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
interface P{
  parent: Screen
}
class App extends Component<P> {
  outputEl: Box;
  editor: Textarea;
  logEl: Box;
  render(){
    setTimeout(() => {
      this.afterRender()
    }, 10);
    return  <Div parent={this.props.parent}>
    <Columns>
    <Column width="50%">
    <Rows>
      <Row height="60%">
    Code Editor<Br/>
    <textarea label="Blessed Code" {...focusableOpts()} focused={true} width="100%" height="100%" value={examples[0].code} ref={React.createRef<Textarea
      >(c=>this.editor=c)}></textarea>
      </Row>  
      <Row height="40%">
   Actions<Br/>
  <button {...focusableOpts()} content="execute" onPress={e=>this.execute()}></button>
      </Row>{}
    </Rows>
    </Column>
    <Column width="50%">
    <Rows>
      <Row height="60%">  
      <box width="100%" height="100%" label="Output" border="line" ref={React.createRef<Box>(c=>this.outputEl=c)}></box>
      </Row>  
      <Row height="40%">
      <box width="100%" height="100%" label="Log" border="line" ref={React.createRef<Box>(c=>this.logEl=c)}></box>
      </Row>{}
    </Rows>
    </Column>
    {}
    </Columns>
    </Div>
  }
  execute(): void {
    const _log=[]
    var options = {
      parent: this.outputEl,
      accursed,
      log(...args: any[]){
        _log.push(...args.map(a=>inspect(a)))
      }
    }
    const code = `
    (
    ${this.editor.getValue()}
    )(options)`
    try {
      eval(code)
    } catch (error) {
      
    }
  }
  async afterRender() {
    await waitFor(()=>this.outputEl)
  }
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
function start(){
try {
  var screen = createScreen({
    sendFocus: true
    // , focusable: true
  })
  installExitKeys(screen)
  screen.key('tab', k => screen.focusNext())
  screen.key('S-tab', k => screen.focusPrevious())
  // main(screen)
  // screen.focusNext()
  screen.render()
  const app =React.render(<App parent={screen}></App>)
  screen.append(app)
screen.render()
} catch (error) {
  debug(error)

}
}
start()


