import * as blessed from 'blessed'
import { longText } from '../../assets/project1/src/text'

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
})

screen.title = 'my window title'

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '90%',
  mouse: true,
  height: '90%',
  content: longText(), // 'Hello {bold}world{/bold}!',
  tags: true,
  scrollable: true,

  alwaysScroll: true,
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
  }
})

// Append our box to the screen.
screen.append(box)

// If our box is clicked, change the content.
box.on('click', function(data) {
  box.insertTop(JSON.stringify(data))
  data.screen.render()
})

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0)
})
screen.cursorShape(true, true)
// Focus our element.
box.focus()

// Render the screen.
screen.render()

var list = blessed.list({
  parent: screen,
  label: ' {bold}{cyan-fg}Art List{/cyan-fg}{/bold} (Drag Me) ',
  tags: true,
  draggable: true,
  top: 0,
  right: 0,
  width: 200,
  height: '50%',
  keys: true,
  vi: true,
  mouse: true,
  border: 'line',
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
  search: function(callback) {
    prompt.input('Search:', '', function(err, value) {
      if (err) return
      return callback(null, value)
    })
  }
})

var prompt = blessed.prompt({
  parent: screen,
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
