import { Component, React } from '..'
import { getJSXChildrenProps, VirtualComponent } from '../blessed/virtualElement'
import { BoxOptions, Element } from '../blessedTypes'
import { Div } from './jsxUtil'

interface RowsProps extends BoxOptions {
  children: Row[]
}
interface RowProps extends BoxOptions {
  children: JSX.BlessedJsxNode
}
export class Row extends VirtualComponent<RowProps> {}

/**

Rows layout. Examples:

Rows of same width:

```jsx
<Rows border="line">
  <Row bg='red'> Row one <button content="asdas"></button> hello</Row>
  <Row> Row two <button content="asdas"></button> hello</Row>
  <Row style={fg: 'blue'}> Row three <button content="asdas"></button> hello</Row>
</Rows>

Rows of custom width:

```jsx
<Rows border="line">
  <Row bg='red' height="30%" > Row one <button content="asdas"></button> hello</Row>
  <Row> Row two <button content="asdas"></button> hello</Row>
  <Row style={fg: 'blue'} height="70%" > Row three <button content="asdas"></button> hello</Row>
</Rows>

```
   */
export class Rows extends Component<RowsProps> {
  _saveJSXChildrenProps = true
  render() {
    const Rows = getJSXChildrenProps(this)!
      .filter(e => e.tagName === 'Row')!
      .map((c, i, Rows) => ({ ...c, height: c.attrs.height || `${Math.trunc(100 / Rows.length)}%` }))
    return (
      <Div {...this.props} _data={{...this.props._data||{}, __Rows_isRows: true}}>
        {Rows.map(c => (
          <Div {...c.attrs} width={c.attrs.width || '100%'} height={c.height} _data={{...c.attrs && c.attrs ._data||{}, __Rows_isRow: true}}>
            {c.children}
          </Div>
        ))}
      </Div>
    )
  }
}

export function isRows(e: Element){
  return e && e.options._data &&e.options._data.__Rows_isRows
}

export function isRow(e: Element){
  return e && e.options._data &&e.options._data.__Rows_isRow
}