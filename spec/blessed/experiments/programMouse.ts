import * as blessed from 'blessed'
import * as util from 'util'
import { sleep } from 'misc-utils-of-mine-generic';
// , program;

const program = blessed.program({
  log: 'log.txt',
  warnings: true
})
program.setMouse({
  allMotion: true,
  // utfMouse: true,
  // urxvtMouse: true
}, true);
program.alternateBuffer()
program.enableMouse()

mouseDemo();
resizeFocusBlurDemo();
program.key(['q', 'escape', 'C-c'], function () {
  program.showCursor()
  program.disableMouse()
  program.normalBuffer()
  process.exit(0)
})

// program.enableGpm()
// program.hideCursor()

// program.on('response', e=>program.log('response', e, program.gpm))
// program.input.on('data', e=>program.log('LSLSLSLS', e.toString()))

// program.log('GPM', program.gpm)
// program.input.on('*', e=>program.log('LSLSLSLS', e))

// response
// winch cols rows
// 

// program._currentMouse.sendFocus = true;
// program.enableMouse(program._currentMouse);
// program.write('\x1b[?1004h');



// // program.setMode(data.y, data.x);
// program.write(' ', 'blue bg');
// program.write('as', 'red fg');
// program.cup(0, 0);

function resizeFocusBlurDemo() {
  program.setMouse({ sendFocus: true }, true)
  program.on('resize', function (data) {
    setTimeout(function () {
      program.clear();
      program.cup(0, 0);
      program.write('resize', util.inspect({ cols: program.cols, rows: program.rows }));
    }, 200);
  });
  process.on('SIGWINCH', function (data) {
    setTimeout(function () {
      program.cup(1, 0);
      program.write(util.inspect({ winch: true, cols: program.cols, rows: program.rows }));
    }, 200);
  });
  program.on('focus', function (data) {
    program.clear();
    program.cup(0, 0);
    program.write('FOCUSIN', data);
  });
  program.on('blur', function (data) {
    program.clear();
    program.cup(0, 0);
    program.write('FOCUSOUT', data);
  });
}
windowManipuationDemo();

function mouseDemo() {
  program.setBackground('green', 'O')
  program.setForeground('red', 'i')
  program.on('mouse', function (data) {
    // program.write('mouse', util.inspect(data));
    program.cup(data.y, data.x);
    program.write(' ', 'blue bg');
    program.write('as', 'red fg');
    program.cup(0, 0);
  });
}
mouseDemo()




function windowManipuationDemo() {
  program.getCursor(function (err, data) {
    // program.log('getCursor', data);
    program.write(util.inspect(data));
  });
  // program.on('keypress', function (ch, data) {
  //   if (data.name === 'mouse')
  //     return;
  //   program.clear();
  //   program.cup(0, 0);
  //   program.write(util.inspect(data));
  // });
  // program.manipulateWindow(2, function (err: any, data: any) {
  //   // program.write(util.inspect(data));
  //   program.log('manipulateWindow', data);
  // });
  program.getWindowSize(function (err: any, data: any) {
    program.log('getWindowSize', data);
  });
}

// setCursorStyleDemo();
function setCursorStyleDemo() {
  program.showCursor();
  program.setCursorStyle(1);
  setTimeout(() => {
    program.setCursorStyle(2);
  }, 9000);
  setTimeout(() => {
    program.setCursorStyle(4);
  }, 3000);
  setTimeout(() => {
    program.setCursorStyle(3);
  }, 6000);
}


function manipulateWindowDemo() {
  try {
  program.write('MINIMIZING IN 2 seconds')
  setTimeout(() => {
    program.manipulateWindow(2, (err, data)=>{
      program.log(data);
    })
  }, 2000)

  setTimeout(() => {
    program.manipulateWindow(1, (err, data)=>{
      program.log(data);
    })
  }, 4000)

} catch (error) {
 program.log('manipulateWindowDemo', error) 
}
}
// manipulateWindowDemo()