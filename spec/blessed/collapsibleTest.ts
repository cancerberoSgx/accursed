import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { installExitKeys, onValueChange } from '../../src/blessed/blessed'
import { BoxOptions } from '../../src/blessed/blessedTypes'
import { installCollapsible, toggleCollapsed, uninstallCollapsible } from '../../src/blessed/collapsible'
import { renderer } from '../../src/blessed/layoutRenderer'

const screen = blessed.screen({ smartCSR: true, log: './log.txt' })

const checkboxOptions: BoxOptions = {
  input: true,
  mouse: true,
  clickable: true,
  style: {
    bg: 'gray'
  },
  focusable: true
}

const layout = blessed.layout({
  ...checkboxOptions,
  parent: screen,
  top: '0%',
  left: '0%',
  width: '100%',
  height: '100%',
  border: 'line',
  style: {
    ...checkboxOptions.style,
    //@ts-ignore
    overflow: 'hidden'
  },
  renderer: renderer
})

const collapsibleCheckbox = blessed.checkbox({
  ...checkboxOptions,
  parent: layout,
  content: 'Collapsible ?'
})

onValueChange(collapsibleCheckbox, value => {
  if (value) {
    installCollapsible(layout, { collapsedHeight: 3 })
  } else {
    uninstallCollapsible(layout)
  }
  screen.render()
})

const collapsedCheckbox = blessed.checkbox({
  ...checkboxOptions,
  parent: layout,
  content: 'Collapsed ?'
})

onValueChange(collapsedCheckbox, value => {
  toggleCollapsed(layout)
  screen.render()
})

contrib.markdown({
  ...checkboxOptions,
  parent: layout,
  padding: 2,
  style: {
    ...checkboxOptions.style,
    //@ts-ignore
    display: 'block'
  },
  markdown: `

# Notes

Change **Collapsible** to install / uninstall collapse support in the box.

Change **Collapse** to collapse / uncollapse the box.

Note: if Collapsible is false, then the box won't never be collapsed.
  
    `
})

installExitKeys(screen)

screen.render()
