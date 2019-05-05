//@ts-nocheck

const Program = require('../src/blessed/program') 
const program = Program({
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
program.setBackground('green', 'O')
program.setForeground('red', 'i')
program.on('mouse', function (data) {
  program.cup(data.y, data.x);
  program.write(' ' );
});