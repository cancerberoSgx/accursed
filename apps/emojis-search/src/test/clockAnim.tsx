import { React, screen } from 'accursed'

function charCodeHexString(s: string) {
  return s
    .split('')
    .map(s => s.charCodeAt(0).toString(16))
    .map(n => `\\u${n}`)
    .join('')
}

var screen2 = screen({
  autoPadding: false,
  // smartCSR: true, forceUnicode: true,
  fullUnicode: true
})

const t1 = React.render(<text parent={screen2} content=" " width={1} height={1} top={0} left={0} />)
const t2 = React.render(<text parent={screen2} content=" " width={1} height={1} top={1} left={3} />)

const frames = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚']
const frames2 = ['🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥'] //,'🕦','🕧']
let counter = 0
setInterval(() => {
  t1.setContent(frames[counter])
  t2.setContent(frames2[counter])
  counter = counter >= frames.length - 1 ? 0 : counter + 1
  screen2.render()
}, 100)

screen2.key('q', function() {
  return screen2.destroy()
})

screen2.render()
