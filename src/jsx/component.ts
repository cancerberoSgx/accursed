import { getElementData, replaceChildren } from '../blessed'
import {
  ElementPredicate,
  filterChildren,
  filterDescendants,
  findChildren,
  findDescendant,
  getContent,
  visitDescendants,
  Visitor,
  VisitorOptions
} from '../blessed/node'
import { Element } from '../blessedTypes'
import { RefObject } from './types'

/**
 * Very simple abstract Component class (like React.Component) but without life cycle methods, or Refs. Has a dummy state that will update the blessed element if changed by default
 */
export abstract class Component<P = { ref?: RefObject; children?: JSX.BlessedJsxNode }, S = {}> {
  constructor(protected props: P, protected state: S) {}

  /** if true then JSX children props will be save on property [[jsxChildrenProps]]. Component subclasses needing this information (like Virtual component parent) can override it. */
  _saveJSXChildrenProps = false
  _jsxChildrenProps: any = undefined

  abstract render(): JSX.BlessedJsxNode

  /**
   * All class elements will have a reference to its rendered blessed element
   */
  protected blessedElement: Element = undefined as any

  /**
   * return the type name of ths component container blessed element
   */
  get type() {
    return this.blessedElement.type //as WidgetTypesEnum
  }

  /** subclasses can override to prevent the blessed element to be rendered when the state changes */
  protected dontRenderOnStateChange = false

  /**
   * Dummy state, by default calls element's render() unless [[dontRenderOnStateChange]]
   */
  protected setState(s: Partial<S>) {
    this.state = { ...this.state, ...s }
    if (!this.dontRenderOnStateChange) {
      this.blessedElement.render()
    }
  }

  protected getElementData<T>(key: string): T {
    return getElementData(this.blessedElement, key) as any
  }

  log(...args: any[]) {
    if (this.blessedElement && this.blessedElement.screen) {
      this.blessedElement.screen.log(...args)
    }
  }

  protected visitDescendants(v: Visitor, o: VisitorOptions = {}): boolean {
    return visitDescendants(this.blessedElement, v)
  }

  protected findDescendant<T extends Element = Element>(p: ElementPredicate): T | undefined {
    return findDescendant(this.blessedElement, p)
  }

  protected filterDescendants<T extends Element = Element>(p: ElementPredicate): T[] {
    return filterDescendants(this.blessedElement, p)
  }

  protected findChildren<T extends Element = Element>(p: ElementPredicate): T | undefined {
    return findChildren(this.blessedElement, p)
  }

  protected filterChildren<T extends Element = Element>(p: ElementPredicate): T[] {
    return filterChildren(this.blessedElement, p) as any
  }
  //TODO: ancestors, direct children and siblings. nice to have getFirstDescendantOfType, etc

  /**
   *  Hot replace all children on this node with given [[newChildren]] array elements. This is a visual operation, and only should eb performed when the component need to implement a radicals different view dynamically since it couldnt costly.
   */
  replaceChildren(
    newChildren: Element[],
    options: { mode: 'quickly' | 'careful' | 'dontRender' } = { mode: 'careful' }
  ) {
    replaceChildren(this.blessedElement, newChildren, options)
  }

  /** Returns the text content of given node and all its children, in order. By default stripped from ansi escape chars and trimmed, and separated by space, but is configurable through options.  */
  getContent(options: { dontTrim?: boolean; dontStrip?: boolean; childrenLast?: boolean } = {}) {
    return getContent(this.blessedElement, options)
  }
}

// /** esthetic options like color font styles that doesn't change the postiion dimention at all ! (so they can me safely applied in a general manner (declared in a theme)) safely*/
// // type VisualNoPositionImpactOptions =TextStyleOptions| 'ColorOptions' EventEStyleOptions ?

// interface ComponentWithOptionsProps
//   extends Style,
//     RemoveProperties<BlessedElementOptionsIntersection, 'border' | 'scrollbar'> {}
// /**
//  * Represent components that can accept Blessed elements options as Properties.
//  *
//  * Inheriting from this abstract component wil give the change to all components of an app to share and extends  the same option
//  * semantics, mostly for style coherence. TODO: in the future use advanced theme framework css in jss, etc
//  * */
// export abstract class ComponentWithOptions<P extends ComponentWithOptionsProps = {}, S = {}> extends Component<P, S> {
//   /** subclasses */
//   // abstract elementType: ElementType
//   // protected style: Partial<Style>
//   // protected visualOptions: Partial<Style>
// }

// interface ComponentWithEffectsProps extends ComponentWithOptionsProps {}

// /**
//  * Component that model bless element effect state like focus, selected, blur, hover , text input, using their internal state. Also understand semantics on how these effects relate with options
//  */
// export abstract class ComponentWithEffects<
//   P extends ComponentWithEffectsProps = {},
//   S = {}
// > extends ComponentWithOptions<P, S> {}

// export { BlessedEventOptions } from './types'
// // const __dummy:BlessedEventOptions = undefined
