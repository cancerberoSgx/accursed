import { TextareaOptions } from '..'
import { BoxOptions } from '../blessedTypes'

/** @internal */
export const focusableOpts: () => TextareaOptions = () => ({
  mouse: true,
  keys: true,
  focusable: true,
  clickable: true,
  input: true,
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
      fg: 'black'
    },
    selected: {
      bg: 'magenta',
      fg: 'black',
      // bold: true,
      underline: true
    }
  }
})

export const focusableBorderedOpts: () => TextareaOptions = () => ({
  ...focusableOpts(),
  border: 'line',
  style: {
    ...focusableOpts().style,
    border: {
      type: 'line',
      fg: 'cyan'
    },
    focus: {
      fg: 'black',
      bg: 'lightgray',
      border: {
        fg: 'red'
      }
    }
  }
})

export const scrollableOpts: () => BoxOptions = () => ({
  ...focusableOpts(),
  scrollable: true,
  scrollbar: { inverse: true }
})
