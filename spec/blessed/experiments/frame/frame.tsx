// import { frameChar, Style } from './frameChear'

// function box({ xi, xl, yi, yl, style = 'normal' }: { xi: number; xl: number; yi: number; yl: number; style?: Style }) {
//   const arr = []
//   for (let j = yi; j < yl; j++) {
//     const line = []
//     for (let i = xi; i < xl; i++) {
//       if (j == 0) {
//         if (i === 0) {
//           line.push(frameChar({ right: style, down: style }))
//         } else if (i === xl - 1) {
//           line.push(frameChar({ left: style, down: style }))
//         } else if (j === 0) {
//           line.push(frameChar({ left: style }))
//         } else {
//           line.push(' ')
//         }
//       } else if (j === yl - 1) {
//         if (i === 0) {
//           line.push(frameChar({ right: style, up: style }))
//         } else if (i === xl - 1) {
//           line.push(frameChar({ left: style, up: style }))
//         } else if (j === yl - 1) {
//           line.push(frameChar({ left: style }))
//         } else {
//           line.push(' ')
//         }
//       } else {
//         if (i === 0) {
//           line.push(frameChar({ down: style }))
//         } else if (i === xl - 1) {
//           line.push(frameChar({ up: style }))
//         } else {
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

// console.log(box({ xi: 0, xl: 5, yi: 0, yl: 5 }))

// console.log(print(box({ xi: 0, xl: 5, yi: 0, yl: 5, style: 'rounded' })))

// console.log(print(box({ xi: 0, xl: 10, yi: 0, yl: 5, style: 'double' })))

// /**

// * frames inside frames.
//     * unions between light and heavy must use correct chars : ╼╽

// * light and heavy styles

// * styles of borders ┄

//   * light vs heavy
//   * dotted vs solid ┆ ┄
// },
// {
//   "name": "BOX DRAWINGS LIGHT QUADRUPLE DASH HORIZONTAL",
//   "category": "Box Drawing",
//   "cp": "2508",
//   "char": "'┈'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT QUADRUPLE DASH VERTICAL",
//   "category": "Box Drawing",
//   "cp": "250A",
//   "char": "'┊'"

// * unions in subboxes too: ┬'├

// * different corner styles: round and rect: ╭ , ╮256E, ╯256F, ╰2570  vs:
// "2510":  "'┐'""250C":  "'┌'"},"2510":  "'┐'""2514":  "'└'""2518":  "'┘'"

// libraries?

// https://github.com/couchand/lines-js
// https://github.com/holman/spark

// },
// },

// {
//   "name": "BOX DRAWINGS LIGHT ARC DOWN AND LEFT",
//   "category": "Box Drawing",
//   "cp": "256E",
//   "char": "'╮'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT ARC UP AND LEFT",
//   "category": "Box Drawing",
//   "cp": "256F",
//   "char": "'╯'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT ARC UP AND RIGHT",
//   "category": "Box Drawing",
//   "cp": "2570",
//   "char": "'╰
// '├

// <Border type="line" fg="" label={position:'top-center'}>
//  <box>...</box>
//  </Border>

//  <Frame>
//  <Border></Border>
//  <Icon></Icon>
//  <Label></Label>
//  <Shadow></Shadow>
//  <Padding></Padding>
//  <Margin></Margin>
//  <Body></Body>
//  </Frame>
//  *
//  */
