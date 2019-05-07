import { ElementProps, ProgramDocument, ProgramElement } from '..'
import { Component } from './component'

declare global {

  export namespace JSX {
    export interface IntrinsicElements {
      box: OptionsProps<ElementProps>
      text: OptionsProps<ElementProps>
    }

    /** Adds extra props to Blessed options, like refs. TODO: we could add children here too ? and perhaps
     * unify the rest in one place (onClick, etc) */
    type OptionsProps<T> = PropsWithRef<Partial<T>>

    type PropsWithRef<P> = P & {
      children?: FlorJsxNode ,
      ref?: P extends { ref?: infer R } ? R : undefined
    }

    export interface Element<P extends { children?: FlorJsxNode } = {}> {
      type: ElementType
      props: P
      children?: FlorJsxNode
    }

    // TODO: we are using class Component directly while we should use a interface here
    export type ElementType<P extends { children?: FlorJsxNode } = {}> =
      | undefined
      | string
      | Component<PropsWithRef<P>, {}>
      | FunctionComponent<PropsWithRef<P>>

    export interface FunctionComponent<P extends { children?: FlorJsxNode } = {}> {
      (props: P & { children?: FlorJsxNode }, context?: any): Element<any> | null
    }

    // and the following is basically for typings props.children

    type BlessedJsxText = string | number

    type BlessedJsxChild<P extends { children?: FlorJsxNode } = {}>  = Element<P>  | BlessedJsxText

    export interface ReactNodeArray extends Array<FlorJsxNode> {}

    export type BlessedJsxFragment = {} | ReactNodeArray

    // Heads up: we are forcing blessed node to be a JSX node !
    export type FlorJsxNode<P extends { children?: FlorJsxNode } = {}>  =
      | BlessedJsxChild<P>
      | BlessedJsxFragment
      | boolean
      | null
      // | ProgramElement[]
      // | ProgramElement
      // |ProgramTextNode
      // | ProgramTextNode[]

    // export interface ElementAttributesProperty {
    //   props: {}
    // }

    // export interface ElementChildrenAttribute {
    //   children: {}
    // }
    // interface PropsChildren extends ElementProps {
    //   children?: BlessedJsxNode
    // }

  }
}

/**
 * Type of the `React` object as in `React.createElement`.
 *
 * Note: it could have another name than React, but if so tsconfig needs to be configured (JSXFactory) so for
 * simplicity we name the instance `React`
 */
export interface FlorJsx {
  /**
   * JSX.Element to blessed node factory method. i.e. `<box>foo</box>` will be translated to
   * `React.createElement('box', {}, ['foo'])`.
   *
   * This method should never be called directly by users, although is called internally when users call
   * [[React.createEkenebt]]
   */
  createElement(tag: JSX.ElementType, attrs: BlessedJsxAttrs, ...children: any[]): JSX.FlorJsxNode

  /**
   * Creates a blessed.element from given JSX expression. Will create blessed nodes recursively, bottom-up.
   */
  render(e: JSX.Element, options?: RenderOptions): ProgramElement

  setDocument(doc: ProgramDocument): void

  // /** add listeners that will be notifies just after the Blessed Element instance is created. Attributes and
  //  * children have not yet been set, besides blessed options native ones.*/
  // addAfterElementCreatedListener(l: AfterElementCreatedListener): void

  // /** add listeners that will be notified just before a child is appended to its parent blessed element even
  //  * for notes created from JSXText. If any listener return true the notification chain will stop, the
  //  * children won't be appended to the element. */
  // addBeforeAppendChildListener(l: BeforeAppendChildListener): void

  // /**
  //  * add listeners that will be notified just before the blessed.foo() function is call with all the options
  //  *  as they are (normalized and valid).Children are blessed elements unless the TextNodes that are still
  //  *  literals so be careful!. If any of the listeners returns a blessed element, it will interrupt the
  //  *  listener chain and that instance will be used instead of calling the blessed function.
  //  * */
  // addBeforeElementCreatedListener(l: BeforeElementCreatedListener): void

  // /**
  //  * Add listeners that will be called after React.render() call finished rendering a whole hierarchy of items
  //  */
  // addAfterRenderListener(l: AfterRenderListener): void

  // /**
  //  * Creates a react-like Ref object to associate blessed elements with variables in the code at render-time.
  //  * See https://reactjs.org/docs/refs-and-the-dom.html.
  //  */
  // createRef<T extends Element | Component>(callback?: (current: T | undefined) => void): RefObject<T>

  // /**
  //  * By default, accursed supports only blessed element intrinsic elements, and the creator functions for a
  //  * gigen tag name is taken from the blessed namespace as in `require('blessed').button({...})`. With this
  //  * method, users users can mix third party blessed object creators, like  blessed--contrib for creating more
  //  * intrinsic elements. If so they should also augment the global JSX namespace if they want to support
  //  * TypeScript.
  //  */
  // addIntrinsicElementConstructors(blessedElementConstructors: { [type: string]: blessedElementConstructor }): void
}

// /** @internal */
// export type AfterElementCreatedListener = (event: AfterElementCreatedEvent) => void
// /** @internal */
// export interface AfterElementCreatedEvent {
//   el: Element
//   tag: JSX.ElementType
//   attrs: BlessedJsxAttrs
//   children: JSX.BlessedJsxNode[]
//   component?: Component
// }
// /** @internal */
// export type BeforeAppendChildListener = (event: BeforeAppendChildEvent) => boolean
// /** @internal */
// export interface BeforeAppendChildEvent {
//   el: Element
//   child: Element
// }
// /** @internal */
// export type BeforeElementCreatedListener = (event: BeforeElementCreatedEvent) => Element | undefined
// /** @internal */
// export interface BeforeElementCreatedEvent<Options extends ElementOptions = BoxOptions> {
//   fn: (options: Options) => Element
//   options: Options
//   name: keyof JSX.IntrinsicElements
//   children: (Element | JSX.BlessedJsxText)[]
// }
// /** @internal */
// export interface AfterRenderEvent {
//   el: Element
// }
// /** @internal */
// export type AfterRenderListener = (event: AfterRenderEvent) => void

interface RenderOptions {
  document: ProgramDocument
}

/** @internal */
export type BlessedJsxAttrs = { [a: string]: any } | undefined

// type On<T> =
//   | Parameters<(event: NodeMouseEventType, callback: (arg: IMouseEventArg) => void) => T>
//   | Parameters<(event: 'keypress', callback: (ch: string, key: IKeyEventArg) => void) => T>
//   | Parameters<(event: string, listener: (...args: any[]) => void) => T>
//   | Parameters<(event: 'warning', callback: (text: string) => void) => T>
//   | Parameters<(event: NodeGenericEventType, callback: () => void) => T>
//   | Parameters<(event: 'select', callback: (item: BlessedElement, index: number) => void) => T>
//   | Parameters<(event: 'select item', callback: (item: BlessedElement, index: number) => void) => T>

// export interface EventOptions<T extends Element> extends BlessedEventOptions, ArtificialEventOptions<T> {
//   children?: JSX.BlessedJsxNode
// }

// export interface ArtificialEvent<T extends Element> {
//   // TODO : should be JSX.ElementType not ELent cause targets can be also components, etc
//   currentTarget: T
// }

// export type OnClickHandler<T extends Element> = (this: T, e: IMouseEventArg & ArtificialEvent<T>) => void

// export interface RefObject<T = any> {
//   /* when the RefObject is resolved, if provided, this call back will be called. */
//   callback?(current: T | undefined): any
//   current: T | undefined
// }
// /** @internal */
// export type blessedElementConstructor<O extends ElementOptions = ElementOptions, T extends Element = Element> = (
//   options?: O
// ) => T
