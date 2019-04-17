import { React, screen, Div, filterDescendants, isElement } from '../../../src'
import * as util from 'util'

// function charCodeHexString(s: string) {
//   return s
//     .split('')
//     .map(s => s.charCodeAt(0).toString(16))
//     .map(n => `\\u${n}`)
//     .join('')
// }

var s = screen({
  log: 'log.txt',
  
  // autoPadding: false,
  warnings: true,
  smartCSR: true, 
  forceUnicode: true,
  fullUnicode: true
})


const t1 = React.render(<text parent={s} content=" " width={1} height={1} top={0} left={0} />)
const t2 = React.render(<text parent={s} content=" " width={1} height={1} top={1} left={3} />)
React.render(<Div height="88%" width="77%" parent={s} >

const frames = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚']
const frames2 = ['🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥'] //,'🕦','🕧']


const frames = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚']
const frames2 = ['🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥'] //,'🕦','🕧']
let counter = 0
setInterval(() => 
  t1.setContent(frames[counter])
  t2.setContent(frames2[counter])
  counter = counter >= frames.length - 1 ? 0 : counter + 1
  screen2.render()
}, 100)

screen2.key('q', function()
  return screen2.destroy()

sensdn


</Div>)
s.render()

setInterval(() => {
  s.program.write(filterDescendants(screen as any, isElement).map(e=>e.type).length+'')
  s.program.write(Math.random()+'')

}, 2222);

// screen2.getScreenLines()

s.key('q', function() {
  return s.destroy()
})

// const p = screen2.program
// p.write(util.inspect(filterDescendants(screen as any, isElement).map(e=>e.type)))

s.log(util.inspect(filterDescendants(screen as any, isElement).map(e=>e.type)))
s.log(filterDescendants(screen as any, isElement).map(e=>e.type).length)
console.log(s.lines);



// screen2.on('mousemove', (data, o)=>{
//   if(data.action==='click'){

//   }
//   p.write('mouse', util.inspect({data, a: 2312, g: '12'}))
  
//   p.write(util.inspect({data, a: 2312, g: '12'}))
//   p.cup(0, 0)
  
// })



// function windowManipuationDemo() {
//   p.getCursor(function(err, data) {
//     // program.log('getCursor', data);
//     p.write(util.inspect(data))
//   })
//   p.getWindowSize(function(err: any, data: any) {
//     p.log('getWindowSize', data)
//   })
// }


// setInterval(()=>{
//   p.getCursor((err, data)=>{
//     // p.write('getCursor', util.inspect({data, a: 2312, g: '12'}))
//     p.write(util.inspect(data))
//     // p.cup(0, 0)
//   })
// },1500)


// const program = p

// program.setMouse(
//   {
//     allMotion: true
//     // utfMouse: true,
//     // urxvtMouse: true
//   },
//   true
// )


// program.alternateBuffer()
// program.enableMouse()

// mouseDemo()
// // resizeFocusBlurDemo()
// // program.key(['q', 'escape', 'C-c'], function() {
// //   program.showCursor()
// //   program.disableMouse()
// //   program.normalBuffer()
// //   process.exit(0)
// // })

// program.enableMouse()
// program.enableGpm()

// function mouseDemo() {
//   program.setBackground('green', 'O')
//   program.setForeground('red', 'i')
//   program.on('mouse', function(data) {
//     // program.write('mouse', util.inspect(data));
//     program.cup(data.y, data.x)
//     program.write(' ', 'blue bg')
//     program.write('as', 'red fg')
//     program.cup(0, 0)
//   })
// }
// mouseDemo()




