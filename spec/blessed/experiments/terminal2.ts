import * as blessed from 'blessed'
import { debug } from '../../../src'
try {
  /**
   * multiplex.js
   * https://github.com/chjj/blessed
   * Copyright (c) 2013-2015, Christopher Jeffrey (MIT License)
   * A terminal multiplexer created by blessed.
   */

  process.title = 'multiplex.js'

  // var blessed = require('blessed')
  //   , screen;

  const screen = blessed.screen({
    smartCSR: true,
    log: 'log.txt',
    // log: process.env.HOME + '/blessed-terminal.log',
    fullUnicode: true,
    dockBorders: true,
    ignoreDockContrast: true
  })

  screen.key('C-q', function() {
    topleft.kill()
    topright.kill()
    bottomleft.kill()
    bottomright.kill()
    return screen.destroy()
  })
  // screen.key('C-q', function() {
  //   // NOTE:
  //   // not necessary since screen.destroy causes terminal.term to be destroyed
  //   // (screen2's input and output are no longer readable/writable)
  //   // screen2.destroy();
  //   screen.destroy()
  //   process.exit(0)
  // })
  screen.program.key('S-tab', function() {
    screen.focusNext()
    screen.render()
  })
  var topleft = blessed.terminal({
    parent: screen,
    cursor: 'line',
    cursorBlink: true,
    screenKeys: false,
    label: ' multiplex.js ',
    left: 0,
    top: 0,
    width: '50%',
    height: '50%',
    border: 'line',
    style: {
      fg: 'default',
      bg: 'default',
      focus: {
        border: {
          fg: 'green'
        }
      }
    }
  })

  topleft.pty.on('data', function(data) {
    screen.log(JSON.stringify(data))
  })

  var topright = blessed.terminal({
    parent: screen,
    cursor: 'block',
    cursorBlink: true,
    screenKeys: false,
    label: ' multiplex.js ',
    left: '50%-1',
    top: 0,
    width: '50%+1',
    height: '50%',
    border: 'line',
    style: {
      fg: 'red',
      bg: 'black',
      focus: {
        border: {
          fg: 'green'
        }
      }
    }
  })

  var bottomleft = blessed.terminal({
    parent: screen,
    cursor: 'block',
    cursorBlink: true,
    screenKeys: false,
    label: ' multiplex.js ',
    left: 0,
    top: '50%-1',
    width: '50%',
    height: '50%+1',
    border: 'line',
    style: {
      fg: 'default',
      bg: 'default',
      focus: {
        border: {
          fg: 'green'
        }
      }
    }
  })

  var bottomright = blessed.terminal({
    parent: screen,
    cursor: 'block',
    cursorBlink: true,
    screenKeys: false,
    label: ' multiplex.js ',
    left: '50%-1',
    top: '50%-1',
    width: '50%+1',
    height: '50%+1',
    border: 'line',
    style: {
      fg: 'default',
      bg: 'default',
      focus: {
        border: {
          fg: 'green'
        }
      }
    }
  })
  ;[topleft, topright, bottomleft, bottomright].forEach(function(term) {
    term.enableDrag(function(mouse) {
      return !!mouse.ctrl
    })
    term.on('title', function(title) {
      screen.title = title
      term.setLabel(' ' + title + ' ')
      screen.render()
    })
    term.on('click', term.focus.bind(term))
  })

  topleft.focus()

  screen.render()

  // var screen = blessed.screen({
  //   smartCSR: true,
  //   // warnings: true
  // })

  //   screen = blessed.screen({
  //     smartCSR: true
  //   });

  //      const termName = 'xterm-256color';
  // const   tty = blessed.terminal({
  //     parent: screen,
  //     cursorBlink: false,
  //     screenKeys: false,
  //     left: 0,
  //     top: 0,
  //     term: termName,
  //     width: screen.width,
  //     height: screen.height
  //   });

  // var terminal = blessed.terminal({
  //   parent: screen,
  //   // cursor: 'line',
  //   cursorBlink: true,
  //   screenKeys: false,
  //   top: 'center',
  //   left: 'center',
  //   width: '90%',
  //   height: '90%',
  //   border: 'line',
  //   handler: function() {},
  //   style: {
  //     fg: 'default',
  //     bg: 'default',
  //     focus: {
  //       border: {
  //         fg: 'green'
  //       }
  //     }
  //   }
  // })

  // terminal.focus()

  // var term = terminal.term

  // var screen2 = blessed.screen({
  //   // dump: __dirname + '/logs/termblessed2.log',
  //   smartCSR: true,
  //   warnings: true,
  //   input: term,
  //   output: term
  // })

  // var box1 = blessed.box({
  //   parent: screen2,
  //   top: 'center',
  //   left: 'center',
  //   width: 20,
  //   height: 10,
  //   border: 'line',
  //   content: 'Hello world'
  // })

  // screen2.render()
  screen.render()
} catch (error) {
  debug(error)
}
