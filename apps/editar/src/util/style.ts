import { BoxOptions, TextareaOptions } from 'accursed'

export const focusableOpts: () => TextareaOptions = () => ({
  mouse: true,
  // clickable: true,
  keys: true,
  focusable: true,
  clickable: true,
  // input: true,
  keyable: true,
  border: 'line',
  style: {
    bg: 'lightgray',
    fg: 'black',
    border: {
      type: 'line',
      fg: 'cyan'
    },
    focus: {
      fg: 'black',
      bg: '#507468',
      border: {
        fg: 'red'
      }
    },
    item: {
      bg: 'lightgray',
      fg: 'black',
      underline: false
    },
    selected: {
      bg: 'magenta',
      fg: 'black',
      // bold: true,
      underline: true
    }
  }
})

export const transparentBox: () => BoxOptions = () => ({
  width: '100%',
  height: '100%',
  border: undefined
})
