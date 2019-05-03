import { React } from '..'
import { getJSXChildrenProps, VirtualComponent } from '../blessed/virtualElement'
import { IKeyEventArg, List, ListOptions } from '../blessedTypes'
import { Component } from '../jsx/component'
import { ref, resolveRef } from '../jsx/createElement'
import { ArtificialEvent } from '../jsx/types'
import { Div } from './jsxUtil';

interface SelectProps extends ListOptions {
  /**
   * Emitted when user presses enter or clicks over a selected button. This is not triggers when user uses the arrow keys to move through the item list.
   */
  onSelect?: (event: ArtificialEvent<List> & { value: any; index: number }) => void
  /**
   * Emitted when user uses the arrow keys to move through the item list.Not emitted when user presses enter or clicks over a selected button.
   */
  onSelectItem?: (event: ArtificialEvent<List> & { value: any; index: number }) => void
  /**
   * If given, those keys will be installed in the list to advance 1 page down. By default [pagedown] is installed.
   */
  pageDownKeys?: string[]
  /**
   * If given, those keys will be installed in the list to advance 1 page up. By default [pagedown] is installed.
   */
  pageUpKeys?: string[]
  children: (SelectOption)[]
}
interface SelectOptionProps {
  value?: any
  children: JSX.BlessedJsxText
}
export class SelectOption extends VirtualComponent<SelectOptionProps> {}

/** 
A select options widget similar to HTML's using blessed list widget.

Example:

```
<Select onChange={e=>log(e.value)}>
  <SelectOption value="foo">Foo</SelectOption>
  <SelectOption value="bar">Boo</SelectOption>
</Select>
```
   */
export class Select extends Component<SelectProps> {
  _saveJSXChildrenProps = true
  list: List
  items: string[]
  values: any[]
  render() {
    this.props.pageDownKeys = this.props.pageDownKeys || ['pagedown']
    this.props.pageUpKeys = this.props.pageUpKeys || ['pageUp']
    const childProps = getJSXChildrenProps(this)!
    const selectOptions = childProps.filter(e => e.tagName === 'SelectOption')!
    this.items = selectOptions.map(o => o.children.join(' '))
    this.values = selectOptions.map(o => o.attrs.value || o.children.join(' '))
    return (
        <list
      ref={ref<List>(c => {this.list = c
      // ; resolveRef(this.props, this)
      })}
      focusable={true}
      keys={true}
      keyable={true}
      interactive={true}
      clickable={true}
      vi={true}
      mouse={true}
      input={true}
      style={{ bg: 'blue', item: { bg: 'green' }, focus: { bg: 'yellow' }, selected: { bg: 'red' } }}
      // {...{ ...this.props, ref: undefined }}
      // children={undefined}
      items={this.items}
      on={[
      'select item',
      (item, index) => {
      this.props.onSelectItem &&
      this.props.onSelectItem({
      currentTarget: this.list,
      index: index || 0,
      value: this.values[index || 0]
      })
      }
      ]}
      onSelect={e => {
      this.props.onSelect &&
      this.props.onSelect({
      ...e,
      index: e.currentTarget.selected || 0,
      value: this.values[e.currentTarget.selected || 0]
      })
      }}
      onKeyPress={this.onKeyPress}
      />
    )
  }

  onKeyPress({ ch, key }: { ch: string; key: IKeyEventArg }) {
    if (key.name === 'pageup') {
      this.list.move(Math.min(0, this.list.selected - (this.list.height as number)))
    }
    if (key.name === 'pagedown') {
      this.list.move(Math.max(this.list.items.length - 1, this.list.selected + (this.list.height as number)))
    }
    this.screen.render()
  }
  // onKeyPress(ch: string, key: IKeyEventArg{currentTarget: Element}) {
  //   if(key.name==='pageup') {

  //   }
  //   throw new Error('Method not implemented.');
  // }
  /**
   * Will hide those items for which given predicate returns false. Since items won't be removed, calling filter again will filter the whole list again, no just the currently visible items.
   */
  filter(predicate: (value: string, index: number) => boolean) {
    this.list.setItems(this.values.filter((value, i) => predicate(value, i)))
    this.screen.render()
    // this.list.items.forEach((item, i)=>{
    //   const r = predicate(  this.values[i],  i, item)
    //   if(r ){
    //     this.list.removeItem()
    //     item.show()
    //   }
    //   else {
    //     item.hide()
    //   }
    // })
  }
}
