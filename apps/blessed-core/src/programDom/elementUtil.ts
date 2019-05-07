import { Node } from '../dom'
import { ProgramElement } from './programElement'
import { ElementProps } from './types';

export function isElement(n: any): n is ProgramElement {
  return n && n.nodeType === Node.ELEMENT_NODE && n.props
}

// export function element(doc: ProgramDocument, name: string, props: ElementProps, children: (ProgramElement|string)[]){

// }
export function isElementProps(e: any): e is ElementProps {
  return e && e.afterRender
}