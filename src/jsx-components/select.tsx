import { React } from '..'
import { getJSXChildrenProps, VirtualComponent } from '../blessed/virtualElement'
import { List, ListOptions } from '../blessedTypes'
import { Component } from '../jsx/component'
import { ArtificialEvent } from '../jsx/types'

interface SelectProps extends ListOptions {
  /**TODO */
  onSelect?: (event: ArtificialEvent<List> & { value: any; index: number }) => void
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
  render() {
    const childProps = getJSXChildrenProps(this)!
    const items = childProps.filter(e => e.tagName === 'SelectOption')!.map(o => o.children.join(' ')) //.flat()
    const values = childProps.filter(e => e.tagName === 'SelectOption')!.map(o => o.attrs.value || o.children.join(' '))
    // log(items, values)
    return (
      <list
        focusable={true}
        clickable={true}
        mouse={true}
        input={true}
        style={{ bg: 'blue', focus: { bg: 'yellow' }, selected: { bg: 'red' } }}
        {...this.props}
        children={undefined}
        items={items}
        onSelect={e => {
          // log('onselect', e.index, e.currentTarget.selected, e.currentTarget.index)
          this.props.onSelect &&
            this.props.onSelect({
              ...e,
              index: e.currentTarget.selected || 0,
              value: values[e.currentTarget.selected || 0]
            })
        }}
      />
    )
  }
}
// }
