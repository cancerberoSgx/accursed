// import * as blessed from 'accursed'
import { listtable, Node, prompt, screen } from 'accursed'
import { countryFlagsArray } from './countryFlagsArray'

function charCodeHexString(s: string) {
  return s
    .split('')
    .map(s => s.charCodeAt(0).toString(16))
    .map(n => `\\u${n}`)
    .join('')
}

var screen2 = screen({
  autoPadding: false,
  // smartCSR: true, forceUnicode: true,
  fullUnicode: true
})

var table = getIconsTable(screen2)

var prompt2 = prompt({
  parent: screen2,
  top: 'center',
  left: 'center',
  height: 'shrink',
  width: 'shrink',
  keys: true,
  vi: true,
  mouse: true,
  tags: true,
  border: 'line',
  hidden: true
})

table.focus()

screen2.key('q', function() {
  return screen2.destroy()
})

screen2.render()

export function getIconsTable(parent: Node) {
  var stringData = [
    ['{red-fg}Character{/red-fg}', '{red-fg}Code Points{/red-fg}', '{red-fg}Description{/red-fg}'],
    ...countryFlagsArray().map(d => [d[0], charCodeHexString(d[0]), d[1]])
  ]
  var table = listtable({
    parent: parent,
    data: stringData,
    search: callback => {
      prompt2.input('Search:', '', function(err, value) {
        if (err) return
        return callback(null, value)
      })
    },
    border: 'line',
    align: 'left',
    tags: true,
    keys: true,
    height: '90%',
    vi: true,
    mouse: true,
    scrollable: true,
    scrollbar: {
      ch: ' ',
      track: {
        bg: 'cyan'
      },
      style: {
        inverse: true
      }
    },
    style: {
      //@ts-ignore
      border: {
        fg: 'red'
      },
      scrollbar: {
        ch: ' ',
        track: {
          bg: 'cyan'
        },
        style: {
          inverse: true
        }
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
  })
  return table
}
