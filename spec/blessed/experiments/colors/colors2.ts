import * as blessed from 'blessed'
import { installExitKeys } from '../../../../src'
import { words } from '../../../../src/util/data'
import { number } from '../../gallery/util'

const gradstop = require('gradstop')

const rgb2Hex = (s: string) =>
  //@ts-ignore
  s
    .match(/[0-9]+/g)!
    .reduce((a, b: any) => a + (b | 256).toString(16).slice(1), '#')
    .toString(16)

const gradients = [
  gradstop({
    stops: 40,
    inputFormat: 'hex',
    colorArray: ['#000000', '#ff0000']
  }).map(rgb2Hex) as string[],
  gradstop({
    stops: 40,
    inputFormat: 'hex',
    colorArray: ['#f00000', '#ffffff']
  }).map(rgb2Hex) as string[],
  gradstop({
    stops: 40,
    inputFormat: 'hex',
    colorArray: ['#ffff00', '#0033dd']
  }).map(rgb2Hex) as string[],
  gradstop({
    stops: 40,
    inputFormat: 'hex',
    colorArray: ['#000000', '#ffffff']
  }).map(rgb2Hex) as string[],
  gradstop({
    stops: 40,
    inputFormat: 'hex',
    colorArray: ['#ff00ff', '#55ff44']
  }).map(rgb2Hex) as string[],
  gradstop({
    stops: 40,
    inputFormat: 'hex',
    colorArray: ['#44ff11', '#ff1199']
  }).map(rgb2Hex) as string[]
]

var screen = blessed.screen({})
// // import gradstop from 'gradstop';

installExitKeys(screen)
screen.render()
gradients.forEach((gradient, j) => {
  gradient.forEach((c, i) => {
    blessed.box({
      parent: screen,
      top: Math.trunc(j * (screen.height / gradients.length)),
      left: Math.trunc(i * (screen.width / gradient.length)),
      width: Math.trunc(screen.width / gradient.length),
      height: Math.trunc(screen.height / gradients.length),
      style: { bg: c, fg: 'white' },
      border: undefined,
      content: c
    })
    // console.log(c, rgb2Hex(c));
  })
})

function opts() {
  return {
    top: number(4, 10),
    left: number(4, 10),
    width: number(14, 30),
    height: 14,
    style: { bg: rgb(), fg: rgb() },
    content: words().join(' ')
  }
}
var box = blessed.box({
  parent: screen,
  border: 'line',
  ...opts()
})
// blessed.colors.RGBToHex(
screen.render()

blessed.line({
  parent: screen,
  fg: 'black'
})
function rgb() {
  return blessed.colors.RGBToHex(number(0, 255), number(0, 255), number(0, 255))
  // return `rgb(${number(0, 255)},${number(0, 255)},${number(0, 255)})`;
}
// console.log(gradient);
// function opts() {
//   return {
//     top: number(4, 10), left: number(4, 10), width: number(14, 30), height: 14, style: { bg: rgb(), fg: rgb()}, content: words().join(' ')
//   }
// }
// // var box = blessed.box({
// //   parent: screen,
// //   border: 'line',
// //   ...opts()
// // })

// const boxes: Box[] = []
// for (let i = 0; i < screen.width-4; i+=4) {
//   for (let j = 0; j < screen.height-4; j+=4) {
//     var box = blessed.box({
//       parent: screen,
//       top: j, left: i,
//       border: 'line',
//      style: style()
//     })
//     boxes.push(box)
//   }
// }
// function style(){
//   return  { bg: rgb(), fg: rgb(), border: {fg: rgb()}}
// }

// let counter = 0
// function draw() {
//   boxes.forEach(box=>{

//     box.style= {...box.style, ...style()}
//   })
//   // box.top = number(1, 10)
//   // box.left = number(1, 10)
//   // box.height = number(5, screen.height - 11)
//   // box.width = number(5, screen.width - 11)
//   // box.style.bg = color()
//   // box.content = words(20).join(' ')
//   // box.once('render', ()=>{
//   // })
//   screen.render()
//   counter++
//   setTimeout(draw, 0)
// }

// var panel = blessed.box({
//   parent: screen, style: { bg: 'blue', fg: 'white' },
//   border: 'line', top: 0, left: 0, width: 10, height: 10, content: 'FPS'
// })
// let lastCounter = counter
// setInterval(() => {
//   panel.content = `FPS: ${counter - lastCounter}`
//   lastCounter = counter
// }, 1000);

// draw()

// // blessed.box({
// //   parent: screen,
// //   border: 'line',
// //   ...opts()
// // })
// // blessed.box({
// //   parent: screen,
// //   border: 'line',
// //   ...opts()
// // })
// // blessed.box({
// //   parent: screen,
// //   border: 'line',
// //   ...opts()
// // })
// // blessed.box({
// //   parent: screen,
// //   border: 'line',
// //   ...opts()
// // })
// // blessed.box({
// //   parent: screen,
// //   border: 'line',
// //   ...opts()
// // })

// // console.log('1',{bg: rgb(), fg: rgb()}, '2',  blessed.helpers.attrToBinary({bg: rgb(), fg: rgb()}, box),  '2', blessed.escape('{red-fg}{green-bg}{bold}w{/bold}{/green-bg}{/red-fg}'));

// // blessed.colors.convert
// installExitKeys(screen)
// screen.render()

// // const c = blessed.colors.colors()
// // for (let j = 0; j < screen.lines.length; j++) {
// //   for (let i = 0; i <  screen.lines[j].length; i++) {
// //     screen.lines[j][i] = [blessed.helpers.attrToBinary({bg: rgb(), fg: rgb()}, box), 'x']
// //   }
// // }
