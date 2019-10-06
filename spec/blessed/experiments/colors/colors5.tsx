import { box, BoxOptions, Br, Div, React, Screen, showInModal, text } from '../../../../src'
import { invertColor } from '../../../../src/util/data'
const palette = require('google-palette') as ((...args: any[]) => string[]) & { listSchemes: any }

export function colors5Demo(screen: Screen) {
  setTimeout(() => {
    showInModal(
      screen,
      React.render(
        <Div>
          Welcome to this color palette terminal demo. <Br />
          It's a demonstration of Google-palette (https://github.com/google/palette.js) color palettes in the terminal.
          <Br />
          <Br />
          * Use [UP] and [DOWN] keys to scroll the content. <Br />
          * Also you can use the mouse wheel to scroll. <Br />
          * At any time you can close the demo with keys [Q], or [Control-c] or [ESC]. <Br />
          <Br />
          * Close this modal with keys [Q], or [Control-c] or [ESC]. <Br />
          <Br />
          <Br />
          Enjoy.
          <Br />
          <Br />
          Author: Sebastian Gurin.
          <Br />
          Project Home: (https://github.com/cancerberoSgx/accursed/)
          <Br />
        </Div>
      ),
      'Welcome',
      '90%',
      '90%'
    )
  }, 2000)

  const palettes: any = getPalettes()
  const N = 8
  var dx = Math.trunc(screen.width / (N + 2))
  var dy = 2
  let y = 0
  const parent = box({
    parent: screen,
    top: 0,
    left: 0,
    bg: 'black',
    scrollable: true,
    focusable: true,
    mouse: true,
    clickable: true,
    keyable: true,
    keys: true,
    input: true,
    focused: true,
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
  Object.keys(palettes).forEach(title => {
    text({ parent, content: title, top: y, left: 0 })
    y += dy
    Object.keys(palettes[title]).forEach(paletteName => {
      let x = 0
      text({ parent, content: ` * ${paletteName}`, top: y, left: 0 })
      x += dx * 2
      palettes[title][paletteName]
        .map((color: any) => '#' + color)
        .forEach((color: any) => {
          const options: BoxOptions = {
            left: x,
            content: color,
            width: dx,
            top: y,
            height: dy,
            style: {
              bg: color,
              fg: invertColor(color),
              hover: { bg: color, fg: invertColor(color) }
            },
            hoverText: `${paletteName} (${color})`
          }
          box({ parent, ...options })
          x += dx
        })
      y += dy
    })
    y += dy
  })

  parent.scrollTo(0)
}

function getPalettes() {
  const palettes = {
    "Paul Tol's palettes": {
      "Paul Tol's qualitative scheme": palette('tol', 8), //      , cbf, max 10 colours.
      "Paul Tol's diverging scheme": palette('tol-dv', 8),
      "Paul Tol's sequential scheme, cbf.2": palette('tol-sq', 8),
      "Paul Tol's qualitative scheme, cbf.": palette('tol-rainbow', 8)
    },

    'A rainbow palette.': {
      rainbown: palette('rainbow', 8)
    },

    'ColorBrewer sequential schemes.': {
      'cb-YlGn': palette('cb-YlGn', 8),
      // "cb-YlGn-cbf": palette('cb-YlGn-cbf', 8),
      'cb-YlGnBu': palette('cb-YlGnBu', 8),
      'cb-GnBu': palette('cb-GnBu', 8),
      'cb-BuGn': palette('cb-BuGn', 8),
      'cb-PuBuGn': palette('cb-PuBuGn', 8),
      'cb-PuBu': palette('cb-PuBu', 8),
      'cb-BuPu': palette('cb-BuPu', 8),
      'cb-RdPu': palette('cb-RdPu', 8),
      'cb-PuRd': palette('cb-PuRd', 8),
      'cb-OrRd': palette('cb-OrRd', 8),
      'cb-YlOrRd': palette('cb-YlOrRd', 8),
      'cb-YlOrBr': palette('cb-YlOrBr', 8),
      'cb-Purples': palette('cb-Purples', 8),
      'cb-Blues': palette('cb-Blues', 8),
      'cb-Greens': palette('cb-Greens', 8),
      'cb-Oranges': palette('cb-Oranges', 8),
      'cb-Reds': palette('cb-Reds', 8),
      'cb-Greys': palette('cb-Greys', 8)
    },

    'ColorBrewer diverging schemes.': {
      'cb-PuOr': palette('cb-PuOr', 8),
      'cb-BrBG': palette('cb-BrBG', 8),
      'cb-PRGn': palette('cb-PRGn', 8),
      'cb-PiYG': palette('cb-PiYG', 8),
      'cb-RdBu': palette('cb-RdBu', 8),
      'cb-RdGy': palette('cb-RdGy', 8),
      'cb-RdYlBu': palette('cb-RdYlBu', 8),
      'cb-Spectral': palette('cb-Spectral', 8),
      'cb-RdYlGn': palette('cb-RdYlGn', 8)
    },

    'ColorBrewer qualitative schemes.': {
      'cb-Accent': palette('cb-Accent', 8),
      'cb-Dark2': palette('cb-Dark2', 8),
      'cb-Paired': palette('cb-Paired', 8),
      'cb-Pastel1': palette('cb-Pastel1', 8),
      'cb-Pastel2': palette('cb-Pastel2', 8),
      'cb-Set1': palette('cb-Set1', 8),
      'cb-Set2': palette('cb-Set2', 8),
      'cb-Set3': palette('cb-Set3', 8)
    },
    Solarized: {
      'sol-base': palette('sol-base', 8),
      'sol-accent': palette('sol-accent', 8)
    }
  }
  return palettes
}
