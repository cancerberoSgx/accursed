import {
  AutoComplete,
  Br,
  Column,
  Columns,
  Component,
  debug,
  Div,
  EventOptions,
  List,
  React,
  RefObject,
  showInModal,
  Text,
  Textbox,
  tree as createTree,
  TreeView
} from 'accursed'
import * as contrib from 'blessed-contrib'
import { AppManager } from '../manager/AppManager'
import { TNode } from '../types'
import { containerOptions, focusable, textBox } from './styles'

declare interface Ptr {
  list(
    data: any,
    fragments: true
  ): {
    fragmentId: string
    value: any
  }[]
  list(
    data: any,
    fragments: false
  ): {
    pointer: string
    value: any
  }[]
  get(data: any, expr: string): any
}
const ptr: Ptr = require('json-ptr')

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
  protected nodePath: Text = null as any
  protected nodeText: Text = null as any
  protected includeValuesInTextSearch: boolean = false
  protected textSearchQuery: string = null as any
  protected json: any

  constructor(p: P, s: any) {
    super(p, s)
    this.props.manager.on(this.props.manager.JSON_LOADED, data => {
      this.json = data
      setTimeout(() => {
        try {
          const selectors = ptr.list(data, false).map(
            d =>
              // d.fragmentId
              d.pointer
          )
          this.autoCompleteList.current!.setItems(selectors)
        } catch (error) {
          debug(error)
        }
        this.treeLoaded(false)
      }, 100)
    })
  }

  // root: RefObject<Element> = React.createRef<Element>()

  treeElement: RefObject<TreeView<TNode>> = React.createRef<TreeView<TNode>>(current =>
    setTimeout(() => {
      this.props.ready()
    }, 100)
  )

  protected treeLoaded(b: boolean) {}

  render() {
    return (
      <Div
      // ref={this.root}
      >
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
            onNodeFocus={node => {
              this.nodePath.content = node.path
              this.nodeText.content = JSON.stringify((node as any).node, null, 2)
            }}
          />

          <Div width="30%" height="100%">
            <Div
              {...containerOptions()}
              height="30%"
              // width="100%"
              // border="line"
              label="Node Path (JSON-Pointer)"
              // style={{ ...containerOptions().style , label: {
              //   fg: 'green',
              //   // blink: true,
              //   transparent: true
              // }}}
            >
              <Br />
              <text
                ref={React.createRef<Text>(current => (this.nodePath = current!))}
                style={{ ...containerOptions().style }}
              />
            </Div>

            <Div
              label="Node Text"
              height="70%"
              {...focusable()}
              scrollable={true}
              ref={React.createRef<Text>(current => (this.nodeText = current!))}
              style={{ ...containerOptions().style }}
            />
          </Div>
        </Div>
        {/* <Div height="10%" width="100%">
          <text
            border="line"
            label="node path"
            ref={React.createRef<Text>(current => (this.nodePath = current!))}
            content=""
          />
        </Div> */}
        <Columns
          //  ref={React.createRef<Layout>(current => this.filterContainer = current!)}
          height="20%"
          width="100%">
          <Column {...containerOptions()} label="Search Text">
            <textbox
              {...textBox()}
              ref={React.createRef<Textbox>(current => (this.textFilterInput = current!))}
              hoverText="filter nodes by text"
              value="search"
              // label="Filter Text"
              on={[
                'focus',
                (e: any) => {
                  this.textFilterInput!.setHover('hello')
                }
              ]}
              onChange={e => {
                this.textSearchQuery = e.value
                this.filterByText()
              }}
            />
            <Br />

            <checkbox
              {...focusable()}
              style={{ ...textBox().style }}
              border={undefined}
              label={undefined}
              checked={this.includeValuesInTextSearch}
              content="Include values?"
              onChange={e => {
                this.includeValuesInTextSearch = e.value
                this.filterByText()
              }}
            />
          </Column>

          <Column {...containerOptions()} width="50%">
            <AutoComplete
              width="100%"
              listOptions={{
                ref: this.autoCompleteList,
                width: '100%',
                border: 'line',
                style: { bg: 'lightgray', fg: 'black' }
              }}
              inputOptions={{
                ...textBox(),
                width: '100%',
                height: 3,
                label: 'Select (JSON Pointer)'
              }}
              // border={undefined}
              hoverText="Select using JSON-Pointer"
              value="people.$*.email"
              options={[]}
              onChange={e => {
                
                // showInModal(this.textFilterInput.screen, 'hola')
                const result = ptr.get(this.json, e.value)
                const found = this.tree.findDescendant(d=>d.node===result)
                debug('ptr.get(this.json, e.value)0', result, found)
                if(found){
                  this.tree.focusNode(found)
                }
                // this.treeElement.
                // debug('ptr.get(this.json, e.value)',{result, found})

                if (!result) {
                  showInModal(
                    this.blessedElement.screen,
                    'Sorry, could not find expression "' + e.value + '" in current JSON.'
                  )
                  return
                }
                this.nodeText.content = JSON.stringify(result, null, 2)
                this.blessedElement.screen.render()
              }}
            />
          </Column>
          {}
        </Columns>
      </Div>
    )
  }

  filterByText(): void {
    const v = this.textSearchQuery.toLowerCase()
    this.tree.toggleNodeHide(n =>
      ((this.includeValuesInTextSearch ? JSON.stringify((n as TNode).node) + ' ' : '') + n.name)
        .toLowerCase()
        .includes(v)
    )
    this.tree.screen.render()
  }

  get tree() {
    return this.treeElement.current!
  }
}
