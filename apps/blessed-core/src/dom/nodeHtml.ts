import { Node } from '.'
import { isElement } from './nodeUtil'
export function nodeHtml(node: Node, outer = true): string {
  if (!isElement(node)) {
    return node.textContent + ''
  }
  const attrs = Array.from(node.attributes)
  return `${outer ? `<${node.tagName}${attrs.length ? ' ' : ''}${attrs.map(a => a.value && `${a.name}="${a.value.toString ? a.value.toString() : a.value}"`)
    .filter(a => a)
    .join(' ')}>` : ``}${Array.from(node.childNodes).map(c => nodeHtml(c)).join('')}${outer ? `</${node.tagName}>` : ``}`
}