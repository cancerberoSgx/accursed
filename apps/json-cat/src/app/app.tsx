import {
  Br,
  Button2,
  Component,
  Div,
  Element,
  EventOptions,
  React,
  RefObject,
  tree as createTree,
  ShowIf,
  visitTreeNodes,
  TreeView
} from 'accursed'
import * as contrib from 'blessed-contrib'
import { focusable, textBox } from './styles';
import { debug } from 'util';
import { AppManager } from '../manager/AppManager';

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
  manager: AppManager
}

export class App extends Component<P, {}> {
  constructor(p:P, s: any){
    super(p, s)
    this.props.manager.on(this.props.manager.JSON_LOADED, e=>setTimeout(() => {
      this.treeLoaded(false)
    }, 800))
  }
  root: RefObject<Element> = React.createRef<Element>()
  treeElement: RefObject<TreeView> = React.createRef<TreeView>(current =>
    setTimeout(() => {
      this.props.ready()
    }, 400)
  )
  protected treeLoaded(b: boolean){
  }

  render() {
    return (
      <Div ref={this.root}>
        <Div height={4}>
          Search Filter Text: 
          <textbox {...textBox()} hoverText="filter nodes by text" value="search" onChange={e=>this.filterByText(e.value)}/>
          Select (CSS4): <textbox {...textBox()} value="people.$*.email" />
        </Div>
        <Div height="75%" >
        <ShowIf onUpdate={fn => this.treeLoaded = fn}>
        Loading...
        </ShowIf>
        <treeview
        fg="green"
            ref={this.treeElement}
      keyable={true}
            rootNodes={[{name: 'test', children: []}]}
            focusable={true}
            focused={true}
            height="100%"
            width="100%"//{30}
            // mouse={true}
            clickable={true}
            style={{
              bg: 'black',
              fg: 'white',
              focusedNode: {
                bg: 'green',
                fg: 'black'
              }
            }}
            />
          {/* <contribTree
            fg="green"
            ref={this.treeElement}
            focusable={true}
            height="100%"
            mouse={true}
            clickable={true}
          /> */}
        </Div>
      </Div>
    )
  }
  filterByText(value: any): void {
    // visitTreeNodes( this.tree.data,node=>{
    //   if(node.name&&!node.name.toLowerCase().includes(value.toLowerCase())){
    //     node.name=''
    //   }
    // })
    // this.tree.setData(this.tree.data)
    this.tree.toggleNodeHide(n=>n.name.toLowerCase().includes(value.toLowerCase()))
    this.tree.screen.render()
  }
  get tree() {
    return this.treeElement.current!
  }
}
