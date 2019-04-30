import { notUndefined } from 'misc-utils-of-mine-typescript'
import { Element } from '../blessedTypes'
import { Component } from '../jsx'
import { appendElementData } from './util'
/**
 * Why do we need this if we have props? you cannot decalre structured data like <tabPanel><tab><title>... etc - - props. only allows 21 level
 *
 * simulates to be a lessed node until the next iteration of createElement so the parent can recognize it abd extract its info, and discard it.
 */
export // abstract
class VirtualComponent<P = {}, S = {}> extends Component<P, S> implements VirtualElement {
  // protected abstract getVirtualData(): P;

  render() {
    return null
  }
  private static __isVirtualComponent = 123
  private __isVirtualComponent = VirtualComponent.__isVirtualComponent

  public static VIRTUAL_DATA_OPTION = 'accursed.virtual.component'
  // constructor(p: P, s: S){
  //   super(p, s) // HEADS UP this is not yet lightqweight!
  //   //ALL THE DATA is in the props
  // }
  static isVirtualComponent(c: any): c is typeof VirtualComponent {
    return c && c.__isVirtualComponent === VirtualComponent.__isVirtualComponent
  }
  static isVirtualElement(c: any): c is VirtualElement {
    return VirtualComponent.isVirtualComponent(c)
  }
  static createVirtualElement(c: any, tagName: string) {
    return { ...c, __virtualTagName: tagName }
  }
  saveVirtualData(e: Element) {
    // this.log(e, this.props)
    appendElementData(e, VirtualComponent.VIRTUAL_DATA_OPTION, this.props)
    // setElementData(e, VirtualComponent.VIRTUAL_DATA_OPTION, this.props);
  }
  static createVirtualComponent<T>(p: T) {
    // TODO. this is not lightweight...
    return new VirtualComponent(p, {})
  }
}
/** suggested format for virtual data ojbect provided by EACH child in the parent's setElementData array */
interface VirtualDataBase {}
export type ParentVirtualData<T extends Partial<VirtualDataBase>> = T[]
// export functoin loadVirtualEement()
//  *TODO: probably we want to assign Node prototype to this one so calls does not fail - example: user add a clikhandler and createELnet try to add listener e.on(click... will fail)  ..
// if that the case we make this interface extends Node  and we will force VirtualComponent to extend Node for good
// Object.assign(VirtualComponent.prototype, blessed.widget.Node.prototype, VirtualComponent.prototype)
interface VirtualElement {
  // extends Node
  /** loads the data on this virtual element (object simulating to be a bkessing node temporarily on  given (real) parent e. E knowns that is fake and wont append it .. dont need to worry */
  saveVirtualData(e: Element): void
  // loadVirtualData()
}
interface VirtualComponentParent {
  __virtualProps: {}
}
/**
 *  will return children data stored in _jsxChildrenProps, flatting children that are arrays.
 * 
Example: 

For a virtual parent component like : 

```
<ListTable>
  <Thead>
    <Th>Name</Th>
    <Th>Number code</Th>
    <Th>description</Th>
  </Thead>
  <TBody>
    <Tr>
      <Td>hello</Td>
      <Td>ehredd</Td>
    </Tr>
    <Tr>
      <Td>asd</Td>
      <Td>dfg</Td>
    </Tr>
    <Tr>
      <Td>helasaalo</Td>
      <Td>ssss</Td>
    </Tr>
  </TBody>
</ListTable>
```

It will return a JSON Like this:
```json
[
  {
    "children": [
      {
        "children": [
          "Name"
        ],
        "tagName": "Th"
      },
      {
        "children": [
          "Number code"
        ],
        "tagName": "Th"
      },
      {
        "children": [
          "description"
        ],
        "tagName": "Th"
      }
    ],
    "tagName": "Thead"
  },
  {
    "children": [
      {
        "children": [
          {
            "children": [
              "hello"
            ],
            "tagName": "Td"
          },
          {
            "children": [
              "ehredd"
            ],
            "tagName": "Td"
          }
        ],
        "tagName": "Tr"
      },
      {
        "children": [
          {
            "children": [
              "asd"
            ],
            "tagName": "Td"
          },
          {
            "children": [
              "dfg"
            ],
            "tagName": "Td"
          }
        ],
        "tagName": "Tr"
      },
      {
        "children": [
          {
            "children": [
              "helasaalo"
            ],
            "tagName": "Td"
          },
          {
            "children": [
              "ssss"
            ],
            "tagName": "Td"
          }
        ],
        "tagName": "Tr"
      }
    ],
    "tagName": "TBody"
  }
]

```
 */
export function getJSXChildrenProps(component: Component): VirtualChildrenData[] {
  return (component._jsxChildrenProps || []).map(process).flat()
}
export interface VirtualChildrenData {
  children: (VirtualChildrenData | string | number)[]
  attrs: { [name: string]: any }
  tagName: string
}
export function isElementData(c: any): c is VirtualChildrenData {
  return c && c.tagName
}
function process(p: JSXChildrenProps | undefined): (VirtualChildrenData | string | number | undefined)[] {
  if (!p) {
    return []
  }
  if (Array.isArray(p)) {
    return p.map(process).flat()
  } else {
    const children: any[] = []

    if (!p.props || !p.__virtualTagName) {
      return [p] as any
    }
    ;(p.props.children || []).forEach(c => {
      if (Array.isArray(c)) {
        c.filter(notUndefined).forEach(cc => children.push(...process(cc)))
      } else if (typeof c !== 'object') {
        return children.push(c)
      } else {
        children.push(...process(c))
      }
    })
    const attrs = { ...p.props }
    delete attrs.children
    return [
      {
        children: children.filter(notUndefined),
        attrs,
        tagName: p.__virtualTagName
      }
    ]
  }
}

interface JSXChildrenProps {
  props: {
    children: (JSXChildrenProps | string | number)[]
  }
  __virtualTagName: string
}
