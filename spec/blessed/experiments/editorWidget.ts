import * as blessed from 'blessed'
var Point = require('text-buffer/lib/point');
var Range = require('text-buffer/lib/range');

const Editor = require('editor-widget')

const screen = blessed.screen({ smartCSR: true, title: 'editor-widget example' })

screen.key(['C-c'], (ch, key) => {
  process.exit(0)
})

const editor = new Editor({
  // normal blessed widget, use like you would any other blessed element
  parent: screen,
  mouse: true,
  keys: true,
  focusable: true,
  clickable: true,
  input: true,
  keyable: true,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})
// screen.render()
// editor.open(filePath)
// screen.key(['C-s'], (ch, key) => {
//   editor.save('file.js')
// })
screen.render()

this.editor.textBuf.setText(`function (){
  return 1
screen.render()
}`)
screen.render()
this.editor.language('js')
this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
screen.render()

editor.focus()

// screen.render()

screen.render()

// this.editor.once('focus', e=>{

// this.screen.emit('key enter', undefined, {name: 'enter'})
// this.screen.emit('keypress enter', undefined, {name: 'enter'})
// this.screen.emit('keypress space', ' ', {name: 'space'})
// this.screen.emit('keypress', ' ', {name: 'space'})
//   debug('focus', Object.keys(Editor.prototype))
// })

setTimeout(() => {
//   editor.focus()

screen.render()
this.editor.textBuf.setText(`function (){
  return 1
}`)
this.editor.language('js')
this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))

  this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
screen.render()

}, 1000);

