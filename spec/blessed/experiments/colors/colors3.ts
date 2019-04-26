import * as blessed from 'blessed'
import { repeat } from 'misc-utils-of-mine-generic'
import { installExitKeys } from '../../../../src'

var screen = blessed.screen({
  dockBorders: true,
  ignoreDockContrast: true
})

installExitKeys(screen)
screen.render()

function pickerMapTest2() {
  // const style = require('ansi-styles');
  // console.log(style.bgColor.ansi.hsl(120, 80, 72) + 'Hello world!' + style.bgColor.close);
  var r = 0,
    g = 0,
    b = 0
  var step = 2

  function roundX(n: number) {
    return Math.round(n * (screen.width / 255))
  }
  function roundY(n: number) {
    return Math.round(n * (screen.height / 255))
  }
  // const W =Math.round( screen.width*(255/screen.width))
  // const H =Math.round( screen.height*(255/screen.height))
  function buildColor(a: number, b: number, priority: string) {
    if (priority === 'g') {
      return blessed.colors.match([a, b, a + b - 255])
    }
    if (priority === 'r') {
      return blessed.colors.match([b, a + b - 255, a])
    }
    if (priority === 'b') {
      return blessed.colors.match([a + b - 255, a, b])
    }
  }

  // function drawColor(){
  for (r = 0; r < 255 - step + 1; r += step) {
    for (g = 0; g < 255 - step + 1; g += step) {
      blessed.box({
        parent: screen,
        left: roundX(g),
        top: roundY(r),
        width: roundX(step),
        height: roundY(step),
        style: { bg: buildColor(r, g, 'r') }
      })

      // for (b = 0; b < 255 - step + 1; b += step) {
      // }
      // debug(r,g,b)
      // blessed.box({parent: screen, left: r, top: g, width: step, height: step, style: {bg: blessed.colors.match([r,g,b])}})

      // process.stdout.write(style.color.ansi256.rgb(r, g, b) + repeat(step, '#') + style.color.close);
      // c.fillStyle= style.color.ansi256.rgb(r,g,b)
      //  c.fillStyle=[r,g,b] as any
      //  c.fillStyle=blessed.colors.match([r,g,b]) as any
      //  c.fillStyle=blessed.colors.match("rgb("+r+","+g+","+b+")") as any
      // c.fillStyle="rgb("+r+","+g+","+b+")";
      // c.fillRect(r,g,step,step);
      // }
      // process.stdout.write('\n');
    }
  }
  // process.exit(0);
}

// window.onload = function(){
//   colorPicker();
// }

// function colorPicker(){
//   var canvas = document.getElementById("colDisp"),
//   frame = canvas.getContext("2d");

// var r=0,
// g=0,
// b= 0;

// function drawColor(){
//  for(r=0;r<255;r++){
//     for(g=0;g<255;g++){
//        for(b=0;b<255;b++){
//           frame.fillStyle="rgb("+r+","+g+","+b+")";
//           frame.fillRect(r,g,1,1);
//        }
//     }
//  }
// }
// drawColor();

pickerMapTest2()
// test3()
screen.render()

function test3() {
  function roundX(n: number) {
    return Math.round(n * (screen.width / 255))
  }
  function roundY(n: number) {
    return Math.round(n * (screen.height / 255))
  }
  // var width = canvas.width;
  // var height = canvas.height;
  // var imagedata = frame.createImageData(width, height);

  // var r = 0, g = 0, b = 0;
  var step = 13
  var index, x, y
  const style = require('ansi-styles')

  // for (x = 0; x < screen.width; x++) {
  //     for (y = 0; y < screenheight; y++) {

  for (x = 0; x < screen.width - step + 1; x += step) {
    for (y = 0; y < screen.height - step + 1; y += step) {
      process.stdout.write(style.bgColor.ansi.rgb(y, x, x + y - 255) + `${x}, ${y}` + style.bgColor.close)

      // console.log(x, y);

      //       index = (x * screen.width + y) * 4;
      // blessed.box({parent: screen, left: roundX(x), top: roundY(y), width: roundY(step), height: roundY(step), style: {bg: blessed.colors.match([x, y, x + y - 255])}})

      // imagedata.data[index + 0] = x;
      // imagedata.data[index + 1] = y;
      // imagedata.data[index + 2] = x + y - 255;
      // imagedata.data[index + 3] = 255;
    }
  }

  // frame.putImageData(imagedata, 0, 0);
}

function pickerMapTest1() {
  const style = require('ansi-styles')
  console.log(style.bgColor.ansi.hsl(120, 80, 72) + 'Hello world!' + style.bgColor.close)
  var r = 0,
    g = 0,
    b = 0
  var step = 40
  // function drawColor(){
  for (r = 0; r < 255 - step + 1; r += step) {
    for (g = 0; g < 255 - step + 1; g += step) {
      for (b = 0; b < 255 - step + 1; b += step) {
        process.stdout.write(style.color.ansi256.rgb(r, g, b) + repeat(step, '#') + style.color.close)
        // c.fillStyle= style.color.ansi256.rgb(r,g,b)
        //  c.fillStyle=[r,g,b] as any
        //  c.fillStyle=blessed.colors.match([r,g,b]) as any
        //  c.fillStyle=blessed.colors.match("rgb("+r+","+g+","+b+")") as any
        // c.fillStyle="rgb("+r+","+g+","+b+")";
        // c.fillRect(r,g,step,step);
      }
      process.stdout.write('\n')
    }
  }
  process.exit(0)
}
