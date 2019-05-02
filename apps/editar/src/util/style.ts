import { BoxOptions, Style, TabPanelProps, TextareaOptions } from 'accursed'

export const activeStyle: () => Style = () => ({
  bg: 'magenta',
  fg: 'black',
  underline: true
})
export const inactiveStyle: () => Style = () => ({
  bg: '#507468',
  fg: 'black'
})

export const focusableOpts: () => TextareaOptions = () => ({
  mouse: true,
  keys: true,
  focusable: true,
  clickable: true,
  keyable: true,
  // border: 'line',
  padding: 0,
  style: {
    ...inactiveStyle(),
    // border: {
    //   type: 'line',
    //   fg: 'cyan'
    // },
    focus: {
      fg: 'black',
      bg: 'lightgray',
      // border: {
      //   fg: 'red'
      // }
    },
    item: {
      bg: 'lightgray',
      fg: 'black',
      underline: false
    },
    selected: activeStyle()
  }
})

export const tabPanelOpts: () => Partial<TabPanelProps> = () => ({
  activeStyle: {...activeStyle()},
  inactiveStyle: {...inactiveStyle()},
})

export const transparentBox: () => BoxOptions = () => ({
  width: '100%',
  height: '100%',
  border: undefined
})
