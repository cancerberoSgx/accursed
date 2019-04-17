import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { installCollapsible, toggleCollapsed, uninstallCollapsible } from '../../src/blessed/collapsible'
import { renderer } from '../../src/blessed/layoutRenderer'
import { installExitKeys, onValueChange } from '../../src/blessed/util'
import { BoxOptions, Textarea, TextareaOptions, isElement, Button } from '../../src/blessedTypes'
import { React, Div, findChildren, Br, filterChildren, Component } from '../../src';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
import { waitForRender } from '../../src/blessed/waitFor';

test();

export const opts = () =>  ({
    keys: true,

    mouse: true,
    clickable: true,
    tags: true,
    focusable: true,
    draggable: true,
    input: true,
    inputOnFocus: true,
    keyable: true,
    vi: true,
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
          type: 'line',
          fg: 'red'
        }
      },
      selected: {
        border: {
          type: 'line',
          fg: 'blue'
        },
        fg: 'black',
        bg: 'magenta'
      },
      hover: {
        bg: 'lightgray'
      }
    }
  } as BoxOptions)

function test() {
  
  
  const screen = blessed.screen({
    useBCE: true, 
    
    // smartCSR: true, 
    log: 'log.txt',
     focusable: true , 
    //  autoPadding: true
  })
  installExitKeys(screen);
  screen.render();
  
  // screen.log("hello")
  
  const ref1 = React.createRef<Button>()
  // await waitForRender()
  setTimeout(()=>{
    screen.log("setTimeout",!ref1.current)
    ref1.current!.content="'PUTUTUTU"
    ref1.current!.screen.render()
    ref1.current!.press()
  }, 3000)

  const app = <Div {...opts} width="100%" border="line"  height="100%" parent={screen} style={{bg: 'red'}}>

  <button {...opts} ref={ref1} top="80%" left="80%"content="button11" onClick={e=>{e.currentTarget.content="clicked!"; e.currentTarget.screen.render()}}></button>
    <Br />
hlkajsdf k
<Br/>

    <textarea  {...  {
  tags: true,
  // focusable: true,
  // mouse: true,
  // clickable: true
}}
   width={'38%'} height={'29%'} bottom="5%"
   inputOnFocus={true} content="some code here"></textarea>
   <Br/>
    <textbox  {...{
  width: '44%',
  height: '20%',
  right:"5%",
  // tags: true,
  // mouse: true,focusable: true,
  clickable: true}} border="line" width={12} height={11} 
  // top={12} left={23} 
  inputOnFocus={true} 
  content="some code here"> </textbox>
<Br/>


    <button {...opts} content="Eval" border="line" onClick={e => {
      const ta = findChildren<Textarea>(e.currentTarget.parent as any, e => e.type === 'textarea');
      const o = filterChildren<Textarea>(e.currentTarget.parent as any, e => isElement(e) && e.name === 'output');
    } }></button>
      </Div>
try {
  const d = React.render(app)
  screen.append(d)
  screen.key('tab', k => screen.focusNext())
  screen.key('S-tab', k => screen.focusPrevious())
  screen.render()
} catch (error) {
  screen && screen.log(error)
}
}



  //     function useRef<T>(initialValue: T): MutableRefObject<T>;
// function createRef<T>(): RefObject<T>;
// export interface MutableRefObject<T> {
//   current:  
// }
// ref: Ref<T>|undefined

// export interface RefAttributes<T> extends Attributes {
//   ref?: Ref<T>
// }

// type Ref<T> = { bivarianceHack(instance: T | null): void }['bivarianceHack'] | RefObject<T> | null
// type LegacyRef<T> = string | Ref<T>
// Usage
// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.myRef = React.createRef();
//   }
//   render() {
//     return <div ref={this.myRef} />;
//   }
// }


// interface RefObject<T>{
//   current: T|undefined
// }
// class RefObjectImpl<T>{
//   current: T|undefined
// }
// function createRef<T>(): RefObject<T>{
  // return {
    // current
//   // }  C
// }C