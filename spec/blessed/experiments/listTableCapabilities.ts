import * as blessed from 'blessed'
import { enumKeys } from 'misc-utils-of-mine-typescript'
import * as accursed from '../../../src'
import { BoxOptions, debug, installExitKeys, Node, showInModal } from '../../../src'
try {
  const screen = blessed.screen({
    autoPadding: false,
    fullUnicode: true,
    log: 'log.txt'
  })
  listCapabilities({ parent: screen, accursed })
  installExitKeys(screen)
  screen.render()
} catch (error) {
  debug(error)
}

function listCapabilities(options: { accursed: typeof accursed; parent: Node }) {
  const commonOptions: () => BoxOptions = () => ({
    border: 'line',
    width: '30%',
    parent: options.parent,
    align: 'center',
    tags: true,
    top: 0,
    keys: true,
    focusable: true,
    mouse: true,
    scrollbar: { inverse: true },
    style: {
      border: {
        fg: 'red'
      },
      header: {
        fg: 'blue',
        bg: '#446611',
        bold: true
      },
      cell: {
        selected: {
          bg: 'blue'
        }
      },
      focus: {
        bold: true,
        underline: true,
        border: {
          fg: 'green'
        },
        cell: {
          bg: 'lightgray',
          fg: 'black'
        },
        header: {
          fg: '#880055',
          bg: 'gray'
        }
      }
    }
  })
  options.parent.on('key tab', () => options.parent.screen.focusNext())
  const FALSE = '\u2717'
  const TRUE = '\u2714'

  const capabilities = enumKeys(options.accursed.BlessedTerminalCapabilitiesBooleans)
  var stringData = [
    ['Capability', 'Supported?'],
    ...capabilities.map(c => [c, options.parent.screen.program.has(c) ? TRUE : FALSE])
  ]

  options.accursed.listtable({
    // focused: true,
    left: 0,
    label: { side: 'center', text: 'Boolean Capabilities' },
    data: stringData,
    ...commonOptions()
  })

  var stringCapabilitiesData = [
    ['Capability', 'Supported?'],
    ...enumKeys(options.accursed.BlessedTerminalCapabilitiesStrings).map(c => [
      c,
      options.parent.screen.program.has(c) ? TRUE : FALSE
    ])
  ]
  options.accursed.listtable({
    left: '33%',
    label: { side: 'center', text: 'String Capabilities' },
    data: stringCapabilitiesData,
    ...commonOptions()
  })

  var numberCapabilitiesData = [
    ['Capability', 'Supported?'],
    ...enumKeys(options.accursed.BlessedTerminalCapabilitiesBooleansNnmbers).map(c => [
      c,
      options.parent.screen.program.has(c) ? TRUE : FALSE
    ])
  ]
  options.accursed.listtable({
    left: '66%',
    label: { side: 'center', text: 'Number Capabilities' },
    data: numberCapabilitiesData,
    ...commonOptions()
  })

  // options.parent.screen.emit('key tab')
  options.parent.children
    .filter(options.accursed.isElement)
    .find(c => c.type === 'listtable')
    .focus()

  setTimeout(() => {
    showInModal(
      options.parent.screen,
      `
Welcome! 

These three tables display this terminal's capabilities. 

Switch focus using [TAB] and scroll using [UP] and [DOWN] arrow keys or the mouse wheel.

Close this modal with [Q] or [ESC].

This is an blessed application example using listtable widget and styles for focused elements.

Hope it helps a developer to better understand blessed API. 

   -- Sebastián Gurin
`
    )

    options.parent.children
      .filter(options.accursed.isElement)
      .find(c => c.type === 'listtable')
      .focus()
  }, 3000)
}
