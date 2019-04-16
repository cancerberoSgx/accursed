import { BoxOptions, ListTableOptions } from 'accursed'
export const inputOptions: BoxOptions = {
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
}

export const listTableOptions: ListTableOptions = {
  ...inputOptions,
  border: 'line',
  align: 'center',
  scrollable: true,
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
    ...inputOptions.style,
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
}
