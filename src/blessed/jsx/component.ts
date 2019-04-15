import { RemoveProperties } from '../../util/misc'
import { BlessedElementOptionsIntersection, Element, Style, WidgetTypesEnum } from '../blessedTypes'
import {
  ElementPredicate,
  filterChildren,
  filterDescendants,
  findChildren,
  findDescendant,
  visitDescendants,
  Visitor,
  VisitorOptions
} from '../node'

/**
 * Very simple abstract Component class (like React.Component) but without life cycle methods, or Refs. Has a dummy state that will update the blessed element if changed by default
 */
export abstract class Component<P = {}, S = {}> {
  constructor(protected props: P, protected state: S) {}

  abstract render(): JSX.BlessedJsxNode

  /**
   * All class elements will have a reference to its rendered blessed element
   */
  protected blessedElement: Element = undefined as any

  /**
   * return the type name of ths component container blessed element
   */
  get type() {
    return this.blessedElement.type as WidgetTypesEnum
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

  protected visitDescendants(v: Visitor, o: VisitorOptions = {}): boolean {
    return visitDescendants(this.blessedElement, v)
  }

  protected findDescendant(p: ElementPredicate) {
    return findDescendant(this.blessedElement, p)
  }
  protected filterDescendants(p: ElementPredicate) {
    return filterDescendants(this.blessedElement, p)
  }

  protected findChildren(p: ElementPredicate) {
    return findChildren(this.blessedElement, p)
  }
  protected filterChildren(p: ElementPredicate) {
    return filterChildren(this.blessedElement, p)
  }
  //TODO: ancestors, direct children and siblings. nice to have getFirstDescendantOfType, etc
}

/** esthetic options like color font styles that doesn't change the postiion dimention at all ! (so they can me safely applied in a general manner (declared in a theme)) safely*/
// type VisualNoPositionImpactOptions =TextStyleOptions| 'ColorOptions' EventEStyleOptions ?

interface ComponentWithOptionsProps
  extends Style,
    RemoveProperties<BlessedElementOptionsIntersection, 'border' | 'scrollbar'> {}
/**
 * Represent components that can accept Blessed elements options as Properties.
 *
 * Inheriting from this abstract component wil give the change to all components of an app to share and extends  the same option
 * semantics, mostly for style coherence. TODO: in the future use advanced theme framework css in jss, etc
 * */
export abstract class ComponentWithOptions<P extends ComponentWithOptionsProps = {}, S = {}> extends Component<P, S> {
  /** subclasses */
  // abstract elementType: ElementType
  // protected style: Partial<Style>
  // protected visualOptions: Partial<Style>
}

interface ComponentWithEffectsProps extends ComponentWithOptionsProps {}

/**
 * Component that model bless element effect state like focus, selected, blur, hover , text input, using their internal state. Also understand semantics on how these effects relate with options
 */
export abstract class ComponentWithEffects<
  P extends ComponentWithEffectsProps = {},
  S = {}
> extends ComponentWithOptions<P, S> {}
