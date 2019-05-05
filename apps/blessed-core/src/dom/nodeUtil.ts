import { Node, Attr } from '.'
import { Element } from '.'

export function nodeTypes(n: Node ): number[] {
  const o: number[] = []
  visitChildNodes(n, c => o.push(c.nodeType))
  return o
}

export function nodeTexts(n: Node ): (string | null)[] {
  return mapChildNodes(n, c => c.textContent)
}

export function isElement(n: Node ): n is Element {
  return n.nodeType === Node.ELEMENT_NODE
}

export function isText(n: Node ): n is Element {
  return n.nodeType === Node.TEXT_NODE
}

export function nodeAttributes(n: Node ): (Attr[] | null)[] {
  return mapChildNodes(n, c => {
    if (isElement(c)) {
      const attrs: Attr[] = []
      Array.from(c.attributes).forEach(a => attrs.push({ name: a.name, value: a.value }))
      return attrs
    }
    else {
      return null
    }
  })
}

export function visitChildNodes(n: Node, v: (c: Node) => void) {
  v(n)
  Array.from(n.childNodes as any).forEach(c => visitChildNodes(c as any, v))
}

export function mapChildNodes<T>(n: Node, v: (c: Node) => T): T[] {
  const o: T[] = []
  visitChildNodes(n, c => o.push(v(c)))
  return o
}
