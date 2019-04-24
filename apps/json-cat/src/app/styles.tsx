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

export const containerOptions: () => TextboxOptions = () => ({
  border: 'line',
  style: {
    ...focusable().style,
    bg: 'gray',
    border: { fg: 'black' },
    label: { fg: 'black', bg: 'magenta', transparent: true }
  }
})
export const textBox: () => TextboxOptions = () => ({
  ...focusable(),
  // focused: true,
  width: '90%',
  height: 3,
  style: { ...focusable().style, bg: 'lightgray', border: { fg: 'gray' } }
})
export function autocompleteOptions() {
  return {
    width: '100%',
    listOptions: {
      width: '100%',
      border: 'line',
      style: { bg: 'lightgray', fg: 'black' }
    },
    inputOptions: {
      ...textBox(),
      width: '100%',
      height: 3,
      label: 'Select (JSON Pointer)'
    }
  }
}
