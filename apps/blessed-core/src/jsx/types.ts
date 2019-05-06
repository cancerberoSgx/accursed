// import { BorderBox, BorderBoxOptions, BorderLayout, BorderLayoutOptions, TreeOptions, TreeView } from '../blessed'
// import {
//   BigText,
//   BigTextOptions,
//   Box,
//   BoxOptions,
//   Button,
//   ButtonOptions,
//   CheckboxOptions,
//   Element as BlessedElement,
//   Element,
//   ElementOptions,
//   FileManager,
//   FileManagerOptions,
//   Form,
//   FormOptions,
//   IKeyEventArg,
//   IMouseEventArg,
//   INodeGenericEventArg,
//   Layout,
//   LayoutOptions,
//   Line,
//   LineOptions,
//   List,
//   ListBar,
//   ListbarOptions,
//   ListOptions,
//   ListTable,
//   ListTableOptions,
//   Log,
//   LogOptions,
//   NodeGenericEventType,
//   NodeMouseEventType,
//   NodeWithEvents,
//   Prompt,
//   PromptOptions,
//   Question,
//   QuestionOptions,
//   RadioButton,
//   RadioButtonOptions,
//   RadioSet,
//   RadioSetOptions,
//   Terminal,
//   TerminalOptions,
//   Text,
//   Textarea,
//   TextareaOptions,
//   Textbox,
//   TextboxOptions,
//   TextOptions
// } from '../blessedTypes'
import { Component } from './component'
import { ElementPropsImpl, ProgramElement, StylePropsImpl, StyleProps, ProgramDocument, ElementProps } from '../programDom';
import { ProgramTextNode } from '../programDom/programTextNode';

// export enum EventOptionNames {
//   key = 'key',
//   onceKey = 'onceKey',
//   on = 'on',
//   once = 'once'
// }

// export enum ArtificialEventOptionNames {
//   onClick = 'onClick',
//   onKeyPress = 'onKeyPress',
//   onRender = 'onRender',
//   onChange = 'onChange',
//   onSelect = 'onSelect',
//   onPress = 'onPress',
//   onceRender = 'onceRender'
// }

// /**
//  * Represents event handlers directly supported by blessed element methods (exactly same signature)
//  */
// export interface BlessedEventOptions {
//   [EventOptionNames.key]?: Parameters<NodeWithEvents['key']>
//   [EventOptionNames.onceKey]?: Parameters<NodeWithEvents['onceKey']>
//   [EventOptionNames.on]?: On<this>
//   [EventOptionNames.once]?: On<this>
// }

// /**
//  * Represents event handlers that doesn't exist on blessed - more high level and similar to html/react. This
//  * imply some manual event registration and mapping to blessed supported ones.
//  */
// export interface ArtificialEventOptions<T extends Element> {
//   [ArtificialEventOptionNames.onClick]?: OnClickHandler<T>
//   [ArtificialEventOptionNames.onKeyPress]?: (
//     this: T,
//     e: {
//       ch: string
//       key: IKeyEventArg
//     } & ArtificialEvent<T>
//   ) => void
//   [ArtificialEventOptionNames.onRender]?: (this: T, e: INodeGenericEventArg & ArtificialEvent<T>) => void
//   [ArtificialEventOptionNames.onceRender]?: (this: T, e: INodeGenericEventArg & ArtificialEvent<T>) => void
//   [ArtificialEventOptionNames.onChange]?: (
//     this: T,
//     e: ArtificialEvent<T> & {
//       value: any
//     }
//   ) => void
//   [ArtificialEventOptionNames.onSelect]?: <V = any>(
//     this: T,
//     e: ArtificialEvent<T> & {
//       index: number
//       element: Box
//     }
//   ) => void
//   [ArtificialEventOptionNames.onPress]?: <V = any>(
//     this: T,
//     e: ArtificialEvent<T> & {
//       // index: number element: Box
//     }
//   ) => void
// }

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      box: ElementProps
      text: ElementProps
      
      // OptionsProps<ElementProps> & EventOptions<Box>
      // text: OptionsProps<TextOptions> & EventOptions<Text>
      // line: OptionsProps<LineOptions> & EventOptions<Line>
      // textarea: OptionsProps<TextareaOptions> & EventOptions<Textarea>
      // layout: OptionsProps<LayoutOptions> & EventOptions<Layout>
      // button: OptionsProps<ButtonOptions> & EventOptions<Button>
      // checkbox: OptionsProps<CheckboxOptions> & EventOptions<Button>
      // bigtext: OptionsProps<BigTextOptions> & EventOptions<BigText>
      // list: OptionsProps<ListOptions> & EventOptions<List>
      // filemanager: OptionsProps<FileManagerOptions> & EventOptions<FileManager>
      // listtable: OptionsProps<ListTableOptions> & EventOptions<ListTable>
      // listbar: OptionsProps<ListbarOptions> & EventOptions<ListBar>
      // form: OptionsProps<FormOptions> & EventOptions<Form>
      // log: OptionsProps<LogOptions> & EventOptions<Log>
      // textbox: OptionsProps<TextboxOptions> & EventOptions<Textbox>
      // radioset: OptionsProps<RadioSetOptions> & EventOptions<RadioSet>
      // radiobutton: OptionsProps<RadioButtonOptions> & EventOptions<RadioButton>
      // prompt: OptionsProps<PromptOptions> & EventOptions<Prompt>
      // question: OptionsProps<QuestionOptions> & EventOptions<Question>
      // terminal: OptionsProps<TerminalOptions> & EventOptions<Terminal>
      // treeview: OptionsProps<TreeOptions> & EventOptions<TreeView>
      // borderBox: OptionsProps<BorderBoxOptions> & EventOptions<BorderBox>
      // borderLayout: OptionsProps<BorderLayoutOptions> & EventOptions<BorderLayout>
    }

    // /** Adds extra props to Blessed options, like refs. TODO: we could add children here too ? and perhaps
    //  * unify the rest in one place (onClick, etc) */
    // type OptionsProps<T> = PropsWithRef<T>

    type PropsWithRef<P> = P & {
      // children?: BlessedJsxNode ,
      ref?: P extends { ref?: infer R } ? R : undefined
    }

    export interface Element<P extends { children?: BlessedJsxNode } = {}> {
      type: ElementType
      props: P
      children?: BlessedJsxNode
    }

    // TODO: we are using class Component directly while we should use a interface here
    export type ElementType<P extends { children?: BlessedJsxNode } = {}> =
      | undefined
      | string
      | Component<PropsWithRef<P>, {}>
      | FunctionComponent<PropsWithRef<P>>

    export interface FunctionComponent<P extends { children?: BlessedJsxNode } = {}> {
      (props: P & { children?: BlessedJsxNode }, context?: any): Element<any> | null
    }

    // and the following is basically for typings props.children

    type BlessedJsxText = string | number

    type BlessedJsxChild = Element<{}> | BlessedJsxText

    export interface ReactNodeArray extends Array<BlessedJsxNode> {}

    export type BlessedJsxFragment = {} | ReactNodeArray

    // Heads up: we are forcing blessed node to be a JSX node !
    export type BlessedJsxNode =
      | BlessedJsxChild
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
  }
}

/**
 * Type of the `React` object as in `React.createElement`.
 *
 * Note: it could have another name than React, but if so tsconfig needs to be configured (JSXFactory) so for
 * simplicity we name the instance `React`
 */
export interface BlessedJsx {
  /**
   * JSX.Element to blessed node factory method. i.e. `<box>foo</box>` will be translated to
   * `React.createElement('box', {}, ['foo'])`.
   *
   * This method should never be called directly by users, although is called internally when users call
   * [[React.createEkenebt]]
   */
  createElement(tag: JSX.ElementType, attrs: BlessedJsxAttrs, ...children: any[]): JSX.BlessedJsxNode

  /**
   * Creates a blessed.element from given JSX expression. Will create blessed nodes recursively, bottom-up.
   */
  render(e: JSX.Element, options?: RenderOptions): ProgramElement

  setDocument(doc: ProgramDocument):void

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
