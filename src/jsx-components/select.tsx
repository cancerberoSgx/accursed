import { React } from '..'
import { getJSXChildrenProps, VirtualComponent } from '../blessed/virtualElement'
import { List, ListOptions } from '../blessedTypes'
import { Component } from '../jsx/component'
import { ArtificialEvent } from '../jsx/types'

interface SelectProps extends ListOptions {
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
    const items = childProps.filter(e => e.tagName === 'SelectOption')!.map(o => o.children.join(' '))
    const values = childProps.filter(e => e.tagName === 'SelectOption')!.map(o => o.attrs.value || o.children.join(' '))
    return (
      <list
        focusable={true}
        keys={true}
        keyable={true}
        interactive={true}
        clickable={true}
        vi={true}
        mouse={true}
        input={true}
        style={{ bg: 'blue', item: { bg: 'green' }, focus: { bg: 'yellow' }, selected: { bg: 'red' } }}
        {...this.props}
        children={undefined}
        items={items}
        onSelect={e => {
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
