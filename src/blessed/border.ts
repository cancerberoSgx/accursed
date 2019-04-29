import { enumKeys } from 'misc-utils-of-mine-generic'

export enum BorderStyle {
  light = 'light',
  'double' = 'double',
  'round' = 'round',
  'heavy' = 'heavy',
  lightDouble = 'lightDouble',
  doubleLight = 'doubleLight',
  'classic' = 'classic',
  lightTripleDash = 'lightTripleDash',
  lightQuadrupleDash = 'lightQuadrupleDash',
  lightDoubleDash = 'lightDoubleDash',
  heavier = 'heavier',
  roundDoubleDash = 'roundDoubleDash',
  roundTripleDash = 'roundTripleDash',
  roundQuadrupleDash = 'roundQuadrupleDash',
  heavyDoubleDash = 'heavyDoubleDash',
  heavyTripleDash = 'heavyTripleDash',
  heavyQuadrupleDash = 'heavyQuadrupleDash',

  singleRareCorners = 'singleRareCorners',
  triangleCorners = 'triangleCorners'
  // 'round2' = 'round2',
  // 'round3' = 'round3',
}

export const borderStyles = enumKeys(BorderStyle)

export enum BorderSide {
  'topLeft' = 'topLeft',
  'topRight' = 'topRight',
  'bottomRight' = 'bottomRight',
  'bottomLeft' = 'bottomLeft',
  'left' = 'left',
  'bottom' = 'bottom',
  'top' = 'top',
  right = 'right'
}

export function getBoxStyle(s: BorderStyle) {
  return getBoxStyles()[s]
}

export function getBoxStyleChar(s: BorderStyle, si: BorderSide) {
  return getBoxStyles()[s][si]
}
type BoxStyles = { [s in BorderStyle]: { [side in BorderSide]: string } }
let boxStyles: BoxStyles | undefined
const getBoxStyles: () => BoxStyles = () => {
  if (!boxStyles) {
    boxStyles = {
      light: {
        topLeft: '┌',
        topRight: '┐',
        bottomRight: '┘',
        bottomLeft: '└',
        left: '│',
        right: '│',
        bottom: '─',
        top: '─'
      },
      lightTripleDash: {
        topLeft: '┌',
        topRight: '┐',
        bottomRight: '┘',
        bottomLeft: '└',
        left: '┆',
        right: '┆',
        bottom: '┄',
        top: '┄'
      },
      lightQuadrupleDash: {
        topLeft: '┌',
        topRight: '┐',
        bottomRight: '┘',
        bottomLeft: '└',
        left: '┊',
        right: '┊',
        bottom: '┈',
        top: '┈'
      },
      lightDoubleDash: {
        topLeft: '┌',
        topRight: '┐',
        bottomRight: '┘',
        bottomLeft: '└',
        left: '╎',
        right: '╎',
        bottom: '╌',
        top: '╌'
      },

      double: {
        topLeft: '╔',
        topRight: '╗',
        bottomRight: '╝',
        bottomLeft: '╚',
        left: '║',
        right: '║',
        bottom: '═',
        top: '═'
      },
      round: {
        topLeft: '╭',
        topRight: '╮',
        bottomRight: '╯',
        bottomLeft: '╰',
        left: '│',
        right: '│',
        bottom: '─',
        top: '─'
      },
      roundDoubleDash: {
        topLeft: '╭',
        topRight: '╮',
        bottomRight: '╯',
        bottomLeft: '╰',
        left: '╎',
        right: '╎',
        bottom: '╌',
        top: '╌'
      },
      roundTripleDash: {
        topLeft: '╭',
        topRight: '╮',
        bottomRight: '╯',
        bottomLeft: '╰',
        left: '┆',
        right: '┆',
        bottom: '┄',
        top: '┄'
      },
      roundQuadrupleDash: {
        topLeft: '╭',
        topRight: '╮',
        bottomRight: '╯',
        bottomLeft: '╰',
        left: '┊',
        right: '┊',
        bottom: '┈',
        top: '┈'
      },

      heavy: {
        topLeft: '┏',
        topRight: '┓',
        bottomRight: '┛',
        bottomLeft: '┗',
        left: '┃',
        right: '┃',
        bottom: '━',
        top: '━'
      },

      heavyDoubleDash: {
        topLeft: '┏',
        topRight: '┓',
        bottomRight: '┛',
        bottomLeft: '┗',
        left: '╏',
        right: '╏',
        bottom: '╍',
        top: '╍'
      },
      heavyTripleDash: {
        topLeft: '┏',
        topRight: '┓',
        bottomRight: '┛',
        bottomLeft: '┗',
        left: '┇',
        right: '┇',
        bottom: '┅',
        top: '┅'
      },
      heavyQuadrupleDash: {
        topLeft: '┏',
        topRight: '┓',
        bottomRight: '┛',
        bottomLeft: '┗',
        left: '┋',
        right: '┋',
        bottom: '┉',
        top: '┉'
      },

      heavier: {
        topLeft: '▛',
        topRight: '▜',
        bottomRight: '▟',
        bottomLeft: '▙',
        left: '▌',
        right: '▐',
        bottom: '▄',
        top: '▀'
      },
      lightDouble: {
        topLeft: '╓',
        topRight: '╖',
        bottomRight: '╜',
        bottomLeft: '╙',
        left: '║',
        right: '║',
        bottom: '─',
        top: '─'
      },
      singleRareCorners: {
        bottom: '⎽',
        top: '⎺',
        left: '⎢',
        right: '⎥',
        topLeft: '⎡',
        topRight: '⎤',
        bottomRight: '⎦',
        bottomLeft: '⎣'
      },

      triangleCorners: {
        bottom: '_',
        top: '⎻',
        left: '⎸',
        right: ' ⎸',
        topLeft: '◸',
        topRight: '◹',
        bottomRight: '◿',
        bottomLeft: '◺'
      },

      doubleLight: {
        topLeft: '╒',
        topRight: '╕',
        bottomRight: '╛',
        bottomLeft: '╘',
        left: '│',
        right: '│',
        bottom: '═',
        top: '═'
      },
      classic: {
        topLeft: '+',
        topRight: '+',
        bottomRight: '+',
        bottomLeft: '+',
        left: '|',
        right: '|',
        bottom: '═',
        top: '-'
      }
    }
  }
  return boxStyles
}
