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
    // debug(items)
    // log(items, values)
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
          // log('onselect', e.index, e.currentTarget.selected, e.currentTarget.index)
          this.props.onSelect &&
            this.props.onSelect({
              ...e,
              index: e.currentTarget.selected || 0,
              value: values[e.currentTarget.selected || 0]
            })
          //           e.currentTarget.setLabel(' ' +items[e.currentTarget.selected || 0] + ' ');
          // e.currentTarget.screen.render();
        }}
        // onKeyPress={e=>{
        //   if (e.key.name === 'up' || e.key.name === 'k') {
        //     e.currentTarget.up();
        //     e.currentTarget.screen.render();
        //   } else if (e.key.name === 'down' || e.key.name === 'j') {
        //     e.currentTarget.down();
        //     e.currentTarget.screen.render();
        //   }
        //   else if(e.key.name==='enter'||e.key.name==='space'){
        //     e.currentTarget.select(e.currentTarget.selected||0)
        //     e.currentTarget.screen.render();
        //   }
        // }}
      />
    )
  }
}
// }

// list.on('keypress', function(ch, key) {
//   if (key.name === 'up' || key.name === 'k') {
//     list.up();
//     screen.render();
//     return;
//   } else if (key.name === 'down' || key.name === 'j') {
//     list.down();
//     screen.render();
//     return;
//   }
// });

// list.on('select', function(item, select) {
//   list.setLabel(' ' + item.getText() + ' ');
//   screen.render();
// });
