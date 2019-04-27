import * as blessed from 'blessed'
import { box, Box, createScreen, installExitKeys } from '../../../../src'

allColors()

export function allColors() {
  var screen = createScreen({
    smartCSR: true,
    fastCSR: true,
    title: 'All Colors'
  })
  installExitKeys(screen)
  const parent = box({ parent: screen, width: '100%', height: '100%' })
  demo(parent)
  screen.render()

  function demo(container: Box) {
    var dx = 9
    let colorStep = 20
    var dy = 3
    let showText = true
    let x = 0,
      y = 0
    const parent = box({
      parent: container,
      top: 0,
      left: 0,
      width: '100%',
      bg: 'black',
      scrollable: true,
      focusable: true,
      focused: true,
      mouse: true,
      clickable: true,
      keyable: true,
      keys: true,
      input: true,
      scrollbar: {
        ch: ' ',
        track: {
          bg: 'cyan',
          fg: 'magenta'
        },
        style: {
          inverse: true
        }
      },
      alwaysScroll: true
    })
    for (let r = 0; r < 255; r += colorStep) {
      for (let g = 0; g < 255; g += colorStep) {
        for (let b = 0; b < 255; b += colorStep) {
          const color = blessed.colors.RGBToHex(r, g, b)
          box({
            parent,
            top: y,
            left: x,
            width: dx,
            height: dy,
            valign: 'middle',
            align: 'center',
            content: showText ? color : '',
            style: { bg: color, fg: showText ? invertColor(color) : undefined }
          })
          if (x >= screen.width - dx * 2) {
            x = 0
            y += dy
          } else {
            x += dx
          }
        }
      }
    }
    return parent
  }
}

function invertColor(hex) {
  function padZero(str: string, len?: number) {
    len = len || 2
    var zeros = new Array(len).join('0')
    return (zeros + str).slice(-len)
  }
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b)
}
