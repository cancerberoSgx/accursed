function simple1(options) {
  options.log('starting')
  const b = options.accursed.box({
    parent: options.parent,
    content: '{bold}Hello {red-fg}{green-bg}world{/}\nHow are you today ?',
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
  options.log('finish')
}
export const examples = [
  {
    name: 'simple1',
    code: `
function simple1(options) {
  options.log('starting')
  const b = options.accursed.box({
    parent: options.parent,
    content: '{bold}Hello {red-fg}{green-bg}world{/}\\nHow are you today ?',
    tags: true,
    align: 'center', 
    valign: 'middle',
    height: '100%', 
    width: '100%',
    // , top: 0, left: 0,
    style: {
      bg: '#cdabc9',
      fg: 'black'
    }
  })
  options.log('finish')
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
function simple1(options) {
  options.log('starting')
  const fm = options.accursed.filemanager({
    parent: options.parent,
    // cwd: '.',
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
    vi: true,
    scrollbar: {
      bg: 'white',
      ch: ' '
    }
  })
  fm.pick('.', function () {
    options.log(arguments)
  })
  options.parent.screen.render()
  var box = options.accursed.box({
    parent: options.parent,
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
  // fm.log = options.log
  fm.refresh()
  options.parent.once('focus', ()=>options.log('focus'))
  options.parent.screen.render()
  options.parent.screen.key(['s', 'p'], function () {
    fm.hide()
    options.parent.screen.render()
    setTimeout(function () {
      fm.pick(function (err, file) {
        box.show()
        box.setContent(err ? err + '' : file)
        options.parent.screen.render()
        setTimeout(function () {
          box.hide()
          fm.reset(function () {
            fm.show()
            options.parent.screen.render()
          })
        }, 2000)
      })
    }, 2000)
  })
  options.parent.screen.render()
}  
      `
  },
  {
    name: 'allColors',
    code: `

  function allColors(options) {
    var dx = 9;
    let colorStep = 20;
    var dy = 3;
    let showText = true;
    let x = 0, y = 1;
    
    options.accursed.text({
      parent: options.parent,
      top: y,
      left: 0,
      content: 'Scroll this box using the mouse wheel or up-down arrows'
    });
    y += dy;

    for (let r = 0; r < 255; r += colorStep) {
      for (let g = 0; g < 255; g += colorStep) {
        for (let b = 0; b < 255; b += colorStep) {
          const color = options.blessed.colors.RGBToHex(r, g, b);
          options.accursed.box({
            parent: options.parent,
            top: y,
            left: x,
            width: dx,
            height: dy,
            valign: 'middle',
            align: 'center',
            content: showText ? color : '',
            style: { bg: color, fg: showText ? invertColor(color) : undefined }
          });
          if (x >= options.parent.width - dx * 2) {
            x = 0;
            y += dy;
          }
          else {
            x += dx;
          }
        }
      }
    }
    // options.parent.parent.focus()
    options.parent.screen.render()
    // options.parent.once('focus', )
    function invertColor(hex) {
      function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
      }
      if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
      }
      // invert color components
      var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16), g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16), b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
      // pad each with zeros and return
      return '#' + padZero(r) + padZero(g) + padZero(b);
    }
  }
  `
  },
  {
    name: 'borders',
    code: `
function borders(options){

  const number = (a = 10, b = a) => Math.floor(Math.random() * b) + (a === b ? 0 : a)
  function color() {
    const colors = ['red', 'blue', 'cyan', 'green', 'magenta', 'yellow', 'brown']
    return colors[number(0, colors.length - 1)]
  }
  const l = options.accursed.layout(  {  parent: options.parent, width: '100%', height: '100%'})
  options.accursed.borderStyles.map(style =>{
    options.accursed.borderBox({
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
  }
]
