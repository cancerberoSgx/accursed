import { getElementData, getElementLabel, setElementData } from './blessed'
import { Element, IMouseEventArg, isElement } from './blessedTypes'

export function isCollapsed(el: Element) {
  return el.$.collapsible && el.$.collapsible.collapsed
}

export function setCollapsed(el: Element, collapsed: boolean, andRenderScreen = false) {
  if (!getElementData<boolean>(el, 'collapsible.installed')) {
    return
  }
  // el.screen.log('setCollapsed', el.options, collapsed)
  const auto = getElementData(el, 'collapsible.auto')
  const internalLabel = getElementLabel(el)
  setElementData(el, 'collapsible.collapsed', collapsed)
  if (collapsed) {
    // TODO: consider border and padding
    el.height = getElementData(el, 'collapsible.collapsedHeight') || 3
    const label = getElementData<string>(el, 'collapsible.uncollapsedLabel')
    if (label) {
      el.setLabel({ side: 'left', text: label })
    }
    if (auto) {
      el.children.filter(isElement).forEach(c => c !== internalLabel && c.hide())
    }
  } else {
    el.height = getElementData(el, 'collapsible.originalHeight') || 3

    const label = getElementData<string>(el, 'collapsible.collapsedLabel')
    if (label) {
      el.setLabel({ side: 'left', text: label })
    }
    if (auto) {
      el.children.filter(isElement).forEach(c => c !== internalLabel && c.show())
    }
  }
  if (auto || andRenderScreen) {
    el.screen.render()
  }
}

export function toggleCollapsed(el: Element, andRenderScreen = false) {
  const collapsed = !getElementData<boolean>(el, 'collapsible.collapsed')
  // el.screen.log('toggleCollapsed', collapsed)
  setCollapsed(el, collapsed, andRenderScreen)
}

interface Options {
  /** if provided, element will be collapsed to this height. by default it will be 3 to support auto: true, border and label */
  collapsedHeight?: number | string
  /**
   * Settings this to true will install a click listener on the element's label to toggle the collapse state. It will make sure there always be a label. Also it will hide/show non-label children when element is collapsed automatically.
   *
   * If this property is false, then user is responsible of all of this: implementing handlers for triggering toggle/collapse (like buttons/checkbox), hiding/showing children on collapse, resize the element, etc.
   *
   * By default the state will change when user left-click element's first line (y==0) .
   *
   * Also optionally, collapsed / uncollapsed custom labels can be set with [[collapsedLabel]] , [[uncollapsedLabel]]
   */
  auto?: boolean
  /** if provided it will set this label when element is collapsed*/
  collapsedLabel?: string
  /** if provided it will set this label when element is uncollapsed*/
  uncollapsedLabel?: string
}

export function installCollapsible(el: Element, options: Options = {}) {
  if (getElementData<boolean>(el, 'collapsible.installed')) {
    return
  }

  // el.screen.log('installCollapsible', el.options, options)
  // TODO: listen for resize and update collapsible.originalHeight
  setElementData(el, 'collapsible.originalLabel', el.options.label)
  setElementData(el, 'collapsible.originalHeight', el.height)
  setElementData(el, 'collapsible.auto', options.auto)
  setElementData(el, 'collapsible.installed', true)
  setElementData(el, 'collapsible.collapsedHeight', options.collapsedHeight || 3)
  if (options.auto) {
    options.collapsedLabel = options.collapsedLabel || `[-] (collapse) ${el.options.label || ''}`
    options.uncollapsedLabel = options.uncollapsedLabel || `[+] (expand) ${el.options.label || ''}`
  }

  setElementData(el, 'collapsible.collapsedLabel', options.collapsedLabel)
  setElementData(el, 'collapsible.uncollapsedLabel', options.uncollapsedLabel)

  if (typeof options.collapsedLabel !== 'undefined') {
    el.setLabel({ side: 'left', text: options.collapsedLabel })
  }
  if (options.auto) {
    const listener = (e: IMouseEventArg) => {
      toggleCollapsed(el)
    }
    // Heads up, in auto mode we install the listener on the label. in auto mode there should always be a label
    const internalLabel = getElementLabel(el) //
    if (internalLabel) {
      internalLabel.on('click', listener)
    } else {
      throw new Error(
        'installCollapsible auto: true fails because the internal label element cannot be found for ' + el.type
      )
    }
    setElementData(el, 'collapsible.listener', listener)
  }
}

export function uninstallCollapsible(el: Element) {
  if (!getElementData<boolean>(el, 'collapsible.installed')) {
    return
  }
  setElementData(el, 'collapsible.installed', false)

  const l = getElementData<(...args: any[]) => void>(el, 'collapsible.listener')
  if (l) {
    const internalLabel = getElementLabel(el)
    if (internalLabel) {
      internalLabel.off('click', l)
    }
    el.off('click', l)
  }
  el.height = getElementData<number>(el, 'collapsible.originalHeight') || el.height
  el.setLabel(getElementData<string>(el, 'collapsible.originalLabel') || '')
  setElementData(el, 'collapsible', {})
}
