import * as blessed from 'blessed'
// import * as blessed from 'blessed'

const Editor = require('editor-widget');

const screen = blessed.screen({smartCSR: true, title: "editor-widget example"});
const editor = new Editor({
  // normal blessed widget, use like you would any other blessed element
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
});

const filePath = './file.txt';
editor.open(filePath);
screen.key(['C-s'], (ch, key) => { editor.save(filePath); });

screen.key(['escape', 'q', 'C-c'], (ch, key) => { process.exit(0); });
screen.render();