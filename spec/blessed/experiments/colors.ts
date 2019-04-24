import * as blessed from 'blessed'
import { words } from '../../../src/util/data';
import { number, color } from '../gallery/util';
import { installExitKeys, Box } from '../../../src';
import { homedir } from 'os';
import { settings } from 'cluster';


var screen = blessed.screen({
})

function opts() {
  return {
    top: number(4, 10), left: number(4, 10), width: number(14, 30), height: 14, style: { bg: rgb(), fg: rgb()}, content: words().join(' ')
  }
}
// var box = blessed.box({
//   parent: screen,
//   border: 'line',
//   ...opts()
// })
const boxes: Box[] = []
for (let i = 0; i < screen.width-4; i+=4) {
  for (let j = 0; j < screen.height-4; j+=4) {
    var box = blessed.box({
      parent: screen,
      top: j, left: i,
      border: 'line',
     style: style()
    })
    boxes.push(box)
  }
}
function style(){
  return  { bg: rgb(), fg: rgb(), border: {fg: rgb()}}
}




let counter = 0
function draw() {
  boxes.forEach(box=>{

    box.style= {...box.style, ...style()}
  })
  // box.top = number(1, 10)
  // box.left = number(1, 10)
  // box.height = number(5, screen.height - 11)
  // box.width = number(5, screen.width - 11)
  // box.style.bg = color()
  // box.content = words(20).join(' ')
  // box.once('render', ()=>{
  // })
  screen.render()
  counter++
  setTimeout(draw, 0)
}

var panel = blessed.box({
  parent: screen, style: { bg: 'blue', fg: 'white' },
  border: 'line', top: 0, left: 0, width: 10, height: 10, content: 'FPS'
})
let lastCounter = counter
setInterval(() => {
  panel.content = `FPS: ${counter - lastCounter}`
  lastCounter = counter
}, 1000);


draw()

// blessed.box({
//   parent: screen,
//   border: 'line',
//   ...opts()
// })
// blessed.box({
//   parent: screen,
//   border: 'line',
//   ...opts()
// })
// blessed.box({
//   parent: screen,
//   border: 'line',
//   ...opts()
// })
// blessed.box({
//   parent: screen,
//   border: 'line',
//   ...opts()
// })
// blessed.box({
//   parent: screen,
//   border: 'line',
//   ...opts()
// })



// console.log('1',{bg: rgb(), fg: rgb()}, '2',  blessed.helpers.attrToBinary({bg: rgb(), fg: rgb()}, box),  '2', blessed.escape('{red-fg}{green-bg}{bold}w{/bold}{/green-bg}{/red-fg}'));

// blessed.colors.convert
installExitKeys(screen)
screen.render()


// const c = blessed.colors.colors()
// for (let j = 0; j < screen.lines.length; j++) {
//   for (let i = 0; i <  screen.lines[j].length; i++) {
//     screen.lines[j][i] = [blessed.helpers.attrToBinary({bg: rgb(), fg: rgb()}, box), 'x']
//   }
// }

function rgb() {
return   blessed.colors.RGBToHex(number(0, 255), number(0, 255), number(0, 255))
  // return `rgb(${number(0, 255)},${number(0, 255)},${number(0, 255)})`;
}
