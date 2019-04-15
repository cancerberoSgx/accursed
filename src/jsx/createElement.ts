import * as blessed from 'blessed'
import { enumKeys } from 'misc-utils-of-mine-typescript'
import { Checkbox, Element, isElement } from '../blessedTypes'
import { Component } from './component'
import {
  AfterElementCreatedEvent,
  AfterElementCreatedListener,
  AfterRenderEvent,
  AfterRenderListener,
  ArtificialEventOptionNames,
  ArtificialEventOptions,
  BeforeAppendChildEvent,
  BeforeAppendChildListener,
  BeforeElementCreatedEvent,
  BeforeElementCreatedListener,
  BlessedEventOptions,
  BlessedJsx,
  BlessedJsxAttrs,
  EventOptionNames,
  is__Virtual
} from './types'
interface Options {
  dontInheritStyle?: boolean
}

interface ComponentConstructor<P = {}, S = {}> {
  new (p: P, s: S): Component
}

function isComponentConstructor(tag: any): tag is ComponentConstructor {
  return typeof tag === 'function' && tag.prototype && tag.prototype.render
}
/** In this implementation, all the work is dont by createElement, that returns ready to use blessed elements. Attributes and children are only implemented for intrinsic elements and all blessed types in JSX.IntrinsicElement should be supported. All event handlers in types are supported.
 */
class BlessedJsxImpl implements BlessedJsx {
  constructor(protected options: Options = {}) {}

  private defaultPluginsInstalled = false
  render(e: JSX.Element) {
    if (!this.defaultPluginsInstalled) {
      this.defaultPluginsInstalled = true
      // installOptionsPropagationPlugin({ include: []})//['style.bg'] })
    }

    const event: AfterRenderEvent = { el: (e as any) as Element }
    this.afterRenderListeners.forEach(l => l(event))

    // setTimeout(() => {
    //   screen.render()
    // }, 1000);
    return e as any
  }

  createElement(tag: JSX.ElementType, attrs: BlessedJsxAttrs, ...children: any[]) {
    // TODO: beforeElementCreateListeners (so I can manipulate tag, attrs and children before anything happens)

    let el: JSX.BlessedJsxNode

    const eventOptionNames = enumKeys(EventOptionNames)
    const artificialEventOptionNames = enumKeys(ArtificialEventOptionNames)
    const blessedEventMethodAttributes = {} as BlessedEventOptions
    const artificialEventAttributes = {} as ArtificialEventOptions<Element>
    let component: Component | undefined
    if (isComponentConstructor(tag)) {
      // TODO: beforeComponentCreated
      component = new tag({ ...attrs, children }, {})
      // TODO: beforeElementRenderListeners
      el = component.render()
      //@ts-ignore
      component.blessedElement = el
    } else if (typeof tag === 'function') {
      el = tag({ ...attrs, children })
      // TODO: add beforeElementRenderListeners
    } else if (typeof tag === 'string') {
      // HEADS UP! we only implement attributes and children for intrinsic elements. ClassElement and FunctionElement
      // are responsible of implementing both its attrs and children on their own
      const fn = (blessed as any)[tag] as (options?: any) => Element

      // TODO: beforeBlessedOptionsCleanedListeners

      if (!fn) {
        const s = 'blessed.' + tag + ' function not found'
        console.log(s)
        throw new Error(s)
      }
      // ATTRIBUTE NORMALIZATION (remove attributes that are not valid blessed options)
      attrs = attrs || {}
      Object.keys(attrs).forEach(a => {
        const value = attrs![a]
        if (eventOptionNames.includes(a)) {
          blessedEventMethodAttributes[a as EventOptionNames] = value
          delete attrs![a]
        }
        if (artificialEventOptionNames.includes(a)) {
          artificialEventAttributes[a as ArtificialEventOptionNames] = value
          delete attrs![a]
        }
      })

      const beforeElementCreatedEvent: BeforeElementCreatedEvent = { fn, options: attrs, name: tag as any, children }
      let listenerInstance: Element | undefined
      this.beforeElementCreatedListeners.some(l => {
        listenerInstance = l(beforeElementCreatedEvent)
        return !!listenerInstance
      })
      if (!listenerInstance) {
        el = fn(attrs) as Element
      } else {
        console.log('Element ' + tag + ' created by listener')
        return listenerInstance
      }
    }

    const afterElementCreatedEvent: AfterElementCreatedEvent = { el: el! as any, tag, attrs, children, component }
    this.afterElementCreatedListeners.forEach(l => {
      l(afterElementCreatedEvent)
    })

    // finished created the  blessed Element. Now we ugly cast the JSX.Element to a BlessedElement and continue installing attributes and children only for intrinsic elements
    if (typeof tag === 'string') {
      this.installAttributesAndChildren(el!, blessedEventMethodAttributes, artificialEventAttributes, children)
    }

    // TODO: finishElementCreateListeners
    return el!
  }

  private installAttributesAndChildren(
    jsxNode: JSX.BlessedJsxNode,
    blessedEventMethodAttributes: any,
    artificialEventAttributes: any,
    children: any[]
  ): any {
    // HEADS UP : casting JSX.Element to concrete blessing Element
    const el = jsxNode as Element
      // EVENT HANDLER ATTRIBUTES
      // native event handlers like on(), key() etc are exactly matched agains a blessed method. Exactly same signature.
    ;(Object.keys(blessedEventMethodAttributes) as EventOptionNames[]).forEach(methodName => {
      const args = blessedEventMethodAttributes[methodName] as any[]
      ;(el as any)[methodName](...args.map(a => (typeof a === 'function' ? a.bind(el) : a)))
    })
    // artificial event handlers like onClick, onChange (these doesn't exist on blessed - we need to map/install them manually)
    ;(Object.keys(artificialEventAttributes) as ArtificialEventOptionNames[]).forEach(attributeName => {
      if (attributeName === ArtificialEventOptionNames.onClick) {
        const fn = artificialEventAttributes[attributeName]!
        el.on('click', e => {
          fn.bind(el)({ ...e, currentTarget: el })
        })
      } else if (attributeName === ArtificialEventOptionNames.onKeyPress) {
        const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onKeyPress']
        el.on('keypress', (ch, key) => {
          fn!.bind(el)({ ch, key, currentTarget: el })
        })
      } else if (attributeName === ArtificialEventOptionNames.onRender) {
        const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onRender']
        el.on('render', e => {
          fn!.bind(el)({ ...e, currentTarget: el })
        })
      } else if (attributeName === ArtificialEventOptionNames.onChange) {
        const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onChange']
        // TODO: verify that element type supports the value change semantic (i.e is a checkbox )?
        el.on('check', e => {
          fn!.bind(el)({ ...e, currentTarget: el, value: (el as Checkbox).value })
        })
        el.on('uncheck', e => {
          fn!.bind(el)({ ...e, currentTarget: el, value: (el as Checkbox).value })
        })
      } else {
        console.log('Unrecognized artificialEventAttribute ' + attributeName)
        throw new Error('Unrecognized artificialEventAttribute ' + attributeName)
      }
    })

    // TODO: afterAttributesInstalledListeners

    // CHILDREN
    children.forEach(c => {
      if (!c || is__Virtual(c)) {
        // HEADS UP: don't print falsy values so we can write `{list.length && <div>}` or `{error && <p>}` etc
        return
      } else if (isElement(c)) {
        if (!c.options || !c.options.parent) {
          this.appendChild(el, c)
        }
      } else if (Array.isArray(c)) {
        c.forEach(c => {
          if (!c || is__Virtual(c)) {
            return
          } else if (isElement(c)) {
            if (!c.options || !c.options.parent) {
              this.appendChild(el, c)
            }
          } else {
            this.createTextNode(c, el)
          }
        })
      } else {
        this.createTextNode(c, el)
      }
    })
  }

  /**
   * all children blessed nodes, even from text  are appended to the blessed element using this method,
   * so subclasses can override to do something about it. will notify beforeAppendChildListeners and if any
   * return true the child won't be appended
   */
  protected appendChild(el: Element, child: Element): any {
    const event: BeforeAppendChildEvent = {
      el,
      child
    }
    let dontAppend = this.beforeAppendChildListeners.some(l => l(event))
    if (!dontAppend) {
      el.append(child)
    }
  }

  /**
   * Default blessed Node factory for text like "foo" in <box>foo</box>
   */
  protected createTextNode(c: JSX.BlessedJsxText, el: Element) {
    // TODO: onCreateTextNodeListeners (so I can transform JSXText literals)
    const t = blessed.text({ content: c + '' })
    this.appendChild(el, t)
    return t
  }

  private afterElementCreatedListeners: AfterElementCreatedListener[] = []
  addAfterElementCreatedListener(l: AfterElementCreatedListener): void {
    this.afterElementCreatedListeners.push(l)
  }

  private beforeAppendChildListeners: BeforeAppendChildListener[] = []
  addBeforeAppendChildListener(l: BeforeAppendChildListener): void {
    this.beforeAppendChildListeners.push(l)
  }

  private beforeElementCreatedListeners: BeforeElementCreatedListener[] = []
  addBeforeElementCreatedListener(l: BeforeElementCreatedListener): void {
    this.beforeElementCreatedListeners.push(l)
  }

  private afterRenderListeners: AfterRenderListener[] = []
  addAfterRenderListener(l: AfterRenderListener): void {
    this.afterRenderListeners.push(l)
  }
}

export const React: BlessedJsx = new BlessedJsxImpl()

// export function create__Virtual<Data=any>(data: Data): __Virtual<Data>{//TODO should we publish this in React object or better implementors  create this hack manually if they want...
//   return {
//   __virtual: '__virtual', data
// }
// }
// function __virtu
// export class __VirtualImpl implements  {
//   tag
// }
