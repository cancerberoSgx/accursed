import { BoxOptions, Style, TabPanelProps, TextareaOptions } from 'accursed'

export const activeStyle: () => Style = () => ({
  bg: 'magenta',
  fg: 'black',
  underline: true
})
export const inactiveStyle: () => Style = () => ({
  bg: '#507468',
  fg: 'black',
  underline: false,
})

export const focusableOpts: () => TextareaOptions = () => ({
  mouse: true,
  keys: true,
  focusable: true,
  clickable: true,
  keyable: true,
  // border: 'line',
  border: undefined,
  padding: 0,
  style: {
    ...inactiveStyle(),
    // border: {
    //   type: 'line',
    //   fg: 'cyan'
    // },
    border: undefined,
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
    },
   }
})


export const tabLabelOpts: () => TextareaOptions = () => ({
  ...focusableOpts(),
  padding: {right: 1}
})

export const scrollableOpts: ()=>BoxOptions = ()=>({
  ...focusableOpts(),
  scrollable: true,

        scrollbar: {inverse: true}
})

export const tabPanelOpts: () => Partial<TabPanelProps> = () => ({
  activeTab: {style: {...activeStyle()}},
  inactiveTab: {style: {...inactiveStyle()}},
  
})

export const transparentBox: () => BoxOptions = () => ({
  width: '100%',
  height: '100%',
  border: undefined
})
