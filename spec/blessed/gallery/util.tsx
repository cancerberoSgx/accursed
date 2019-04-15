import { randomIntBetween } from 'misc-utils-of-mine-generic'
import { Style } from '../../../src/blessed/blessedTypes'

export const commonOptions: () => { style: Style } = () => ({
  style: {
    bg: 'gray',
    fg: 'black',
    focus: {
      // border:{
      // // type: 'line',
      //   fg: 'red'
      // },
      // bg:  'blue',
      fg: 'red',
      bold: true
    },
    // hover: {
    //   // border: {
    //   //   fg: 'black',
    //   //   // bg: 'cyan'
    //   // },
    //   bg: 'green'
    // },
    selected: {
      // border: {
      //   fg: 'cyan',
      // //   bg: ''
      // },
      bg: 'cyan'
    },
    item: {
      bg: 'yellow'
      // padding: 1,

      // border: {
      // fg: 'green'
      // }
    }
  }
  // mouse: true,
  // clickable: true,
  // keys: true,
  // keyable: true
})
export function number(a = 0, b = 10) {
  return randomIntBetween(a, b)
}
export function color() {
  const colors = ['red', 'blue', 'cyan', 'green', 'magenta', 'yellow', 'brown']
  return colors[randomIntBetween(0, colors.length - 1)]
}
