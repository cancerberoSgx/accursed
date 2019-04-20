The important part is how to load blessed screen or program using term.js as input/output:

## test.js

```js
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

  // the rest is just blessed widgets, in this case the form example:

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

```

## Browserify

```sh
browserify test.js --ignore-missing -o bundle.js
```

### Notes

 * Perhaps you need to install "term.js"  `npm i term.js`

### compile as external

If you will have several pages using blessing, perhaps is better to build blessed and term.js as separate files: 


```sh
browserify -r blessed --ignore-missing -o dist/blessed.js
browserify -r term.js --ignore-missing -o dist/termjs.js
browserify -x blessed -x term.js example.js --ignore-missing -o dist/example.js
```

Then in you test.html file you just include the three scripts

```html
<body>
  <script src="blessed.js"></script>
  <script src="termjs.js"></script>
  <script src="test2.js"></script>
</body>
```