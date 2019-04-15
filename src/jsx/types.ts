import {
  BigText,
  BigTextOptions,
  Box,
  BoxOptions,
  Button,
  ButtonOptions,
  CheckboxOptions,
  Element as BlessedElement,
  Element,
  ElementOptions,
  FileManager,
  FileManagerOptions,
  Form,
  FormOptions,
  IKeyEventArg,
  IMouseEventArg,
  INodeGenericEventArg,
  Layout,
  LayoutOptions,
  Line,
  LineOptions,
  List,
  ListBar,
  ListbarOptions,
  ListOptions,
  ListTable,
  ListTableOptions,
  NodeGenericEventType,
  NodeMouseEventType,
  NodeWithEvents,
  RadioButton,
  RadioButtonOptions,
  RadioSet,
  RadioSetOptions,
  Text,
  Textarea,
  TextareaOptions,
  Textbox,
  TextboxOptions,
  TextOptions
} from '../blessedTypes'
import { Component } from './component'

export enum EventOptionNames {
  key = 'key',
  onceKey = 'onceKey',
  on = 'on',
  once = 'once'
}

export enum ArtificialEventOptionNames {
  onClick = 'onClick',
  onKeyPress = 'onKeyPress',
  onRender = 'onRender',
  onChange = 'onChange'
}

/** represents event handlers directly supported by blessed element methods (exactly same signature) */
export interface BlessedEventOptions {
  [EventOptionNames.key]?: Parameters<NodeWithEvents['key']>
  [EventOptionNames.onceKey]?: Parameters<NodeWithEvents['onceKey']>
  [EventOptionNames.on]?: On<this>
  [EventOptionNames.once]?: On<this>
}

/** represents event handlers that doesn't exist on blessed - more high level and similar to html/react. This imply some manual event registration and mapping to blessed supported ones. */
export interface ArtificialEventOptions<T extends Element> {
  [ArtificialEventOptionNames.onClick]?: OnClickHandler<T>
  [ArtificialEventOptionNames.onKeyPress]?: (
    this: T,
    e: {
      ch: string
      key: IKeyEventArg
    } & ArtificialEvent<T>
  ) => void
  [ArtificialEventOptionNames.onRender]?: (this: T, e: INodeGenericEventArg & ArtificialEvent<T>) => void
  [ArtificialEventOptionNames.onChange]?: <V = any>(
    this: T,
    e: ArtificialEvent<T> & {
      value: V
    }
  ) => void
}

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      box: BoxOptions & EventOptions<Box>
      text: TextOptions & EventOptions<Text>
      line: LineOptions & EventOptions<Line>
      textarea: TextareaOptions & EventOptions<Textarea>
      layout: LayoutOptions & EventOptions<Layout>
      button: ButtonOptions & EventOptions<Button>
      checkbox: CheckboxOptions & EventOptions<Button>
      bigtext: BigTextOptions & EventOptions<BigText>
      list: ListOptions & EventOptions<List>
      filemanager: FileManagerOptions & EventOptions<FileManager>
      listtable: ListTableOptions & EventOptions<ListTable>
      listbar: ListbarOptions & EventOptions<ListBar>
      form: FormOptions & EventOptions<Form>
      textbox: TextboxOptions & EventOptions<Textbox>
      radioset: RadioSetOptions & EventOptions<RadioSet>
      radiobutton: RadioButtonOptions & EventOptions<RadioButton>
      __virtual: __Virtual
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
      | Component<P, any>
      | FunctionComponent<P>

    export interface FunctionComponent<P extends { children?: BlessedJsxNode } = {}> {
      (props: P & { children?: BlessedJsxNode }, context?: any): Element<any> | null
    }

    // and the following is basically for typings props.children

    type BlessedJsxText = string | number

    type BlessedJsxChild = Element<any> | BlessedJsxText

    export interface ReactNodeArray extends Array<BlessedJsxNode> {}

    export type BlessedJsxFragment = {} | ReactNodeArray

    // Heads up: we are forcing blessed node to be a JSX node !
    export type BlessedJsxNode =
      | BlessedJsxChild
      | BlessedJsxFragment
      | boolean
      | null
      | BlessedElement[]
      | BlessedElement

    export interface ElementAttributesProperty {
      props: {}
    }

    export interface ElementChildrenAttribute {
      children: {}
    }
  }
}

/** an intrinsic element wihtout children, that won't be renderd. Can be used by JSXElements that need to declare data markwup that is not supported by blessed optoins . Examplle: listbar buttons are declaren in the same list optoins but I want to declared them as JSX children, . So I do it by returning __Virtual with the informatio in the markup that the parent can consume., */
export type __Virtual<Data = any> = { __virtual: '__virtual'; data: Data }

export function is__Virtual(a: any): a is __Virtual {
  return a && a.__virtual === '__virtual' // TODO: use symbol
}

/**
 * Type of the `React` object as in `React.createElement`.
 *
 * Note: it could have another name than React, but if so tsconfig needs to be configured (JSXFactory) so for
 * simplicity we name the instance `React`
 */
export interface BlessedJsx {
  /**
   * JSX.Element to blessed node factory method. i.e. `<box>foo</box>` will be translated to `React.createElement('box', {}, ['foo'])`.
   *
   * This method should never be called directly by users, although is called internally when users call [[React.createEkenebt]]
   */
  createElement(tag: JSX.ElementType, attrs: BlessedJsxAttrs, ...children: any[]): JSX.BlessedJsxNode

  /**
   * Creates a blessed.element from given JSX expression. Will create blessed nodes recursively, bottom-up.
   */
  render(e: JSX.Element, options?: RenderOptions): Element

  /** add listeners that will be notifies just after the Blessed Element instance is created. Attributes and children have not yet been set, besides blessed options native ones.*/
  addAfterElementCreatedListener(l: AfterElementCreatedListener): void

  /** add listeners that will be notified just before a child is appended to its parent blessed element even for notes created from JSXText. If any listener return true the notification chain will stop, the children won't be appended to the element. */
  addBeforeAppendChildListener(l: BeforeAppendChildListener): void

  /**
   * add listeners that will be notified just before the blessed.foo() function is call with all the options as they
   *  are (normalized and valid).Children are blessed elements unless the TextNodes that are still literals so be careful!.
   * If any of the listeners returns a blessed element, it will interrupt the listener chain and that instance will be
   * used instead of calling the blessed function.
   * */
  addBeforeElementCreatedListener(l: BeforeElementCreatedListener): void

  /**
   * Add listeners that will be called after React.render() call finished rendering a whole hierarchy of items
   */
  addAfterRenderListener(l: AfterRenderListener): void
}

/** @internal */
export type AfterElementCreatedListener = (event: AfterElementCreatedEvent) => void
/** @internal */
export interface AfterElementCreatedEvent {
  el: Element
  tag: JSX.ElementType
  attrs: BlessedJsxAttrs
  children: JSX.BlessedJsxNode[]
  component?: Component
}
/** @internal */
export type BeforeAppendChildListener = (event: BeforeAppendChildEvent) => boolean
/** @internal */
export interface BeforeAppendChildEvent {
  el: Element
  child: Element
}
/** @internal */
export type BeforeElementCreatedListener = (event: BeforeElementCreatedEvent) => Element | undefined
/** @internal */
export interface BeforeElementCreatedEvent<Options extends ElementOptions = BoxOptions> {
  fn: (options: Options) => Element
  options: Options
  name: keyof JSX.IntrinsicElements
  children: (Element | JSX.BlessedJsxText)[]
}
/** @internal */
export interface AfterRenderEvent {
  el: Element
}
/** @internal */
export type AfterRenderListener = (event: AfterRenderEvent) => void

interface RenderOptions {}

export type BlessedJsxAttrs = { [a: string]: any } | undefined

type On<T> =
  | Parameters<(event: NodeMouseEventType, callback: (arg: IMouseEventArg) => void) => T>
  | Parameters<(event: 'keypress', callback: (ch: string, key: IKeyEventArg) => void) => T>
  | Parameters<(event: string, listener: (...args: any[]) => void) => T>
  | Parameters<(event: 'warning', callback: (text: string) => void) => T>
  | Parameters<(event: NodeGenericEventType, callback: () => void) => T>

interface EventOptions<T extends Element> extends BlessedEventOptions, ArtificialEventOptions<T> {
  children?: JSX.BlessedJsxNode
}

export interface ArtificialEvent<T extends Element> {
  // TODO : shouldbe JSX.ElementType not ELent cause targets can be also components, etc
  currentTarget: T
}

export type OnClickHandler<T extends Element> = (this: T, e: IMouseEventArg & ArtificialEvent<T>) => void
