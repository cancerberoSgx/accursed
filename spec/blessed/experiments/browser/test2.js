//@ts-nocheck

// adapted from https://gist.github.com/risacher/b5148900b488192a1719
// compile it with 
// mkdir -p tmp; browserify spec/blessed/experiments/browser/test1.js --ignore-missing -o tmp/bundle.js

var blessed = require("blessed");
var termJs = require('term.js')

window.onload = function () {
  var term = new termJs.Terminal({
    cols: 80,
    rows: 24,
    useStyle: true,
    screenKeys: true
  });
  term.open(document.body);
  term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n');

  // glue to make blessed work in browserify
  term.columns = term.cols;
  term.isTTY = true;
  require('readline').emitKeypressEvents = function () { };  // Can I side-affect a module this way? Apparently.
  process.listeners = function fakelisteners() { return []; };
  term.resize(100, 36);
  const screen = blessed.screen({input: term, output: term, tput: false})
  var form = blessed.form({
    parent: screen,
    keys: true,
    left: 0,
    top: 0,
    width: 30,
    height: 4,
    bg: 'green',
    content: 'Submit or cancel?'
  })
  const common = {
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    style: {
      bg: 'blue',
      focus: {
        bg: 'red'
      },
      hover: {
        bg: 'red'
      }
    }
  }
  var submit = blessed.button({
    ...common,
    parent: form,
    left: 10,
    top: 2,
    name: 'submit',
    content: 'submit',
  })
  var cancel = blessed.button({
    ...common,
    parent: form,
    left: 20,
    top: 2,
    name: 'cancel',
    content: 'cancel',
  })
  submit.on('press', function() {
    form.submit()
  })
  cancel.on('press', function() {
    form.reset()
  })
  form.on('submit', function(data) {
    form.setContent('Submitted.')
    screen.render()
  })
  form.on('reset', function(data) {
    form.setContent('Canceled.')
    screen.render()
  })
  screen.key('q', function() {
    screen.destroy()
  })
  screen.render()
};