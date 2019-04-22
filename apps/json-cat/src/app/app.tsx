import {
  Br,
  Button2,
  Component,
  Div,
  Element,
  EventOptions,
  React,
  RefObject,
  tree as createTree
} from 'accursed'
import * as contrib from 'blessed-contrib'
import { focusable, textBox } from './styles';
import { debug } from 'util';

let uiSetup
export type RemoveProperties<O, K extends keyof O> = Pick<O, Exclude<keyof O, K>>

React.addIntrinsicElementConstructors({ contribTree: createTree })

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      contribTree: OptionsProps<contrib.Widgets.TreeOptions> &
      EventOptions<contrib.Widgets.TreeElement<RemoveProperties<contrib.Widgets.TreeOptions, 'children'>>>
    }
  }
}

interface P {
  ready(): void
}

export class App extends Component<P, {}> {
  root: RefObject<Element> = React.createRef<Element>()
  treeElement: RefObject<contrib.Widgets.TreeElement> = React.createRef<contrib.Widgets.TreeElement>(current =>
    setTimeout(() => {
      this.props.ready()
    }, 400)
  )

  render() {
    return (
      <Div ref={this.root}>

        <Div height={8}>
          Search Filter Text: <textbox {...textBox()} hoverText="filter nodes by text" value="search" />
          Select (CSS4): <textbox {...textBox()} value="people.$*.email" />
        </Div>

        <Div height="75%" >

          <contribTree
            fg="green"
            // padding={2}
            // on={['focus', (e: any)=>{
            //   debug('foccc')
            // }]}
            // lineNbr={3}
            ref={this.treeElement}
            // bg="magenta"
            focusable={true}
            // top="30%"
            // border='line'
            // label="'json"
            // style={{
            //      fg: 'green',
            //   bg: 'black',
            //   border: {
            //     bg: 'yellow ',
            //   },
            //   //   // type: 'line',
            //   //   fg: 'green'
            //   // },
            //   //  focus: {
            //     //  bg: 'magenta',
            //     //  fg: 'green',
            //   //    border: {fg: 'magenta'
            // // }}
            //   }
            // }
            // width="70%"
            // border="line'"
            height="80%"
            mouse={true}
            clickable={true}
          />
          {/* lj aslkdalksj dlka sd
        <Br />
        asdasd asd asd asd
        <Button2 onClick={e => {}}>click</Button2>
        asdasd asd asd asd asldkjls kdjflkas df */}
        </Div>

      </Div>
      //   <Br/>
      // <Div
      // top="33%"
      //   height="70%"
      //   name="treeContainer"
      //   style={{
      //     bg: 'red'
      //   }}>
      //   <Br/>
      //   hello

      //    by by

      //    <Br/>
      //    asdasd
      // </Div>
      //  }
    )
  }
  // }
  get tree() {
    return this.treeElement.current!
  }
}


