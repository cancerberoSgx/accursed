// compile it with 
// mkdir -p tmp; browserify spec/blessed/experiments/browser/test1.js --ignore-missing -o tmp/bundle.js

//@ts-nocheck
var blessed = require("blessed");
var termJs = require('term.js')

//@ts-ignore
window.onload = function () {
  var term = new termJs.Terminal({
    cols: 80,
    rows: 24,
    useStyle: true,
    screenKeys: true
  });
  //@ts-ignore
  term.open(document.body);
  term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n');

  // glue to make blessed work in browserify
  term.columns = term.cols;
  term.isTTY = true;
  require('readline').emitKeypressEvents = function () { };  // Can I side-affect a module this way? Apparently.
  process.listeners = function fakelisteners() { return []; };

  term.resize(100, 36);
  var program = blessed.program({ input: term, output: term, tput: false });

  program.move(1, 1);
  program.bg('black');
  program.write('Hello world', 'blue fg');
  program.setx((program.cols / 2 | 0) - 4);
  program.down(5);
  program.write('Hi again!');
  program.bg('!black');
  program.feed();
};