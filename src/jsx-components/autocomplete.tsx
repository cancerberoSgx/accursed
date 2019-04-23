import { Br, Component, Div, List, ListOptions, React, TextboxOptions } from '..'

interface P extends TextboxOptions {
  options: string[]
  inputOptions?: TextboxOptions
  listOptions?: ListOptions
}

export class AutoComplete extends Component<P> {
  protected options: string[]
  constructor(p: P, s: {}) {
    super(p, s)
    this.options = this.props.options
  }
  setOptions(options: string[]) {
    this.options = options
  }
  render() {
    const listRef = React.createRef<List>()
    return (
      <Div {...this.props}>
        <textbox
          hoverText="arrows to autocomplete"
          width={12}
          border="line"
          style={{ focus: { fg: 'white', bg: 'darkgray' } }}
          focusable={true}
          focused={true}
          clickable={true}
          keys={true}
          mouse={true}
          keyable={true}
          {...this.props.inputOptions || {}}
          onKeyPress={e => {
            setTimeout(() => {
              const list = listRef.current!
              const input = e.currentTarget
              if (input!._reading && list.hidden) {
                list.show()
                if (typeof list.selected === 'undefined' && list.items.length) {
                  list.select(0)
                }
              }
              if (!input!._reading && !list.hidden) {
                list.hide()
              }
              const value = input.getContent()
              if (e.key.name === 'up') {
                list.select(list.selected! > 0 ? list.selected! - 1 : list.items.length - 1)
                input.setValue(list.getItem(list.selected!) && list.getItem(list.selected!).getContent())
              } else if (e.key.name === 'down') {
                list.select(list.selected! < list.items.length! - 1 ? list.selected! + 1 : 0)
                input.setValue(list.getItem(list.selected!) && list.getItem(list.selected!).getContent())
              } else {
                const items = value.trim()
                  ? this.options.filter(o => o.toLowerCase().includes(value.trim().toLowerCase()))
                  : this.options
                list.setItems(items)
              }
              input.screen.render()
            }, 10)
          }}
        />
        <Br />
        <list
          hidden={true}
          width={12}
          height={7}
          style={{ fg: 'white', bg: 'darkgray', item: { fg: 'white', bg: 'darkgray' }, selected: { bg: 'blue' } }}
          items={this.options}
          {...this.props.listOptions || {}}
          ref={listRef}
        />
      </Div>
    )
  }
}
