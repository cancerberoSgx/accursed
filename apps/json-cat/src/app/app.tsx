import { Component, Div, Element, debug, EventOptions, React, RefObject, ShowIf, tree as createTree, TreeView, AutoComplete, Textbox, List, Columns, Column, Br, Layout, Text, TreeViewNode, textbox } from 'accursed'
import * as contrib from 'blessed-contrib'
import { AppManager } from '../manager/AppManager'
import { textBox } from './styles'
import { notSameNotFalsy, Falsy, NotFalsy } from '../util';
import { TNode } from '../types';

declare interface Ptr {
  list(data:any, fragments: true): {
    fragmentId: string,
    value: any
  }[]
  list(data:any, fragments: false): {
    pointer: string
    value: any
  }[]
}
const ptr : Ptr = require('json-ptr')

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

  protected autoCompleteList = React.createRef<List>()
  // protected filterContainer: Layout = undefined as any
  protected textFilterInput: Textbox = undefined as any
  protected nodePath:  Text = null as any
  protected nodeText:  Text = null as any
  protected includeValuesInTextSearch: boolean=false
  protected textSearchQuery: string = null as any
  
  constructor(p: P, s: any) {
    super(p, s)
    this.props.manager.on(this.props.manager.JSON_LOADED, data =>
      {
        setTimeout(() => {
          try {
            const selectors = ptr.list(data, false).map(d=>
            // d.fragmentId
            d.pointer
            )
              this.autoCompleteList.current!.setItems(selectors)
          } catch (error) {
            debug(error)
          }          
          this.treeLoaded(false)
      }, 100)
    }
    )
  }

  root: RefObject<Element> = React.createRef<Element>()
  
  treeElement: RefObject<TreeView<TNode>> = React.createRef<TreeView<TNode>>(current =>
    setTimeout(() => {
      this.props.ready()
    }, 100)
  )
  
  protected treeLoaded(b: boolean) {}

  render() {
    return (
      <Div ref={this.root}>
         <Div height="70%" width="100%">
          {/* <ShowIf onUpdate={fn => (this.treeLoaded = fn)}>Loading...</ShowIf> */}
          <treeview<TNode> 
            fg="green"
            ref={this.treeElement}
            keyable={true}
            rootNodes={[{ name: 'test', children: [] }]}
            focusable={true}
            focused={true}
            height="100%"
            width="70%"
            clickable={true}
            style={{
              bg: 'black',
              fg: 'white',
              focusedNode: {
                bg: 'green',
                fg: 'black'
              }
            }}
            onNodeFocus={(node)=>{
              this.nodePath.content = node.path
              this.nodeText.content = JSON.stringify((node as any).node, null, 2)
            }}
          />
        <Div border="line" width="30%"label="node text" height="100%" focusable={true} scrollable={true} clickable={true} keyable={true} ref={React.createRef<Text>(current=>this.nodeText = current!)} style={{...textBox().style}} content="" {...{
  scrollable: true,
  mouse: true,
  keys: true,
  alwaysScroll: true,}}></Div>
        </Div>
        <Div  height="10%" width="100%" >
        <text border="line" label="node path" ref={React.createRef<Text>(current=>this.nodePath = current!)} content=""></text>
        </Div>
      <Columns
      //  ref={React.createRef<Layout>(current => this.filterContainer = current!)} 
       height="20%" width="100%" 
       >
      <Column width="40%" height="100%" border="line">
      <Div>
      Filter By text:
      <Br/>
      <Br/>
      <checkbox border="line" label="test" checked={this.includeValuesInTextSearch} content="Include values?" onChange={e=>{
            this.includeValuesInTextSearch = e.value
             this.filterByText()
          }}/>
          <Br/>
          <Br/>
          <textbox
            {...textBox()}
            ref={React.createRef<Textbox>(current => this.textFilterInput = current!)}
            hoverText="filter nodes by text"
            value="search"
            label="Filter Text"
            on={['focus', (e:any)=>{this.textFilterInput!.setHover('hello')}]}
            onChange={e => {this.textSearchQuery = e.value; this.filterByText()}}
          />
      </Div>
     
      </Column>
      <Column  width="40%">
      <AutoComplete
       width="100%" 
      listOptions={{ref: this.autoCompleteList, width: '100%', border: 'line', style: {bg: 'lightgray', fg: 'black'}}} inputOptions={{...textBox(), width: '100%' ,height: 3, label: 'Select (JSON Pointer)'} } border={undefined} hoverText="Select using JSON-Pointer" value="people.$*.email" options={[]} style={{}}/>
      </Column>
      {}     
    </Columns>
      </Div>
    )
  }
  filterByText(): void {
    const v = this.textSearchQuery.toLowerCase()
    this.tree.toggleNodeHide(n =>( (this.includeValuesInTextSearch ? JSON.stringify((n as TNode).node) + ' ': '') + n.name).toLowerCase().includes(v))
    this.tree.screen.render()
  }
  get tree() {
    return this.treeElement.current!
  }
}
