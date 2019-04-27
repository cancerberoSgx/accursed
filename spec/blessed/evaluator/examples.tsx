export const examples = [
  {
    name: 'simple1',
    code: `
function simple1(options) {
  options.log('starting')
  options.parent.children.forEach(c => {
    c.detach();
    c.destroy()
  })
  const b = options.accursed.box({
    parent: options.parent,
    content: 'hello world',
    height: 2, width: 6, top: 0, left: 0,
    style: {
      bg: 'red'
    }
  })
  const timer = setInterval(() => {
    b.top++
    b.left++
    b.width++
    b.height++
    options.parent.screen.render()
    if (b.top > options.parent.height - b.height ||
      b.left > options.parent.width - b.width) {
      clearInterval(timer)
    }
  }, 10)
  options.parent.screen.render()
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
      fm.refresh()
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
  }
]
