import { Component, Div, List, ListOptions, React, TextboxOptions } from '..'
import { Textbox } from '../blessedTypes'
import { notSameNotFalsy } from '../util/misc'
import { ArtificialEvent } from '../jsx/types';

interface P extends TextboxOptions {

  onChange?(e: ArtificialEvent<Textbox> & {
    value: any;
}): void;
  
// /**
  //  * Throttling time to render suggestion list. Default value is -1 which does not throttle.
  //  */
  // suggestionRenderThrottle?: number;
  /**
   * Suggestion array
   */
  options?: string[]
  /**
   * Maximum amount of options suggested to the user for an input. Note: Suggesting too much options can degrade the user experience while typing. Default value is 10.
   */
  optionsMax?: number
  inputOptions?: TextboxOptions
  listOptions?: ListOptions
  // onChange?(e: ArtificialEvent<Textbox>&{value})
}
/**
 * Basic autocomplete input, with given options string array using textbox and a list. The list is only shown
 * when there are matches and the textbox is being edited.
 *
 * TODO: options to be (value:string)=>Promise<string[]>
 */
export class AutoComplete extends Component<P> {
  protected options: string[] = []

  constructor(p: P, s: {}) {
    super(p, s)
    this.setOptions(this.props.options || [])
  }

  setOptions(options: string[]) {
    this.options = options.map(s => s.trim().toLowerCase()).filter(notSameNotFalsy)
  }

  get list() {
    return this.listRef.current!
  }

  get input() {
    return this.inputRef.current!
  }

  protected listRef = React.createRef<List>(current => {
    if (this.props.listOptions && this.props.listOptions.ref) {
      // SO users still can pass ref in options
      this.props.listOptions.ref.current = current
    }
  })

  protected inputRef = React.createRef<Textbox>(current => {
    if (this.props.inputOptions && this.props.inputOptions.ref) {
      // SO users still can pass ref in options
      this.props.inputOptions.ref.current = current
    }
  })

  render() {
    return (
      <Div {...this.props} onChange={undefined}>
        <textbox
          hoverText="arrows to autocomplete"
          width={12}
          border="line"
          style={{ focus: { fg: 'white', bg: 'darkgray' } }}
          focusable={true}
          focused={true}
          clickable={true}
          ref={this.inputRef}
          keys={true}
          mouse={true}
          keyable={true}
          {...this.props.inputOptions || {}}

          onChange={e=>{
            this.props.onChange && this.props.onChange(e)
          }}

          onKeyPress={
            // throttle(
            e => {
              const list = this.listRef.current!
              const input = e.currentTarget!
              if (input._reading && list.hidden) {
                list.show()
                if (typeof list.selected === 'undefined' && list.items.length) {
                  list.select(0)
                }
                input.screen.render()
              } else if (!input._reading && !list.hidden) {
                list.hide()
                input.screen.render()
              }
              const value = input.getContent().trim()
              if (e.key.name === 'up') {
                const selected = list.selected! > 0 ? list.selected! - 1 : list.items.length - 1
                list.select(selected)
                const val = list.getItem(selected).getContent()
                if (val) {
                  input.setValue(val)
                  input.screen.render()
                }
              } else if (e.key.name === 'down') {
                const selected = list.selected! < list.items.length! - 1 ? list.selected! + 1 : 0
                list.select(selected)
                const val = list.getItem(selected).getContent()
                if (val) {
                  input.setValue(val)
                  input.screen.render()
                }
              } else {
                const v = value.toLowerCase()
                if (v) {
                  let items = this.options.filter(o => o.includes(v))
                  items = items.splice(0, Math.min(this.props.optionsMax || 10, items.length))
                  list.setItems(items)
                  input.screen.render()
                }
              }
            }
            // , this.props.suggestionRenderThrottle||1000, {trailing: true})
          }
        />
        <list
          hidden={true}
          width={12}
          height={7}
          style={{ fg: 'white', bg: 'darkgray', item: { fg: 'white', bg: 'darkgray' }, selected: { bg: 'blue' } }}
          items={this.options}
          {...this.props.listOptions || {}}
          ref={this.listRef}
        />
      </Div>
    )
  }
}
