import { BorderSide, BorderStyle, getBoxStyle } from '../../../src/blessed/border'

export function box({
  w,
  h,
  style = BorderStyle.light,
  side
}: {
  w: number
  h: number
  style?: BorderStyle
  side?: BorderSide
}) {
  const arr = []
  const s = getBoxStyle(style || BorderStyle.light)
  for (let j = 0; j < h; j++) {
    const line = []
    for (let i = 0; i < w; i++) {
      if (j == 0) {
        if (i === 0 && (!side || side === 'topLeft')) {
          line.push(s[BorderSide.topLeft])
        } else if (i === w - 1 && (!side || side === 'topRight')) {
          line.push(s[BorderSide.topRight])
        } else if (j === 0 && (!side || side === 'top')) {
          line.push(s[BorderSide.top])
        } else if (!side || side === 'bottom') {
          line.push(s[BorderSide.bottom])
        }
      } else if (j === h - 1) {
        if (i === 0 && (!side || side === 'bottomLeft')) {
          line.push(s[BorderSide.bottomLeft])
        } else if (i === w - 1 && (!side || side === 'bottomRight')) {
          line.push(s[BorderSide.bottomRight])
        } else if (j === h - 1 && (!side || side === 'bottom')) {
          line.push(s[BorderSide.bottom])
        } else if (!side || side === 'top') {
          line.push(s[BorderSide.top])
        }
      } else {
        if (i === 0 && (!side || side === 'left')) {
          line.push(s[BorderSide.left])
        } else if (i === w - 1 && (!side || side === 'right')) {
          line.push(s[BorderSide.right])
        } else {
          line.push(' ')
        }
      }
    }
    arr.push(line)
  }
  return arr
}

/*
⎾ ⎿ ⏋ ⏌ ◜ ◝ ◞ ◟ ⌡ ⌠ ⌈ ⌉ ⌊ ⌋ ⎡ ⎢ ⎣ ⎤ ⎥ ⎦ ⌊ ⎸ ⎹ ⎺ ⎻ ⎼ ⎽ ⌌ ⌍ ⌎ ⌏ ⎜ ⎟ ▁ ▂ ▔ ▕ ▏ ⸜ ⸝ ◢ ◣ ⎝ ⎞ ⎠ ⎛ ╱ ╲ ⟋ ⟌ ◸ ◹ ◺ ◿ ┄ ┅ ┆ ┇ ┈ ┉ ┊ ┋ ╌ ╍ ╎ ╏ ═ ⎺ ⎻ ⎼ ⎽ ⟋ ⟍ ⟓ ⟔ ⟩ ⟨ 

◸⎻⎻⎻⎻⎻◹   
⎸\u2009\u2009\u2009\u2009\u2009 ⎸ 
⎸\u200a\u200a\u200a\u200a\u200a ⎸
⎸      ⎸
◺_____◿ 
*/

// /*
// ⎾ ⎿ ⏋ ⏌ ◜ ◝ ◞ ◟ ⌡ ⌠ ⌈ ⌉ ⌊ ⌋ ⎡ ⎢ ⎣ ⎤ ⎥ ⎦ ⌊ ⎸ ⎹ ⎺ ⎻ ⎼ ⎽ ⌌ ⌍ ⌎ ⌏ ⎜ ⎟ ▁ ▂ ▔ ▕ ▏ ⸜ ⸝ ◢ ◣ ⎝ ⎞ ⎠ ⎛
// ⎾ ⎿ ⏋ ⏌ ◜ ◝ ◞ ◟ ⌡ ⌠ ⌈ ⌉ ⌊ ⌋ ⎡ ⎢ ⎣ ⎤ ⎥ ⎦ ⌊ ⎸ ⎹ ⎺ ⎻ ⎼ ⎽ ⌌ ⌍ ⌎ ⌏ ⎜ ⎟ ▁ ▂ ▔ ▕ ▏ ⸜ ⸝ ◢ ◣ ⎝ ⎞ ⎠ ⎛ ╱ ╲
// ⎝ ⎞ ⎠
// ⎛⎺⎺▔⎺⎞
// ⎸   ⎹
// ⎸   ⎹
// ⎸   ⎹
// ⎝⎽⎽⎽⎽⎠
// ⎛⎺⎺▔⎺⎞
// │    │
// │    │
// ⎝⎽⎽⎽⎽⎠
// ⎸    ⎥⎹ ⎸
// ╱⎺⎺⎺╲
// ⎸   ⎹
// ⎸   ⎹
// ⎸   ⎹
// ╲⎽⎽⎽╱
//  ⎸  │⎹
// */
function print(s: string[][]) {
  return s.map(l => l.join('')).join('\n')
}
console.log(
  '\u23be',
  '\u23bf',
  '\u23cb',
  '\u23cc',
  '\u25dc',
  '\u25dd',
  '\u25de',
  '\u25df',
  '\u2321',
  '\u2320',
  '\u2308',
  '\u2309',
  '\u230a',
  '\u230b',
  '\u23a1',
  '\u23a2',
  '\u23a3',
  '\u23a4',
  '\u23a5',
  '\u23a6',
  '\u230a',
  '\u23b8',
  '\u23b9',
  '\u23ba',
  '\u23bb',
  '\u23bc',
  '\u23bd',
  '\u230c',
  '\u230d',
  '\u230e',
  '\u230f',
  '\u239c',
  '\u239f',
  '\u2581',
  '\u2582',
  '\u2594',
  '\u2595',
  '\u258f',
  '\u2e1c',
  '\u2e1d',
  '\u25e2',
  '\u25e3',
  '\u239d',
  '\u239e',
  '\u23a0',
  '\u239b',
  '\u2571',
  '\u2572',
  '\u27cb',
  '\u27cc',
  '\u25f8',
  '\u25f9',
  '\u25fa',
  '\u25ff',
  '\u2504',
  '\u2505',
  '\u2506',
  '\u2507',
  '\u2508',
  '\u2509',
  '\u250a',
  '\u250b',
  '\u254c',
  '\u254d',
  '\u254e',
  '\u254f',
  '\u2550',
  '\u23ba',
  '\u23bb',
  '\u23bc',
  '\u23bd',
  '\u27cb',
  '\u27cd',
  '\u27d3',
  '\u27d4',
  '\u27e9',
  '\u27e8',
  print(box({ w: 8, h: 3, style: BorderStyle.heavy, side: BorderSide.left }))
)
// // 27cb  27cd 27d3 27d4
// /*
// ╱ ╲
//    ⟩
//  ⎽╱
//   ◸⎻⎻⎻⎻⎻◹
//   ⎸      ⎸
//   ⎸     ⎹
//   ◸⎻⎻⎻\u2009⎻◹
//   ⎸      ⎸
//   ⎸      ⎸
//   ⎸      ⎸
//   ◺_____◿
//   ◸⎻⎻⎻⎻⎻◹
//   ⎸      ⎸
//   ⎸      ⎸
//   ⎸      ⎸
//   ◺⎽⎽⎽⎽⎽◿
//   ⎸      ⎸     ⎹
//   ⎸
//   ⎟⎟    ⎟ ⎟
//         ⎟
// */
console.log(print(box({ w: 8, h: 3 })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.lightDoubleDash })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.lightTripleDash })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.lightQuadrupleDash })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.double })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.heavy })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.heavyDoubleDash })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.heavyTripleDash })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.heavyQuadrupleDash })))
// console.log(print(box({ w: 8, h: 3, style: BorderStyle.doubleDash })))
// console.log(print(box({ w: 8, h: 3, style: BorderStyle.tripleDash })))
// console.log(print(box({ w: 8, h: 3, style: BorderStyle.quadrupleDash })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.heavier })))
// console.log(print(box({ w: 8, h: 3, style: BorderStyle.light })))
console.log(print(box({ w: 10, h: 4, style: BorderStyle.triangleCorners })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.round })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.roundDoubleDash })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.roundTripleDash })))
console.log(print(box({ w: 8, h: 3, style: BorderStyle.roundQuadrupleDash })))
