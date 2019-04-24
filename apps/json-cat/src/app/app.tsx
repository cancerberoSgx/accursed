import {
  AutoComplete,
  Br,
  Column,
  Columns,
  Component,
  debug,
  Div,
  EventOptions,
  labelBlink,
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
import { jsonPath, jsonPathGet } from '../jsonPath'
import { AppManager } from '../manager/AppManager'
import { TNode } from '../types'
import { autocompleteOptions, containerOptions, focusable, textBox } from './styles'

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
  protected textFilterInput: Textbox = undefined as any
  protected nodePath: Text = null as any
  protected nodeText: Text = null as any
  protected includeValuesInTextSearch: boolean = false
  protected textSearchQuery: string = null as any
  protected json: any
  protected jsonPointerSelectors: string[] = null as any

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
          this.jsonPointerSelectors = selectors
          this.autoCompleteList.current!.setItems(selectors)
        } catch (error) {
          debug(error)
        }
        this.treeLoaded(false)
      }, 100)
    })
  }

  treeElement: RefObject<TreeView<TNode>> = React.createRef<TreeView<TNode>>(current =>
    setTimeout(() => {
      this.props.ready()
    }, 100)
  )

  protected treeLoaded(b: boolean) {}

  render() {
    return (
      <Div>
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
              style={{ ...containerOptions().style }}
              {...{
                scrollable: true,
                mouse: true,
                keys: true,
                alwaysScroll: true
              }}
              scrollable={true}
              ref={React.createRef<Text>(current => (this.nodeText = current!))}
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
              {...autocompleteOptions()}
              listOptions={{
                ...autocompleteOptions().listOptions,
                ref: this.autoCompleteList
              }}
              hoverText="Select using JSON-Pointer"
              value="people.$*.email"
              options={[]}
              onChange={e => {
                const result = ptr.get(this.json, e.value)
                const found = result && this.tree.findDescendant(d => d.node === result)
                if (!found) {
                  showInModal(
                    this.blessedElement.screen,
                    'Sorry, could not find expression "' + e.value + '" in current JSON.'
                  )
                  return
                } else {
                  this.tree.selectNode(found)
                }
                this.nodeText.content = JSON.stringify(result, null, 2)

                labelBlink(this.nodeText)
              }}
            />

            <AutoComplete
              {...autocompleteOptions()}
              value="$.*.value"
              hoverText="Select using Path"
              options={[]}
              label="JSON Path"
              onChange={e => {
                let found: TNode | undefined
                const result = jsonPath(this.json, e.value, { resultType: 'PATH' })
                if (result && result.length) {
                  try {
                    this.nodeText.content = JSON.stringify(result, null, 2)
                    // debug(result)
                    this.tree.screen.render()
                    const val = jsonPathGet(this.json, result[0])
                    // debug(result,val)
                    found = this.tree.findDescendant(d => d.node === val)
                    // debug(result,val, found)
                  } catch (error) {
                    debug('error', error)
                  }
                }
                if (!found) {
                  showInModal(this.tree.screen, 'Sorry, could not find expression "' + e.value + '" in current JSON.')
                } else {
                  this.tree.selectNode(found)
                }
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
