import * as blessed from 'blessed'

var screen = blessed.screen({
  smartCSR: true,
  forceUnicode: true,
  fullUnicode: true
})

var main = blessed.box({
  parent: screen,
  left: 'center',
  top: 'center',
  width: '90%',
  height: '90%',
  border: 'line',
  draggable: true,
  tags: true,
  content: `🇦🇨 ${blessed.unicode.fromCodePoint(0x1f1fd)} Hello: {/}  

已经找到解决办法

let screen = blessed.screen({
  fullUnicode: true
});

● ⦿ ●
  `,
  scrollable: true,
  alwaysScroll: true,
  keys: true,
  vi: true,
  mouse: true
})

main.focus()

screen.key('q', function() {
  return screen.destroy()
})

screen.render()
