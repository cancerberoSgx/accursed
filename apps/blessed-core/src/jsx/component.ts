import { ProgramElement } from '..'

interface ExtraProps {
  // ref?: RefObject
  children?: JSX.BlessedJsxNode
}

/**
 * Simple abstract Component class (like React.Component) but without life cycle methods.
 *
 * Has a dummy state property that subclasses could implement some behavior for, right now it does nothing.
 */
export abstract class Component<UP = {}, S = {}, P = UP & ExtraProps> {

  constructor(protected props: P, protected state: S) {}

  /**
   * Called from JSX render() when [[element]] was just created. Take into account that its attributes and
   * children are not yet initialized. For that use [[elementReady]]
   */
  elementCreated() {}

  /**
   * Called from JSX render() when [[element]] was is ready, this is with its attributes and children
   * initialized and rendered. Take into account that perhaps the element is not yet attached to any document.
   *
   */
  elementReady() {
    this.element && this.element.childrenReady()
  }

  element: ProgramElement | undefined

  abstract render(): JSX.BlessedJsxNode

  //  /**
  //  * If true then JSX children props will be save on property [[_jsxChildrenProps]]. Component subclasses
  //  * needing this information (like Virtual component parent) can override it.
  //    */
  //  _saveJSXChildrenProps = false _jsxChildrenProps: any = undefined

  //  /**
  //  * All class elements will have a reference to its rendered blessed element
  //    */
  //  protected blessedElement: Element = undefined as any

  // get element() {return this.blessedElement
  // }

  //  /**
  //  * return the type name of ths component container blessed element
  //    */
  //  get type() {return this.blessedElement.type //as WidgetTypesEnum
  //  }

  // getElementData<T>(key: string): T {return getElementData(this.blessedElement, key) as any
  // }

  // visitDescendants(v: Visitor, o: VisitorOptions = {}): boolean {return
  //   visitDescendants(this.blessedElement, v)
  // }

  // findDescendant<T extends Element = Element>(p: ElementPredicate): T | undefined {return
  //   findDescendant(this.blessedElement, p)
  // }

  // findDescendantNamed<T extends Element = Element>(name: string): T | undefined {return
  //   findDescendantNamed(this.blessedElement, name)
  // }

  // filterDescendants<T extends Element = Element>(p: ElementPredicate): T[] {return
  //   filterDescendants(this.blessedElement, p)
  // }

  // findChildren<T extends Element = Element>(p: ElementPredicate): T | undefined {return
  //   findChildren(this.blessedElement, p)
  // }

  // filterChildren<T extends Element = Element>(p: ElementPredicate): T[] {return
  //   filterChildren(this.blessedElement, p) as any
  // }
  // //TODO: ancestors, direct children and siblings. nice to have getFirstDescendantOfType, etc

  // get screen() {return this.blessedElement && this.blessedElement.screen
  // }

  //  /**
  //  *  Hot replace all children on this node with given [[newChildren]] array elements. This is a visual
  //  *  operation, and only should eb performed when the component need to implement a radicals different
  //     view
  //  *  dynamically since it couldnt costly.
  //     */
  //  replaceChildren(newChildren: Element[], options: { mode: 'quickly' | 'careful' | 'dontRender' } = {
  //   mode: 'careful' }
  //  ) {
  //   replaceChildren(this.blessedElement, newChildren, options)
  //  }

  //  /**
  //  * Returns the text content of given node and all its children, in order. By default stripped from ansi
  //  * escape chars and trimmed, and separated by space, but is configurable through options.
  //    */
  //  getContent(options: { dontTrim?: boolean; dontStrip?: boolean; childrenLast?: boolean } = {}) {return
  //   getContent(this.blessedElement, options)
  //  }

  // getDescendantNamed<T extends Element>(n: string): T | undefined {return
  //   findDescendantNamed<T>(this.blessedElement, n)
  // }
}

export function isComponent(c: any): c is Component {
  return (
    c &&
    !!c.render && !!c.elementCreated
  )
}
