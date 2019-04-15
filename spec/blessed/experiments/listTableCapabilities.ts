import * as blessed from 'blessed'
import { enumKeys } from 'misc-utils-of-mine-typescript'
import { BlessedTerminalCapabilitiesBooleans } from '../../../src/declarations/blessedTermCap'

const screen = blessed.screen({
  // autoPadding: false,
  // fullUnicode: true
  log: 'log.txt'
})

const TRUE = 0x0b70
const FALSE = 0x02591
const capabilities = enumKeys(BlessedTerminalCapabilitiesBooleans)
// console.log(capabilities.length , capabilities[0], );
// screen.log(capabilities.map(c=>screen.program.has(c)))

var stringData = [
  ['{red-fg}Capability{/red-fg}', '{red-fg}Supported?{/red-fg}'],
  ...capabilities.map(c => [c, screen.program.has(c) ? 'yes' : 'no'])
]

var table = blessed.listtable({
  parent: screen,
  top: 'center',
  left: 'center',
  data: stringData,
  border: 'line',
  align: 'center',
  tags: true,
  keys: true,
  //width: '80%',
  width: 'shrink',
  height: '70%',
  vi: true,
  mouse: true,
  style: {
    border: {
      fg: 'red'
    },
    header: {
      fg: 'blue',
      bold: true
    },
    cell: {
      fg: 'magenta',
      selected: {
        bg: 'blue'
      }
    }
  }
} as any)

screen.key('q', function() {
  return screen.destroy()
})

table.focus()

screen.render()
