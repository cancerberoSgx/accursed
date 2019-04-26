import { Component, React } from '..'
import { getJSXChildrenProps, VirtualComponent } from '../blessed/virtualElement'
import { BoxOptions } from '../blessedTypes'
import { Div } from './jsxUtil'

interface ColumnsProps extends BoxOptions {
  children: Column[]
}
interface ColumnProps extends BoxOptions {
  children: JSX.BlessedJsxNode
}
export class Column extends VirtualComponent<ColumnProps> {}

/**

Columns layout. Examples:

Columns of same width:

```jsx
<Columns border="line">
  <Column bg='red'> column one <button content="asdas"></button> hello</Column>
  <Column> column two <button content="asdas"></button> hello</Column>
  <Column style={fg: 'blue'}> column three <button content="asdas"></button> hello</Column>
</Columns>

Columns of custom width:

```jsx
<Columns border="line">
  <Column bg='red' width="30%" > column one <button content="asdas"></button> hello</Column>
  <Column> column two <button content="asdas"></button> hello</Column>
  <Column style={fg: 'blue'} width="70%" > column three <button content="asdas"></button> hello</Column>
</Columns>

```
   */
export class Columns extends Component<ColumnsProps> {
  _saveJSXChildrenProps = true
  render() {
    const columns = getJSXChildrenProps(this)!
      .filter(e => e.tagName === 'Column')!
      .map((c, i, columns) => ({ ...c, width: c.attrs.width || `${Math.trunc(98 / columns.length)}%` }))
    return (
      <Div {...this.props}>
        {columns.map(c => (
          <Div {...c.attrs} height={c.attrs.height || '100%'} width={c.width}>
            {c.children}
          </Div>
        ))}
      </Div>
    )
  }
}
