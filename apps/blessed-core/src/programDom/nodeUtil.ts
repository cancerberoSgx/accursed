// import { ProgramTextNode } from './programTextNode';
import { Node } from '../dom'
import { ProgramElement } from './programElement'

export function isElement(n: any): n is ProgramElement {
  return n && n.nodeType === Node.ELEMENT_NODE && n.props
}

// export function isText(n: any): n is ProgramTextNode {
//   return n && n.nodeType === Node.TEXT_NODE
// }
