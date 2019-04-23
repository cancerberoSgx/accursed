import { ButtonOptions, TextboxOptions } from 'accursed';
let styles;
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
      type: 'line',
    },
    hover: {
      fg: 'yellow'
    },
    focus: {
      bg: 'black',
      fg: 'yellow'
    },
    bg: 'darkgray',
    fg: 'blue'
  }
});
export const textBox: () => TextboxOptions = () => ({
  ...focusable(),
  focused: true,
  width: 14,
  style: { ...focusable().style, bg: 'gray', border: { fg: 'magenta' } , width: 18}
});
