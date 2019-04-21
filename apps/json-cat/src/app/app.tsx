import {
  Br,
  Button2,
  ButtonOptions,
  Component,
  Div,
  Element,
  EventOptions,
  React,
  RefObject,
  TextboxOptions,
  tree as createTree
} from 'accursed'
import * as contrib from 'blessed-contrib'

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
  // root(): Element {
  //   throw new Error('Method not implemented.');
  // }
  root: RefObject<Element> = React.createRef<Element>()
  treeElement: RefObject<contrib.Widgets.TreeElement> = React.createRef<contrib.Widgets.TreeElement>(current =>
    setTimeout(() => {
      this.props.ready()
    }, 400)
  )

  render() {
    return (
      <Div ref={this.root}>
        helllo
        {/* <Div height="25%" top="0%"> */}
        <Br />
        <Button2 {...focusable()} onClick={e => {}}>
          click
        </Button2>
        Search Filter Text: <textbox {...textBox()} value="search" />
        Select (CSS4): <textbox {...textBox()} value="people.$*.email" />
        {/* <textbox value="search" /> Filter */}
        asdas dasd asd as d
        <Br />
        alsj khdjlakjs dlkajsdlkajsldka jsl dk
        <Br />
        asdasd asd asd asd asd ña skdñla ksñldk añlsd
        <contribTree
          ref={this.treeElement}
          bg="magenta"
          focusable={true}
          // top="30%"
          label="'json"
          style={{
            bg: 'black',
            border: {
              style: 'line',
              fg: 'green'
            }
            //  focus: {
            //    border: {fg: 'magenta'}}
            //}
          }}
          width="70%"
          border="line'"
          height="80%"
          mouse={true}
          clickable={true}
        />
        lj aslkdalksj dlka sd
        <Br />
        asdasd asd asd asd
        <Button2 onClick={e => {}}>click</Button2>
        asdasd asd asd asd asldkjls kdjflkas df
      </Div>
      //  </Div>

      // </Div>
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

const focusable: () => ButtonOptions = () => ({
  focusable: true,
  clickable: true,
  keys: true,
  mouse: true,
  keyable: true,
  border: 'line',
  style: {
    border: {
      fg: 'blue'
    },
    hover: {
      fg: 'yellow'
    },
    focus: {
      bg: 'cyan',
      border: {
        type: 'line',
        fg: 'yellow'
      }
    },
    bg: 'darkgray',
    fg: 'blue'
  }
})
const textBox: () => TextboxOptions = () => ({
  ...focusable(),
  style: { ...focusable().style, bg: 'gray', border: { fg: 'magenta' } }
})
