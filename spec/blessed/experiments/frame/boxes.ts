export enum BorderStyle {
  'single' = 'single',
  'double' = 'double',
  'round' = 'round',
  'bold' = 'bold',
  'singleDouble' = 'singleDouble',
  'doubleSingle' = 'doubleSingle',
  'classic' = 'classic',
  bolder = 'bolder'
}

export enum BorderSide {
  'topLeft' = 'topLeft',
  'topRight' = 'topRight',
  'bottomRight' = 'bottomRight',
  'bottomLeft' = 'bottomLeft',
  'left' = 'left',
  'bottom' = 'bottom',
  'top' = 'top',
  right = 'right'
}

export function getBoxStyle(s: BorderStyle) {
  return getBoxStyles()[s]
}

export function getBoxStyleChar(s: BorderStyle, si: BorderSide) {
  return getBoxStyles()[s][si]
}
type BoxStyles = { [s in BorderStyle]: { [side in BorderSide]: string } }
let boxStyles: BoxStyles | undefined
const getBoxStyles: () => BoxStyles = () => {
  if (!boxStyles) {
    boxStyles = {
      single: {
        topLeft: '┌',
        topRight: '┐',
        bottomRight: '┘',
        bottomLeft: '└',
        left: '│',
        right: '│',
        bottom: '─',
        top: '─'
      },
      double: {
        topLeft: '╔',
        topRight: '╗',
        bottomRight: '╝',
        bottomLeft: '╚',
        left: '║',
        right: '║',
        bottom: '═',
        top: '═'
      },
      round: {
        topLeft: '╭',
        topRight: '╮',
        bottomRight: '╯',
        bottomLeft: '╰',
        left: '│',
        right: '│',
        bottom: '─',
        top: '─'
      },
      bold: {
        topLeft: '┏',
        topRight: '┓',
        bottomRight: '┛',
        bottomLeft: '┗',
        left: '┃',
        right: '┃',
        bottom: '━',
        top: '━'
      },
      bolder: {
        topLeft: '▛',
        topRight: '▜',
        bottomRight: '▟',
        bottomLeft: '▙',
        left: '▌',
        right: '▐',
        bottom: '▄',
        top: '▀'
      },
      singleDouble: {
        topLeft: '╓',
        topRight: '╖',
        bottomRight: '╜',
        bottomLeft: '╙',
        left: '║',
        right: '║',
        bottom: '─',
        top: '─'
      },
      doubleSingle: {
        topLeft: '╒',
        topRight: '╕',
        bottomRight: '╛',
        bottomLeft: '╘',
        left: '│',
        right: '│',
        bottom: '═',
        top: '═'
      },
      classic: {
        topLeft: '+',
        topRight: '+',
        bottomRight: '+',
        bottomLeft: '+',
        left: '|',
        right: '|',
        bottom: '═',
        top: '-'
      }
    }
  }
  return boxStyles
}

// function box({ w, h, style = BorderStyle.single, side }: { w: number; h: number; style?: BorderStyle, side?: BorderSide }) {
//   const arr = []
//   const s = getBoxStyles()[style || 'single']
//   for (let j = 0; j < h; j++) {
//     const line = []
//     for (let i = 0; i < w; i++) {
//       if (j == 0) {
//         if (i === 0 && (!side || side === 'topLeft')) {
//           line.push(s[BorderSide.topLeft])
//         } else if (i === w - 1 && (!side || side === 'topRight')) {
//           line.push(s[BorderSide.topRight])
//         }
//         else if (j === 0 && (!side || side === 'top')) {
//           line.push(s[BorderSide.top])
//         }
//         else if (!side || side === 'bottom') {
//           line.push(s[BorderSide.bottom])
//         }
//       } else if (j === h - 1) {
//         if (i === 0 && (!side || side === 'bottomLeft')) {
//           line.push(s[BorderSide.bottomLeft])
//         } else if (i === w - 1 && (!side || side === 'bottomRight')) {
//           line.push(s[BorderSide.bottomRight])
//         }
//         else if (j === h - 1 && (!side || side === 'bottom')) {
//           line.push(s[BorderSide.bottom])
//         }
//         else if (!side || side === 'top') {
//           line.push(s[BorderSide.top])
//         }
//       } else {
//         if (i === 0 && (!side || side === 'left')) {
//           line.push(s[BorderSide.left])
//         }
//         else if (i === w - 1 && (!side || side === 'right')) {
//           line.push(s[BorderSide.right])
//         }
//         else {
//           line.push(' ')
//         }
//       }
//     }
//     arr.push(line)
//   }
//   return arr
// }

// function print(s: string[][]) {
//   return s.map(l => l.join('')).join('\n')
// }

// console.log(print(box({ w: 8, h: 3, style: BorderStyle.bold, side: BorderSide.left })))
// console.log(print(box({ w: 8, h: 3 })))
// console.log(print(box({ w: 8, h: 3, style: BorderStyle.double })))
// console.log(print(box({ w: 8, h: 3, style: BorderStyle.round })))
// console.log(print(box({ w: 8, h: 3, style: BorderStyle.bold })))
// console.log(print(box({ w: 8, h: 3, style: BorderStyle.bolder })))

// // console.log(print(box({xi: 0, xl: 5, yi: 0, yl: 5, style: 'rounded' })))

// /*

//      ╱
//     ╱
//    ╱
//   ╱
//  ╱
// ╱

// ╱
// ╲
// */
