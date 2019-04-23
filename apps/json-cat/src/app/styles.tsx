import { ButtonOptions, TextboxOptions } from 'accursed'
let styles
export const focusable: () => ButtonOptions = () => ({
  focusable: true,
  clickable: true,
  keys: true,
  mouse: true,
  keyable: true,
  border: 'line',
  style: {
    border: {
      fg: 'blue',
      type: 'line'
    },
    hover: {
      fg: 'yellow'
    },
    focus: {
      bg: 'lightgray',
      fg: 'black',
      border: {
        fg: 'magenta'
      }
    },
    bg: 'darkgray',
    fg: 'blue'
  }
})
export const textBox: () => TextboxOptions = () => ({
  ...focusable(),
  // focused: true,
  width: '100%',
  height: 3,
  style: { ...focusable().style, bg: 'gray', border: { fg: 'magenta' } }
})
