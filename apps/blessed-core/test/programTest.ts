import {Program} from  '..'
const program = new Program({
})
program.setMouse({
  allMotion: true,
}, true);
program.alternateBuffer()
program.enableMouse()
program.key(['q', 'escape', 'C-c'], function () {
  program.showCursor()
  program.disableMouse()
  program.normalBuffer()
  program.reset()
  process.exit(0)
})
program.setBackground('green')
program.setForeground('red')
program.on('mouse', function (data) {
  program.cup(data.y, data.x);
  program.write('X');
  // program.write('as', 'red fg');
  // program.cup(0, 0);
});