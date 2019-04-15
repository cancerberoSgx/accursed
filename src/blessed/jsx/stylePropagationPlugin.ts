import { getObjectProperty, setObjectProperty } from '../../util/misc'
import { BlessedElementOptionsIntersection, Element, isElement } from '../blessedTypes'
import { React } from './createElement'

// TODO: what about properties that propagates from children to parents ?
// TODO: what about properties outsides
//TODO: research: to work purely with data / options and not with the elements already instantiated, we should create an intermediary representation  n createElement() and only create the blessed elements in render() so we have the time to process the option/tree before calling blessed constructors.

interface Options {
  /**  exclude some properties for being propagated */
  exclude?: string[]

  /** option name path to propagate form parent to children, something like style.bg or focusable */
  include: string[]

  /** predicates, per option path given in [[include]] descendants must comply with in order to propagate a certain option to them. If filter exists for a option path and the predicate returns true for a node, then those options wont be propagated to that node.
   *
   * Also if filter exists and [[stopPropagation === true]] then the option propagation will stop also for its descendants.
   *
   * Example: `[
   * {path: 'focusable', predicate: node=>node.type==='button'},
   * {path: 'style.hover.bg', predicate: node=>hasAscendant(node, a=>a.type==='layout')}
   * ]`, etc.
   *
   * Important: Paths here must be contained in [[include]]
   *
   * */
  filter?: { optionPath: string; predicate: (node: Element) => boolean; stopPropagation?: boolean }[]

  /** TODO. include properties outside options. Careful! */
  otherOptions?: (keyof BlessedElementOptionsIntersection)[]

  /** Like CSS !important. for keys in  here, children options will be override no matter if they explicitly have tgen in their options. Use with care*/
  important?: string[]
}

/** @internal */
export function installOptionsPropagationPlugin(options: Options = { include: [] }) {
  React.addAfterRenderListener(event => {
    try {
      if (options.include.length === 0) {
        return
      }
      // event.el.children.filter(isElement).forEach(child => copyOptions(event.el, child, options))
    } catch (error) {
      event.el.screen.log('instalPropagationPlugin error ', error)
    }
  })

  function copyOptions(parent: Element, child: Element, options: Options) {
    options.exclude = options.exclude || []
    parent.options = parent.options || {}
    options.important = options.important || []
    options.filter = options.filter || []
    const optionsChanges: { key: string; value: any }[] = []
    const selfChanges: { key: string; value: any }[] = []

    let stopPropagation = false
    options.include.forEach(k => {
      const filter = options.filter!.find(f => f.optionPath === k)
      if (filter && !filter.predicate(child)) {
        stopPropagation = stopPropagation || !!filter.stopPropagation
      }
      const optionsParentValue = getObjectProperty(parent.options, k)
      // const self = getObjectProperty(parent.options, k)
      if (typeof optionsParentValue === 'undefined') {
        return
      }
      const excluded = options.exclude!.includes(k)
      const important = options.important!.includes(k)
      const optionsChildValue = getObjectProperty(child.options, k)
      let finalVal: any | undefined
      if (excluded) {
        if (important) {
          // finalVal = { ...(childVal || {}), ...val }
          finalVal = extend(optionsChildValue || {}, optionsParentValue)
        } else {
          return
        }
      }
      if (typeof optionsChildValue === 'undefined') {
        finalVal = optionsParentValue
      } else {
        // finalVal = { ...val, ...childVal } // TODO: probably recursive merge needed
        finalVal = extend(optionsParentValue, optionsChildValue)
      }
      if (finalVal) {
        optionsChanges.push({ key: k, value: finalVal })
      }
    })
    if (optionsChanges.length) {
      parent.screen.log(
        'CHNGES FOR parent: ',
        parent.type,
        'CHILD: ',
        child.type,
        'changes names: ',
        optionsChanges.map(c => c.key),
        optionsChanges
      )
    }

    // TODO: check setEffects(el, fel, over, out, effects, temp) - Set effects based on two events and attributes.
    // for copying effects ?

    // HEADS UP: we modify also options so in the next level, descendants will get these also
    child.options = child.options || {}
    // child = child || {}
    optionsChanges.forEach(c => {
      // changes.
      setObjectProperty(child.options, c.key, c.value)
      // const parentSelfValue = getObjectProperty(parent, c.key)
      // if(typeof parentSelfValue!=='undefined'){
      const whiteList = ['style', 'input', 'mouse', 'clickable', 'focusable', 'keys', 'keyable', 'focused']
      if (whiteList.includes(c.key)) {
        // const childSelfValue = getObjectProperty(child, c.key)
        setObjectProperty(child, c.key, c.value)
      }
      // }
      // child.render()
      // setObjectProperty(child, c.key, c.value) // TODO: review! - perhaps whitelist the keys?
    })
    if (!stopPropagation) {
      child.children.filter(isElement).forEach(grandChild => {
        copyOptions(child, grandChild, options) // TODO: passing partial to recursion could speed up things?
      })
    }
  }
}

const deepExtend = require('deep-extend')
function extend(a: any, b: any): any {
  return deepExtend(a, b)
}
