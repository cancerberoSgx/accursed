// import { debug } from '../../../src';
// import { ansi } from 'cli-driver';
// import { format } from 'ansi-escape-sequences';

// var Canvas = require('./drawille-canvas') as Context
// // import {DContext} from './drawille-canvas'
// const now = require('performance-now')

// // const Canvas : Context = DContext as any
// interface Context {
//   new (w: number, height: number): HTMLCanvasElement
//   width: number
//   height: number
// }

// var n = 20
// var a = 40
// var t = 2
// var pi = Math.PI
// var pi2 = pi / 2
// var sin = Math.sin
// var cos = Math.cos

// var flush: Function
// //@ ts-ignore
// var canvas = new Canvas(200, 100)
// // canvas
// // canvas.

// var c = canvas.getContext('2d')!

// if (typeof document !== 'undefined') {
//   document.body.appendChild(canvas)
//   flush = function() {}
// } else {

// var differ = require('ansi-diff-stream')
// var diff = differ()

// diff.pipe(process.stdout)

//   flush = function() {
//     diff.write(c.toString())
//     // console.log(c.toString())
//   }
// }

// // var sunX = canvas.width - 20
// // c.font = '17px sans-serif'
// // c.fillText('☼', sunX, 20, 20)
// // var sunData = c.getImageData(sunX, 1, 15, 20)

// // Test image data
// // c.fillRect(0,0,400,400);
// // var data = c.getImageData(10, 10, 20, 20);
// // canvas.clearRect(0,0,canvas.width,canvas.height);
// // canvas.putImageData(data, 0, 10);
// // console.log(canvas.toString());

// function draw() {
//   var w = canvas.width / 2
//   var start = now()

//   // Test performance
//   // c.fillRect(-100, -100, 5000, 5000);
//   // var end = now();
//   // console.log(end - start);

//   c.clearRect(0, 0, canvas.width, canvas.height)
//   c.save()
// // c.fillStyle = "#FF0000"
//   c.translate(w, w)
//   for (var i = 1; i < n; i++) {
//     var r = i * (w / n)
//     c.beginPath()
//     c.moveTo(-r, 0)
//     var tt = (start * pi) / 1000 / t
//     var p = (sin(tt - (pi * (cos((pi * i) / n) + 1)) / 2) + 1) * pi2
//     for (var j = 0; j < a; j++) {
//       var ca = (pi * j) / (a - i)
//       if (p > ca) {
//         c.lineTo(-cos(ca) * r, -sin(ca) * r)
//       } else {
//         c.lineTo(-cos(p) * r, -sin(p) * r)
//       }
//     }
//     c.stroke()
//   }
//   c.restore()

//   c.strokeRect(0, 0, canvas.width, canvas.height)

// //@ts-ignore
//   c._canvas.content.forEach((v, i)=>{
// //@ts-ignore
//     c._canvas.content[i] =format('red', c._canvas.content[i])
// //@ts-ignore
//   })

//   // c.strokeRect(21, 11, 22, 23)
//   //shift sun
//   // sunX = (sunX + 1) % canvas.width
//   // c.putImageData(sunData, sunX, 1)

//   flush()

//   // counter++
//   // setTimeout(draw, 0)
// }
// // let counter=0
// // let lastCounter = 0
// draw()
// // setInterval(()=>{
// //   debug('FPS: ', counter-lastCounter);
// // lastCounter = counter
// // }, 1000)
