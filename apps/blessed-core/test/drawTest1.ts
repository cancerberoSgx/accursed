import { Program } from '..'
import { number } from '../spec/data'
import { sleep } from 'misc-utils-of-mine-generic'

const program = new Program({
})

program.key(['q', 'escape', 'C-c'], function () {
  program.showCursor()
  program.disableMouse()
  program.normalBuffer()
  program.reset()
  process.exit(0)
})
  ;

(async () => {

  for (var i = 0; i < program.cols; i++) {
    for (let j = 0; j < program.rows; j++) {
      program._write(program.setab(number(0, 7)) + 'X' + program.sgr0())
    }
  }
  await sleep(1000)
  program.clear()
  program._write(program._attr('green fg', true) + 'GREEN' +
    program._attr('green fg', false) + ' NORMAL')

  program._write('\n\n' + program._attr(['yellow fg', 'bold', 'blue bg'], true) + 'bg, fg, bold' +
    program._attr('default fg', true) + ' No FG ' +
    program._attr('default bg', true) + ' No BG ' +
    program._attr('bold', false) + ' No bold '
  )

})()
// program.setMouse({
//   allMotion: true,
// }, true);

// program.write(program.columns +' -- '+ program.cols+ ' ----')


// for (let j = 0; j < program.rows; j++) {
//   program.write('X')    
// }

// program.alternateBuffer()
// program.enableMouse()