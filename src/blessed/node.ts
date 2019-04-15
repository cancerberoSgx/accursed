import { Node } from './blessedTypes'

export type Visitor<T extends Node = Node> = (n: T) => boolean
/** settings for visitDescendants regarding visiting order and visit interruption modes. */
export interface VisitorOptions {
  childrenFirst?: boolean
  /**if a descendant visitor returned true, we stop visiting and signal up */
  breakOnDescendantSignal?: boolean
  /***no matter if visitor returns true for a node, it will still visit its descendants and then break the chain */
  visitDescendantsOnSelfSignalAnyway?: boolean
}

/**
 * Visit node's descendants until the visitor function return true or there are no more. In the first different modes on which visiting the rest of descendants or
 * ancestors are configurable through the options. By default, first the parent is evaluated which is configurable configurable with [[[VisitorOptions.childrenFirst]]
 * */
export function visitDescendants(n: Node, v: Visitor, o: VisitorOptions = {}): boolean {
  let r = false
  if (o.childrenFirst) {
    r = n.children.some(c => visitDescendants(c, v, o))
    if (!o.breakOnDescendantSignal && r) {
      return v(n)
    } else {
      return true
    }
  } else {
    r = v(n)
    if (r) {
      if (!o.visitDescendantsOnSelfSignalAnyway) {
        return true
      } else {
        return n.children.some(c => visitDescendants(c, v, o)) || true // true because self was signaled
      }
    } else {
      return n.children.some(c => visitDescendants(c, v, o))
    }
  }
}

export type ElementPredicate<T extends Node = Node> = (n: T) => boolean

export function filterDescendants<T extends Node = Node>(n: Node, p: ElementPredicate, o: VisitorOptions = {}): T[] {
  const a: T[] = []
  visitDescendants(n, c => {
    if (p(c)) {
      a.push(c as T)
    }
    return false
  })
  return a
}

export function findDescendant<T extends Node = Node>(n: Node, p: ElementPredicate, o: VisitorOptions = {}) {
  let a: T | undefined
  visitDescendants(n, c => {
    if (p(c)) {
      a = c as T
      return true
    }
    return false
  })
  return a
}

export function findChildren<T extends Node = Node>(n: Node, p: ElementPredicate) {
  return n.children.find<T>(c => p(c))
}

export function filterChildren<T extends Node = Node>(n: Node, p: ElementPredicate) {
  return n.children.filter(c => p(c))
}
//TODO: ancestors, direct children and siblings. nice to have getFirstDescendantOfType, etc
