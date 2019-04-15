import * as blessed from 'blessed'
import { longText } from '../../assets/project1/src/text'

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
})

screen.title = 'my window title'

const editor = blessed.scrollabletext({
  content: longText(),
  alwaysScroll: true,
  scrollable: true,
  clickable: true,
  focusable: true,
  hoverText: 'hshshs',
  mouse: true,

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
    item: {
      hover: {
        bg: 'blue'
      }
    },
    selected: {
      bg: 'blue',
      bold: true
    }
  },
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})
screen.append(editor)

editor.on('click', function(data) {
  alert(JSON.stringify(data) + '  ' + JSON.stringify(editor.position))
  screen.render()
})

// editor.sele

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0)
})
editor.focus()

screen.render()

let p: blessed.Widgets.PromptElement | undefined
function alert(s: string) {
  if (!p) {
    p = blessed.prompt({
      mouse: true,
      parent: screen,
      top: 'center',
      left: 'center',
      height: 'shrink',
      width: 'shrink',
      keys: true,
      vi: true,
      tags: true,
      border: 'line',
      hidden: true
    })
    p.on('click', data => p!.hide())
  }
  p.setContent(s)
  p.show()
}
