import * as blessed from 'blessed'

const screen = blessed.screen({})
var box = blessed.textarea({
  parent: screen,
  style: {
    bg: 'blue'
  },
  width: 'half',
  height: '"100%"',
  top: 0,
  left: 0,
  tags: true,
  mouse: true,
  clickable: true
})

screen.render()

screen.key('q', function() {
  screen.destroy()
})

screen.key('i', function() {
  box.readInput(function() {})
})

screen.key('e', function() {
  box.readEditor(function() {})
})
