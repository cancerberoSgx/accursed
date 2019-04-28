import * as blessed from 'blessed'

var screen = blessed.screen({
  smartCSR: true,
  warnings: true
})

screen.key('C-q', function() {
  // NOTE:
  // not necessary since screen.destroy causes terminal.term to be destroyed
  // (screen2's input and output are no longer readable/writable)
  // screen2.destroy();
  screen.destroy()
  process.exit(0)
})

var terminal = blessed.terminal({
  parent: screen,
  // cursor: 'line',
  // cursorBlink: true,
  screenKeys: false,
  top: 'center',
  left: 'center',
  width: '90%',
  height: '90%',
  border: 'line',
  // handler: function() {},
  style: {
    fg: 'default',
    bg: 'default',
    focus: {
      border: {
        fg: 'green'
      }
    }
  }
})

terminal.focus()

terminal.focus()
screen.render()
