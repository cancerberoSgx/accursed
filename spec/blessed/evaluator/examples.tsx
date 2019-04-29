export const examples = [
  {
    name: 'simple1',
    code: `

// HEADS UP: In order to run, examples must declare a single function
// that receives an options object that provides necessary
// dependencies, most relevant, the parent element and the accursed
// namespace from which you can access all blessed and accursed
// utilities. 
// It also provides with a log() function that prints any kind of 
// objects in the Logs panel as console.log() would.

function simple1({parent, accursed, log}) {
  log('starting')
  const b = accursed.box({
    parent: parent,
    content: '{bold}Hello {red-fg}{green-bg}world{/}\\nHow are you today ?',
    tags: true,
    align: 'center', 
    valign: 'middle',
    height: '100%', 
    width: '100%',
    style: {
      bg: '#cdabc9',
      fg: 'black'
    }
  })
  log('finish')
}
      `.trim()
  },
  {
    name: 'simpleAnim',
    code: `
function simpleAnim(options) {
  options.log('starting')
  const b = options.accursed.box({
    parent: options.parent,
    content: 'hello world',
    height: 2, width: 6, top: 0, left: 0,
    style: {
      bg: 'red'
    }
  })
  return new Promise(resolve=>{
    const timer = setInterval(() => {
      b.top++
      b.left++
      b.width++
      b.height++
      options.log(b._getCoords())
      options.parent.screen.render()
      if (b.top > options.parent.height - b.height ||
        b.left > options.parent.width - b.width) {
        clearInterval(timer)
        resolve()
      }
    }, 10)
    options.parent.screen.render()
  })
}
      `.trim()
  },
  {
    name: 'fileManager1',
    code: `   
function simple1({accursed, parent, log}) {
  log('starting')
  const fm = accursed.filemanager({
    parent: parent,
    border: 'line',
    style: {
      selected: {
        bg: 'blue'
      }
    },
    height: 'half',
    width: 'half',
    top: 'center',
    left: 'center',
    label: ' {blue-fg}%path{/blue-fg} ',
    cwd: process.env.HOME,
    keys: true,
    focusable: true,
    scrollbar: {
      bg: 'white',
      ch: ' '
    }
  })
  fm.pick('.', function () {
    log(arguments)
  })
  parent.screen.render()
  var box = accursed.box({
    parent: parent,
    style: {
      bg: 'green'
    },
    border: 'line',
    height: 'half',
    width: 'half',
    top: 'center',
    left: 'center',
    hidden: true
  })
  fm.refresh()
  parent.once('focus', ()=>log('focus'))
  parent.screen.render()
  parent.screen.key(['s', 'p'], function () {
    fm.hide()
    parent.screen.render()
    setTimeout(function () {
      fm.pick(function (err, file) {
        box.show()
        box.setContent(err ? err + '' : file)
        parent.screen.render()
        setTimeout(function () {
          box.hide()
          fm.reset(function () {
            fm.show()
            parent.screen.render()
          })
        }, 2000)
      })
    }, 2000)
  })
  parent.screen.render()
}  
      `
  },
  {
    name: 'allColors',
    code: `
function allColors({parent, accursed, log}) {
  var dx = 9
  let colorStep = 20
  var dy = 3
  let showText = true
  let x = 0, y = 1
  accursed.text({
    parent,
    top: y,
    left: 0,
    content: 'Scroll this box using the mouse wheel or up-down arrows'
  })
  y += dy
  for (let r = 0; r < 255; r += colorStep) {
    for (let g = 0; g < 255; g += colorStep) {
      for (let b = 0; b < 255; b += colorStep) {
        const color = accursed.colors.RGBToHex(r, g, b)
        accursed.box({
          parent,
          top: y,
          left: x,
          width: dx,
          height: dy,
          valign: 'middle',
          align: 'center',
          content: showText ? color : '',
          style: { bg: color, fg: showText ? invertColor(color) : undefined }
        });
        if (x >= parent.width - dx * 2) {
          x = 0;
          y += dy;
        }
        else {
          x += dx;
        }
      }
    }
  }
  parent.screen.render()
  function invertColor(hex) {
    function padZero(str, len) {
      len = len || 2
      var zeros = new Array(len).join('0')
      return (zeros + str).slice(-len)
    }
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1)
    }
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.')
    }
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16), 
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16), 
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
    return '#' + padZero(r) + padZero(g) + padZero(b)
  }
}
  `
  },
  {
    name: 'borders',
    code: `
function borders({accursed, parent}){
  const number = (a = 10, b = a) => Math.floor(Math.random() * b) + (a === b ? 0 : a)
  function color() {
    const colors = ['red', 'blue', 'cyan', 'green', 'magenta', 'yellow', 'brown']
    return colors[number(0, colors.length - 1)]
  }
  const l = accursed.layout(  {  
    parent, 
    width: '100%', 
    height: '100%'
  })
  accursed.borderStyles.map(style =>{
    accursed.borderBox({
      parent: l,
      borderStyle: style,
      label: style,
      style: { label: { fg: color() }, border: { fg: color() } },
      width: 12, 
      height: 7,
      content: 'using border style '+style
    })
  })
}
`
  },

  {
    name: 'terminal capabilities',
    code: `

function listCapabilities(options) {
  function enumKeys(anEnum) {
    const a = []
    for (let i in anEnum) {
      a.push(i)
    }
    return a
  }
  const commonOptions = () => ({
    border: 'line',
    width: '30%',
    parent: options.parent,
    align: 'center',
    tags: true,
    height: '90%',
    top: 0,
    keys: true,
    focusable: true,
    draggable: true,
    mouse: true,
    scrollbar: { inverse: true }, 
    style: {
      border: {
        fg: 'red'
      },
      header: {
        fg: 'blue',
        bg: '#446611',
        bold: true,
      },
      cell: {
        selected: {
          bg: 'blue'
        },
      },
      focus: {
        bold: true,
        underline: true,
        border: {
          fg: 'green',
        },
        cell: {
          bg: 'lightgray',
          fg: 'black',
        },
        header: {
          fg: '#880055',
          bg: 'gray'
        }
      }
    }
  });
  const FALSE = '\u2717';
  const TRUE = '\u2714';
  options.accursed.listtable({
    ...commonOptions(),
    left: 0,
    label: { side: 'center', text: 'Capability' },
    data: [
      ['Capability', 'Supported?'],
      ...enumKeys(options.accursed.BlessedTerminalCapabilitiesBooleans)
        .map(c => [c, options.parent.screen.program.has(c) ? TRUE : FALSE])
    ],
  });
  options.accursed.listtable({
    ...commonOptions(),
    left: '33%',
    label: { side: 'center', text: 'Capability' },
    data: [
      ['Capability', 'Supported?'],
      ...enumKeys(options.accursed.BlessedTerminalCapabilitiesStrings)
        .map(c => [c, options.parent.screen.program.has(c) ? TRUE : FALSE])
    ],
  });
  options.accursed.listtable({
    ...commonOptions(),
    left: '66%',
    label: { side: 'center', text: 'Capability' },
    data: [
      ['Capability', 'Supported?'],
      ...enumKeys(options.accursed.BlessedTerminalCapabilitiesBooleansNnmbers)
        .map(c => [c, options.parent.screen.program.has(c) ? TRUE : FALSE])
    ]
  });

 setTimeout(()=>{
  const modal = accursed.box({
    parent: options.parent, padding: 1,
    top:'center',left: 'center', width: '60%', height: '70%',
    style: {bg: '#995599', fg: 'black' },
    border: 'line', label: '[ X Close ]', 
    content: \`
Welcome! 

These three tables display this terminal's capabilities. 

Switch focus using [TAB] or [CONTROL-LEFT] [CONTROL_RIGHT] and scroll using [UP] and [DOWN] arrow keys or the mouse wheel. You can also drag the lists.

Probably you will need to maximize the terminal and the output panel to see the whole content. 

This is an blessed application example using listtable widget and styles for focused elements.

Hope it helps a developer to better understand blessed API. 

  -- Sebastián Gurin
\`.trim()
})

options.parent.children.forEach(c=>c.once('keypress', ()=>modal.hide()))
options.parent.once('keypress', ()=>modal.hide())
options.parent.once('click', ()=>modal.hide())
modal.once('click', ()=>modal.hide())
modal._label.once('click', ()=>modal.hide())
options.parent.screen.once('keypress', ()=>modal.hide())  

options.parent.children.filter(options.accursed.isElement).find(c=>c.type==='listtable').focus()
options.parent.screen.render()
}, 1000);

options.parent.children.filter(c=>c.type==='listtable')
.forEach(c=>{c.focused = true, c.on('focus', ()=>c.setFront())})
options.parent.screen.render()
}
    `
  }
]
