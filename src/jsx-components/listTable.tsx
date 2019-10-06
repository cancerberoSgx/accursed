import { React } from '..'
import { getJSXChildrenProps, VirtualComponent } from '../blessed/virtualElement'
import { ListTableOptions, Style } from '../blessedTypes'
import { Component } from '../jsx/component'

interface ListTableProps extends ListTableOptions {
  children: (ListTableHead | ListTableBody)[]
}
interface ListTableHeadProps extends Style {
  style?: Style
  children: ListTableCell | ListTableCell[]
}
interface ListTableRowProps {
  children: ListTableCell | ListTableCell[]
}
interface ListTableBodyProps extends Style {
  style?: Style
  children: ListTableRowProps | ListTableRowProps[]
}
interface ListTableCellProps {
  children: JSX.BlessedJsxText | JSX.BlessedJsxText[]
}
export class ListTableHead extends VirtualComponent<ListTableHeadProps> { }
export class ListTableRow extends VirtualComponent<ListTableRowProps> { }
export class ListTableBody extends VirtualComponent<ListTableBodyProps> { }
export class ListTableCell extends VirtualComponent<ListTableCellProps> { }

/** 
   * Example:
```jsx
<ListTable2>
  <ListTableHead fg="red">
    <ListTableCell>Name</ListTableCell>
    <ListTableCell>Phone</ListTableCell>
    {}
  </ListTableHead>
  <ListTableBody fg="green">
    <ListTableRow>
      <ListTableCell>hello</ListTableCell>
      <ListTableCell>world</ListTableCell>
      {}
    </ListTableRow>
    <ListTableRow>
      <ListTableCell>hello2</ListTableCell>
      <ListTableCell>world2</ListTableCell>
      {}
    </ListTableRow>
    {data.map(d => (
      <ListTableRow>
        <ListTableCell>{d[0]}</ListTableCell>
        <ListTableCell>{d[1]}</ListTableCell>
        {}
      </ListTableRow>
    ))}
    {}
  </ListTableBody>
  {}
</ListTable2>

```
   */
export class ListTable2 extends Component<ListTableProps> {
  _saveJSXChildrenProps = true
  render() {
    const childProps = getJSXChildrenProps(this)!
    const ths = childProps.find(e => e.tagName === 'ListTableHead')!.children.map(c => (c as any).children.join(' '))
    const tds = childProps
      .find(e => e.tagName === 'ListTableBody')!
      .children.filter(c => (c as any).tagName === 'ListTableRow')
      .map(c => (c as any).children.map((c: any) => c.children.join('')))
    const headStyle = childProps.find(e => e.tagName === 'ListTableHead')!.attrs || {}
    const bodyStyle = childProps.find(e => e.tagName === 'ListTableBody')!.attrs

    return (
      <listtable
        {...this.props}
        style={{
          ...this.props.style,
          header: { ...(this.props.style && this.props.style.header), ...headStyle },
          cell: { ...(this.props.style && this.props.style.cell), ...bodyStyle }
        }}
        {...{ ...(this.props || {}), children: undefined }}
        data={[ths, ...tds]}
      />
    )
  }
}
// }
