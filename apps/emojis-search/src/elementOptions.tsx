import { BoxOptions, ListTableOptions } from 'accursed'
export const inputOptions = () =>
  ({
    keys: true,
    mouse: true,
    clickable: true,
    tags: true,
    focusable: true,
    vi: true,
    border: 'line',
    style: {
      bg: 'gray',
      fg: 'white',
      border: {
        type: 'line',
        fg: 'cyan'
      },
      focus: {
        bg: 'lightgray',
        fg: 'black',
        border: {
          type: 'line',
          fg: 'red'
        }
      },
      selected: {
        border: {
          type: 'line',
          fg: 'blue'
        },
        fg: 'black',
        bg: 'magenta'
      },
      item: {
        border: {
          fg: 'gray'
        },
        bg: 'green'
      },
      hover: {
        bg: 'lightgray'
      }
    }
  } as BoxOptions)

export const scrollableOptions = () =>
  ({
    ...inputOptions(),
    border: 'line',
    align: 'center',
    scrollable: true,
    input: true,
  alwaysScroll: true,
  // scrollable: true,
    scrollbar: {
      ch: ' ',
      track: {
        bg: 'cyan'
      },
      
      style: {
        inverse: true
      }
    },
    style: {
      scrollbar: {
        ch: ' ',
        track: {
          bg: 'cyan'
        },
        
        style: {
          inverse: true
        }
      },
      ...inputOptions().style,
      header: {
        fg: 'blue',
        bold: true,
        underline: true
      },
      cell: {
        bg: 'gray',
        selected: {
          bg: 'blue'
        }
      }
    }
  } as ListTableOptions)
