// import { VirtualComponent } from '../blessed/virtualElement';
// import { Checkbox, Element, ElementOptions, isElement as isElementDontUseMe } from '../blessedTypes';
import { ProgramDocument } from '../programDom';
import { Component } from './component';
import { BlessedJsx, BlessedJsxAttrs  } from './types';
import { Node } from '../dom';

interface RenderOptions {
document?: ProgramDocument
}

interface ComponentConstructor<P = {}, S = {}> {
  new (p: P, s: S): Component
}

function isComponentConstructor(tag: any): tag is ComponentConstructor {
  return typeof tag === 'function' && tag.prototype && tag.prototype.render
}


class JSXElementImpl<P extends { children?: JSX.BlessedJsxNode } = {children: Array<JSX.BlessedJsxNode>}> implements JSX.Element<P>{
  constructor (public type: string, attrs: BlessedJsxAttrs){
this.props = {...attrs || {}} as any
  }
  children: any[] = []
  // props: P = {children: []} as any
  props:  P// = {} as any as P //{children: Array<JSX.BlessedJsxNode>}//  = {children: []}
  // children: JSX.BlessedJsxNode[] = []
}

/**
 * This implementation has a trivial createElement() and a heavier render(). This means that : "parsing" the jsx will be fast. render() will be slower. PRO: createElement doesn't create any Elements so we are able to modify the nodes and visit all of them bfore creating the ProgramElements. (implement Providers, etc.)
 */
class BlessedJsxImpl implements BlessedJsx {
  protected doc: ProgramDocument|undefined

  // private _intrinsicElementFactory = { ...(blessed as any) }
  // protected intrinsicElementFactory<O extends ElementOptions, T extends Element<O>>(
  //   type: string
  // ): blessedElementConstructor<O, T> | undefined {
  //   return this._intrinsicElementFactory[type]
  // }

  // addIntrinsicElementConstructors(blessedElementConstructors: { [type: string]: blessedElementConstructor }): void {
  //   const existing = Object.keys(blessedElementConstructors).find(newType =>
  //     Object.keys(this._intrinsicElementFactory).includes(newType)
  //   )
  //   if (existing) {
  //     throw new Error('Cannot add blessedElementConstructors because there is already a constructor called ' + existing)
  //   }
  //   this._intrinsicElementFactory = { ...this._intrinsicElementFactory, ...blessedElementConstructors }
  // }

  // constructor(protected options: Options = {}) {}

  // private defaultPluginsInstalled = false

  render(e: JSX.Element, options: RenderOptions = {}) {
    if(!this.doc && !options.document){
      throw new Error('Need to provide a document with setDocument() before render')
    }
    const doc = options.document ||this.doc!
    const el =  this._render(e, doc)
     doc.body.appendChild(el)
     return el 
    // if (!this.defaultPluginsInstalled) {
    //   this.defaultPluginsInstalled = true
    //   // installOptionsPropagationPlugin({ include: []})//['style.bg'] })
    // }

    // const event: AfterRenderEvent = { el: (e as any) as Element }
    // this.afterRenderListeners.forEach(l => l(event))

    // // setTimeout(() => {screen.render()}, 1000);

    // // const el = (e as any )()

    // return e as any
  }

  private _render(e: JSX.Element<{}>, doc: ProgramDocument) {
    if (typeof e.type !== 'string') {
      throw new Error('unexpected undefined type ' + e);
    }
    const el = doc.createElement(e.type);
    el.props.extend({ ...e.props, children: undefined } as any);
    if (e.children) {
      if (Array.isArray(e.children)) {
        e.children.forEach(c => {
          if (isElementLike(c)) {
            let r: Node
            if(c.type==='__text'){
              r = doc.createTextNode((c.props as any).textContent+'')
            }
            else {
              r = this._render(c, doc);
            }
            el.appendChild(r);
          }
          else {
            throw new Error('Unrecognized child type ' + c);
          }
        });
      }
      else {
        throw new Error('Unrecognized children type ' + e.children);
      }
    }
    return el;
  }

  setDocument(doc: ProgramDocument) {
    this.doc = doc
  }
  createElement(tag: JSX.ElementType, attrs: BlessedJsxAttrs, ...children: any[]) {

    // return ()=>{
    // TODO: beforeElementCreateListeners (so I can manipulate tag, attrs and children before anything
    // happens)

    let el: JSX.BlessedJsxNode

    // const eventOptionNames = enumKeys(EventOptionNames)
    // const artificialEventOptionNames = enumKeys(ArtificialEventOptionNames)
    // const blessedEventMethodAttributes = {} as BlessedEventOptions
    // const artificialEventAttributes = {} as ArtificialEventOptions<Element>
    let component: Component | undefined
    if (isComponentConstructor(tag)) {
      component = new tag({ ...attrs, children }, {})

      // TODO: beforeComponentCreated

      // if (VirtualComponent.isVirtualComponent(component)) {
      //   // then return a flagged object isVirtualElement so when the parent try to add it like child it
      //   // realizes it and can extract the information.
      //   el = VirtualComponent.createVirtualElement(component, tag.name)
      // } 
      // else {
        // if (component._saveJSXChildrenProps) {
        //   component._jsxChildrenProps = [...children] //.filter(VirtualComponent.isVirtualComponent)
        // }
        // TODO: beforeElementRenderListeners
        el = component.render()
        //@ts-ignore
        component.blessedElement = el
        //TODO: associate otherwise ?  good idea?
      // }
    } else if (typeof tag === 'function') {
      el = tag({ ...attrs, children })
      // TODO: add beforeElementRenderListeners
    } else if (typeof tag === 'string') {
      // // HEADS UP! we only implement attributes and children for intrinsic elements. ClassElement and
      // // FunctionElement are responsible of implementing both its attrs and children on their own
      // const fn = this.intrinsicElementFactory(tag) //as (options?: any) => Element
      // // TODO: beforeBlessedOptionsCleanedListeners
      // if (!fn) {
      //   const s = 'blessed.' + tag + ' function not found'
      //   debug(s)
      //   throw new Error(s)
      // }
      // // ATTRIBUTE NORMALIZATION (remove attributes that are not valid blessed options)
      // attrs = attrs || {}
      // Object.keys(attrs).forEach(a => {
      //   const value = attrs![a]
      //   if (eventOptionNames.includes(a)) {
      //     blessedEventMethodAttributes[a as EventOptionNames] = value
      //     delete attrs![a]
      //   }
      //   if (artificialEventOptionNames.includes(a)) {
      //     artificialEventAttributes[a as ArtificialEventOptionNames] = value
      //     delete attrs![a]
      //   }
      // })

      // const beforeElementCreatedEvent: BeforeElementCreatedEvent = { fn, options: attrs, name: tag as any, children }
      // let listenerInstance: Element | undefined
      // this.beforeElementCreatedListeners.some(l => {
      //   listenerInstance = l(beforeElementCreatedEvent)
      //   return !!listenerInstance
      // })
      // if (!listenerInstance) {
        // el = document({ ...attrs, children: undefined }) as Element
        el = new JSXElementImpl(tag, attrs)
        // if(attrs){
        //   Object.assign(el.props, attrs)
        // }
        // {tag,  attrs, children}
      // } else {
      //   debug('Element ' + tag + ' created by listener')
      //   return listenerInstance
      // }
    }

    // const afterElementCreatedEvent: AfterElementCreatedEvent = { el: el! as any, tag, attrs, children, component }
    // this.afterElementCreatedListeners.forEach(l => {
    //   l(afterElementCreatedEvent)
    // })

  //   this.installRefs(el, component)
  //   // finished created the  blessed Element. Now we ugly cast the JSX.Element to a BlessedElement and
    // continue installing attributes and children only for intrinsic elements
    if (typeof tag === 'string' 
    // || VirtualComponent.isVirtualComponent(component)
    ) {
      this.installAttributesAndChildren(el! as any,
        // , blessedEventMethodAttributes, artificialEventAttributes,
         children)
    }

  //   // TODO: finishElementCreateListeners
    return el!
  //   //  }
  }
  // private installRefs(el: JSX.BlessedJsxNode, component: Component): any {
  //   // install refs for all kind of elements (TODO: in a listener) TODO:  maybe a getter is better to avoid
  //   // object cycles ? TODO: if not found look at attrs arg just in case ?

  //   // install refs on components. if the

  //   if (component && (component as any).props && (component as any).props.ref) {
  //     ;(component as any).props.ref.current = component
  //     ;(component as any).props.ref.callback && (component as any).props.ref.callback(component)
  //   }
  //   // HEADS UP: if the component has a ref, then element's is not resolved. thats why it's an else if
  //   else if ((el! as any) && (el! as any).options && (el! as any).options.ref && !(el! as any).options.ref.current) {
  //     ;(el! as any).options.ref.current = el! as any
  //     ;(el! as any).options.ref.callback && (el! as any).options.ref.callback(el)
  //   }
  // }

  private installAttributesAndChildren(
    el: JSXElementImpl,
    // blessedEventMethodAttributes: any,
    // artificialEventAttributes: any,
    children: any[]
  ): any {
    // // HEADS UP : casting JSX.Element to concrete blessing Element
    // const el = jsxNode as Element
    //   // EVENT HANDLER ATTRIBUTES native event handlers like on(), key() etc are exactly matched against a
    //   // blessed method. Exactly same signature.
    // ;(Object.keys(blessedEventMethodAttributes) as EventOptionNames[]).forEach(methodName => {
    //   const args = blessedEventMethodAttributes[methodName] as any[]
    //   ;(el as any)[methodName](...args.map(a => (typeof a === 'function' ? a.bind(el) : a)))
    // })
    // // artificial event handlers like onClick, onChange (these doesn't exist on blessed - we need to
    // // map/install them manually)
    // ;(Object.keys(artificialEventAttributes) as ArtificialEventOptionNames[]).forEach(attributeName => {
    //   // TODO: we should type guard against element type so we only install event on correct element types
    //   // (only on elements that support that)
    //   if (attributeName === ArtificialEventOptionNames.onClick) {
    //     const fn = artificialEventAttributes[attributeName]!
    //     el.on('click', e => {
    //       fn.bind(el)({ ...e, currentTarget: el })
    //     })
    //   } else if (attributeName === ArtificialEventOptionNames.onKeyPress) {
    //     const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onKeyPress']
    //     el.on('keypress', (ch, key) => {
    //       fn!.bind(el)({ ch, key, currentTarget: el })
    //     })
    //   } else if (attributeName === ArtificialEventOptionNames.onRender) {
    //     const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onRender']
    //     el.on('render', e => {
    //       fn!.bind(el)({ ...e, currentTarget: el })
    //     })
    //   } else if (attributeName === ArtificialEventOptionNames.onceRender) {
    //     const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onceRender']
    //     el.once('render', e => {
    //       fn!.bind(el)({ ...e, currentTarget: el })
    //     })
    //   } else if (attributeName === ArtificialEventOptionNames.onChange) {
    //     const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onChange']
    //     // TODO: verify that element type supports the value change semantic (i.e is a checkbox )?
    //     if (el.type === 'checkbox') {
    //       el.on('check', e => {
    //         fn!.bind(el)({ ...e, currentTarget: el, value: (el as Checkbox).value })
    //       })
    //       el.on('uncheck', e => {
    //         fn!.bind(el)({ ...e, currentTarget: el, value: (el as Checkbox).value })
    //       })
    //     }
    //     if (el.type === 'textbox' || el.type === 'textarea') {
    //       el.on('submit', e => {
    //         fn!.bind(el)({ currentTarget: el, value: e })
    //       })
    //     }
    //   } else if (attributeName === ArtificialEventOptionNames.onSelect) {
    //     const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onSelect']
    //     el.on('select', e => {
    //       fn!.bind(el)({ ...e, currentTarget: el })
    //     })
    //   } else if (attributeName === ArtificialEventOptionNames.onPress) {
    //     const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onPress']
    //     el.on('press', e => {
    //       fn!.bind(el)({ ...e, currentTarget: el })
    //     })
    //   } else {
    //     debug('Unrecognized artificialEventAttribute ' + attributeName)
    //     throw new Error('Unrecognized artificialEventAttribute ' + attributeName)
    //   }
    // })

    // TODO: afterAttributesInstalledListeners

    // CHILDREN
    children.forEach(c => {
      if (isElementLike(c)) {
        // if (!c.options || !c.options.parent) {
        //   this.appendChild(el, c)
        // }
      } else if (Array.isArray(c)) {
        this._addChildrenArray(c, el)
      } else {
        this.createTextNode(c, el)
      }
    })
  }

  private _addChildrenArray(c: any[], el: JSXElementImpl ) {
    c.forEach(c2 => {
      if (isElementLike(c2)) {
        // if (!c2.options || !c2.options.parent) {
        //   this.appendChild(el, c2)
        // }
      } else if (Array.isArray(c2)) {
        this._addChildrenArray(c2, el)
      } else {
        this.createTextNode(c2, el)
      }
    })
  }

  /**
   * all children blessed nodes, even from text  are appended to the blessed element using this method, so
   * subclasses can override to do something about it. will notify beforeAppendChildListeners and if any
   * return true the child won't be appended
   */
  protected appendChild(el: JSXElementImpl, child: JSXElementImpl): any {
    // if (VirtualComponent.isVirtualElement(child)) {
    //   return // HEADS UP - for safety & speed we dont call any listener for virtual ?
    // }
    // const event: BeforeAppendChildEvent = {
    //   el,
    //   child
    // }
    // let dontAppend = this.beforeAppendChildListeners.some(l => l(event))
    if (el && el.props && el.children ){//&& !dontAppend) {
      el.children.push(child)
    }
  }

  /**
   * Default blessed Node factory for text like "foo" in <box>foo</box>
   */
  protected createTextNode(c: JSX.BlessedJsxText, el: JSXElementImpl) {
    const t = {type: '__text', props: {textContent: c+'', children: []}, children: []}
    this.appendChild(el, t)
    return t
    // TODO: onCreateTextNodeListeners (so I can transform JSXText literals)
  }

  // private afterElementCreatedListeners: AfterElementCreatedListener[] = []
  // addAfterElementCreatedListener(l: AfterElementCreatedListener): void {
  //   this.afterElementCreatedListeners.push(l)
  // }

  // private beforeAppendChildListeners: BeforeAppendChildListener[] = []
  // addBeforeAppendChildListener(l: BeforeAppendChildListener): void {
  //   this.beforeAppendChildListeners.push(l)
  // }

  // private beforeElementCreatedListeners: BeforeElementCreatedListener[] = []
  // addBeforeElementCreatedListener(l: BeforeElementCreatedListener): void {
  //   this.beforeElementCreatedListeners.push(l)
  // }

  // private afterRenderListeners: AfterRenderListener[] = []
  // addAfterRenderListener(l: AfterRenderListener): void {
  //   this.afterRenderListeners.push(l)
  // }
  // createRef<T extends Element | Component>(callback?: (current: T | undefined) => any): RefObject<T> {
  //   return ({
  //     current: undefined,
  //     callback
  //   } as any) as RefObject<T>
  // }
}

function isElementLike(e: any): e is JSXElementImpl {
  return e && e.props && e.children
}

export const React: BlessedJsx = new BlessedJsxImpl()

// /**
//  * Shortcut for `React.createRef`
//  */
// export function ref<C extends Component<any> | Element = any>(fn: (c: C) => void) {
//   return React.createRef(fn)
// }

// /**
//  * internal tool to resolve refObject from given options
//  * @internal
//  */
// export function resolveRef(options: ElementOptions, current: any) {
//   try {
//     if (options.ref) {
//       options.ref.current = current
//       if (options.ref.callback) {
//         options.ref.callback(current)
//       }
//     }
//   } catch (error) {
//     debug(error)
//     throw error
//   }
// }