// import * as blessed from 'blessed'

// const font1: {[a: string]: string} = {}
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const bold = buildFont(0x1d400, 0x1d41a, 0x1d7ce, [])
const italic = buildFont(0x1d434, 0x1d44e, 0, [...digits])
const boldItalic = buildFont(0x1d468, 0x1d482, 0, [...digits])
const scriptItalic = buildFont(0x1d49c, 0x1d4b6, 0, ['e', 'g', 'o', 'B', 'F', 'H', 'I', 'L', 'M', 'R', ...digits])
const scriptBold = buildFont(0x1d4d0, 0x1d4ea, 0, [...digits])
const fraktur = buildFont(0x1d504, 0x1d51e, 0, ['C', 'H', 'R', ...digits])
const boldFraktur = buildFont(0x1d56c, 0x1d586, 0, digits)
const doubleStruck = buildFont(0x1d538, 0x1d552, 0x1d7d8, ['C', 'H', 'R', 'P', 'Q'])
const sansSerif = buildFont(0x1d5a0, 0x1d5ba, 0x1d7e2, [])
const sansSerifBold = buildFont(0x1d5d4, 0x1d5ee, 0x1d7ec, [])
const sansSerifItalic = buildFont(0x1d608, 0x1d622, 0, [...digits])
const sansSerifBoldItalic = buildFont(0x1d63c, 0x1d656, 0, [...digits])
const monospace = buildFont(0x1d670, 0x1d68a, 0x1d7f6, [])

const s = 'Hello World. How are you today 0123456789'
console.log(transform(s, bold))
console.log(transform(s, italic))
console.log(transform(s, boldItalic))
console.log(transform(s, scriptItalic))
console.log(transform(s, scriptBold))
console.log(transform(s, fraktur))
console.log(transform(s, boldFraktur))
console.log(transform(s, doubleStruck))
console.log(transform(s, sansSerif))
console.log(transform(s, sansSerifBold))
console.log(transform(s, sansSerifItalic))
console.log(transform(s, sansSerifBoldItalic))

interface Font {
  chars: number[][]
  missing: string[]
}

function buildFont(aMayus: number, aLower: number, digit0: number, missing: string[] = []) {
  const font: number[][] = []
  for (let i = 65; i < 90; i++) {
    font.push([i, aMayus + i - 65])
  }
  for (let i = 97; i < 122; i++) {
    font.push([i, aLower + i - 97])
  }
  for (let i = 48; i < 58; i++) {
    font.push([i, digit0 + i - 48])
  }
  digit0

  return { chars: font, missing: missing }
}

function transform(s: string, font: Font) {
  let output = ''
  for (let i = 0; i < s.length; i++) {
    if (font.missing.includes(s[i])) {
      output += s[i]
    } else {
      const c = s.charCodeAt(i)
      const n = font.chars.find(a => a[0] === c)!
      if (!n) {
        output += s[i]
      } else {
        const o = String.fromCodePoint(n[1])
        output += o
      }
    }
  }
  return output
}
// // A-Z - 1d434-1d44d - italic capital

// var auto = false

// let screen = blessed.screen({
//   // dump: __dirname + '/logs/listbar.log',
//   autoPadding: auto
//   // warnings: true
// })

// var box = blessed.box({
//   parent: screen,
//   top: 0,
//   right: 0,
//   width: 'shrink',
//   height: 'shrink',
//   content: '...'
// })

// var bar = blessed.listbar({
//   //parent: screen,
//   bottom: 0,
//   left: 3,
//   right: 3,
//   height: auto ? 'shrink' : 3,
//   mouse: true,
//   keys: true,
//   autoCommandKeys: true,
//   border: 'line',
//   vi: true,
//   style: {
//     bg: 'green',
//     item: {
//       bg: 'red',
//       hover: {
//         bg: 'blue'
//       }
//       //focus: {
//       //  bg: 'blue'
//       //}
//     },
//     selected: {
//       bg: 'blue'
//     }
//   } as any,
//   commands: {
//     one: {
//       keys: ['a'],
//       callback: function() {
//         box.setContent('Pressed one.')
//         screen.render()
//       }
//     },
//     two: function() {
//       box.setContent('Pressed two.')
//       screen.render()
//     },
//     three: function() {
//       box.setContent('Pressed three.')
//       screen.render()
//     },
//     four: function() {
//       box.setContent('Pressed four.')
//       screen.render()
//     },
//     five: function() {
//       box.setContent('Pressed five.')
//       screen.render()
//     },
//     six: function() {
//       box.setContent('Pressed six.')
//       screen.render()
//     },
//     seven: function() {
//       box.setContent('Pressed seven.')
//       screen.render()
//     },
//     eight: function() {
//       box.setContent('Pressed eight.')
//       screen.render()
//     },
//     nine: function() {
//       box.setContent('Pressed nine.')
//       screen.render()
//     },
//     ten: function() {
//       box.setContent('Pressed ten.')
//       screen.render()
//     },
//     eleven: function() {
//       box.setContent('Pressed eleven.')
//       screen.render()
//     },
//     twelve: function() {
//       box.setContent('Pressed twelve.')
//       screen.render()
//     },
//     thirteen: function() {
//       box.setContent('Pressed thirteen.')
//       screen.render()
//     },
//     fourteen: function() {
//       box.setContent('Pressed fourteen.')
//       screen.render()
//     },
//     fifteen: function() {
//       box.setContent('Pressed fifteen.')
//       screen.render()
//     }
//   } as any,
//   items: []
// }) as any

// screen.append(bar)

// bar.focus()

// screen.key('q', function() {
//   return screen.destroy()
// })

// screen.render()
