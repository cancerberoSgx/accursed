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
            ref={this.treeElement}
            focusable={true}
            height="80%"
            mouse={true}
            clickable={true}
          />
        </Div>
      </Div>
    )
  }
  get tree() {
    return this.treeElement.current!
  }
}
