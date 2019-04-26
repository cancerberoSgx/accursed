import { Context_ } from './drawille-blessed-contrib'
import { Context2 } from './drawille-canvas'

var Canvas = require('./drawille-canvas') as Context_
var differ = require('ansi-diff-stream')

var W = 280,
  H = 260

var { context: c, flush } = createCanvas(W, H)

function createCanvas(w: number, h: number) {
  var flush: () => void
  var context: CanvasRenderingContext2D & Context2 & Context_
  if (typeof document == 'undefined') {
    context = new Canvas(w, h) as any
    var diff = differ()
    diff.pipe(process.stdout)
    flush = function() {
      diff.write(context._canvas.frame())
    }
  } else {
    //@ts-ign ore
    context = (document.getElementById('canvas') as any).getContext('2d')
    context.scale(2, 2)
    flush = function() {}
  }
  return { context: context!, flush }
}

const style = require('ansi-styles')
example2()

function example2() {
  // c.strokeRect(0, 0, w*2, w*2);
  c.clearRect(0, 0, W, H)

  var r = 0,
    g = 0,
    b = 0
  var step = 10
  // function drawColor(){
  for (r = 0; r < 255 - step; r += step) {
    for (g = 0; g < 255 - step; g += step) {
      for (b = 0; b < 255 - step; b += step) {
        c.fillStyle = style.color.ansi256.rgb(r, g, b)
        c.fillStyle = [r, g, b] as any
        //  c.fillStyle=blessed.colors.match([r,g,b]) as any
        //  c.fillStyle=blessed.colors.match("rgb("+r+","+g+","+b+")") as any
        // c.fillStyle="rgb("+r+","+g+","+b+")";
        c.fillRect(r, g, step, step)
      }
    }
  }
  // }
  // drawColor();

  // // c.strokeStyle=7//[200,100,100];
  //   // c.strokeStyle=[11,222,222];
  //   c.strokeStyle=[200,100,100]
  //   c.beginPath();
  //   c.rect(20,20,30,30)
  //   c.stroke()
  // // c.strokeStyle= 200,100,100];
  // // c.fillStyle = 4
  //   var centerX=20;
  //   var centerY=20;
  //   var radius=60;

  //   c.fillStyle = blessed.colors.match('#ed6611') as any
  //   c.fillText('X: hdhd', 10, 20);
  //   c.fillRect(0,0,23,23);
  //   flush();

  //   c.fillStyle = blessed.colors.match('#22aaff') as any
  //   c.fillText('jshsojshd', 30, 20);
  //   c.fillRect(23,23,23,23);
  //   flush();

  //   c.save();
  //   // A complete circle drawn using the "arc" command

  //   c.beginPath();
  //   c.moveTo(30, 30);
  //   c.stroke();

  //   var startingRadianAngle=Math.PI*2*0.5;  // start at 90 degrees == centerY+radius
  //   var endingRadianAngle=Math.PI*2*.75;  // end at 270 degrees (==PI*2*.75 in radians)
  //   c.beginPath();
  //   c.arc(centerX, centerY, radius,  startingRadianAngle, endingRadianAngle);
  //   c.stroke();

  //   var startingRadianAngle=0;       // start at 0 degrees
  //   var endingRadianAngle=Math.PI*2; // end at 360 degrees (==PI*2 in radians)

  //   // A partial circle (i.e. arc) drawn using the "arc" command
  //   c.beginPath();
  //   c.arc(centerX+3, centerY+5, radius,  startingRadianAngle, endingRadianAngle);
  //   c.stroke();

  c.restore()
  flush()
}

// example1()
function example1() {
  var n = 20
  var a = 40
  var t = 2
  var pi = Math.PI
  var pi2 = pi / 2
  var sin = Math.sin
  var cos = Math.cos
  function draw() {
    c.strokeStyle = [200, 100, 100]
    var now = Date.now() / 1000
    c.clearRect(0, 0, W * 2, W * 2)
    c.save()
    c.translate(W, W)
    for (var i = 1; i < n; i++) {
      var r = i * (W / n)
      c.beginPath()
      c.moveTo(-r, 0)
      var tt = (now * pi) / t
      var p = (sin(tt - (pi * (cos((pi * i) / n) + 1)) / 2) + 1) * pi2
      for (var j = 0; j < a; j++) {
        var ca = (pi * j) / (a - i)
        if (p > ca) {
          c.lineTo(-cos(ca) * r, -sin(ca) * r)
        } else {
          c.lineTo(-cos(p) * r, -sin(p) * r)
        }
      }
      c.stroke()
    }
    c.restore()
    flush()
  }

  setInterval(draw, 1000 / 30)
}
