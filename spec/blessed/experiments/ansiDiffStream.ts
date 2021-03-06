import * as blessed from 'blessed'
import { installExitKeys } from '../../../src'
import { words } from '../../../src/util/data'
import { color, number } from '../gallery/util'
var differ = require('ansi-diff-stream')
var diff = differ()

diff.pipe(process.stdout)

var screen = blessed.screen({
  log: 'log.txt',
  // tput: true,
  // useBCE: true,
  // input: diff,
  smartCSR: true
})

function opts() {
  return {
    top: number(4, 10),
    left: number(4, 10),
    width: number(14, 30),
    height: 14,
    style: { bg: 'blue' },
    content: words().join(' ')
  }
}
var box = blessed.box({
  parent: screen,
  border: 'line',
  ...opts()
})

let counter = 0
function draw() {
  box.top = number(1, 10)
  box.left = number(1, 10)
  box.height = number(5, screen.height - 11)
  box.width = number(5, screen.width - 11)
  box.style.fg = color()
  box.style.bg = color()
  box.content = words(20).join(' ')
  screen.render()
  counter++
}

var panel = blessed.box({
  parent: screen,
  style: { bg: 'blue', fg: 'white' },
  border: 'line',
  top: 0,
  left: 0,
  width: 10,
  height: 10,
  content: 'FPS'
})
let lastCounter = counter
setInterval(() => {
  panel.content = `FPS: ${counter - lastCounter}`
  lastCounter = counter
}, 1000)

// setTimeout(end,  5000);
// screen.key(['escape', 'q', 'Q', 'C-c'], function(ch, key) {
//   screen.destroy()
//   process.exit(0)
// })

// function end(){
//   screen.destroy()
//   process.exit(0)
//   console.log({counter});
// }

installExitKeys(screen)
screen.render()
draw()
// diff.pipe(process.stdout)
