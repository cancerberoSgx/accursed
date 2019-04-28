import {
  ArtificialEvent,
  Box,
  Column,
  Columns,
  Component,
  Div,
  Element,
  isElement,
  List as ListElement,
  React,
  replaceChildren,
  Row,
  Rows
} from 'accursed'
import { getCategoryNames } from './data/data'
import { inputOptions, scrollableOptions } from './elementOptions'
import { List } from './list'

export class Categories extends Component<{
  category?: string
}> {
  protected listRef = React.createRef<ListElement>()
  render() {
    return (
      <Div>
        <Rows>
          <Row height="30%">
            Choose a category, filter them if there are too many, select character in the table to see its details.
            Switch for a compat view or click "Save" to open the results in an editor.
            {/* 
        <Row> */}
            <Columns>
              <Column width="40%">
                <textbox
                  {...inputOptions()}
                  width="100%"
                  padding={1}
                  label="Filter Categories"
                  height={5}
                  input={true}
                  {...{ value: '' }}
                  on={[
                    'submit',
                    (value: string) => {
                      this.categoryFilter = value || ''
                      this.listRef.current!.setItems(this.getCategoryNames())
                      this.listRef.current!.screen.render()
                    }
                  ]}
                />
              </Column>
              <Column width="60%">
                <list
                  ref={this.listRef}
                  // padding={1}
                  {...scrollableOptions()}
                  height={'60%'}
                  items={this.getCategoryNames()}
                  onSelect={e => this.selected(e)}
                />
              </Column>
              {}
            </Columns>
            {}
          </Row>
          <Row height="70%">
            <Div name="list-container" top={0} height="100%" width="100%">
              {this.props.category && <List category={this.props.category} />}
            </Div>
          </Row>
          {}
        </Rows>
      </Div>
    )
  }

  protected categoryFilter = ''
  protected getCategoryNames() {
    const r = getCategoryNames().filter(c =>
      c
        .toLowerCase()
        .trim()
        .includes(this.categoryFilter.toLowerCase().trim())
    )
    return r.length === 0 ? ['No Results for ' + this.categoryFilter] : r
  }

  selected(
    e: ArtificialEvent<ListElement> & {
      index: number
      element: Box
    }
  ): void {
    const index = e.currentTarget.selected || 0
    const sel = this.getCategoryNames()[index]
    const container = this.findDescendant(d => isElement(d) && d.name === 'list-container')! as Element
    replaceChildren(container, React.render(<List category={sel} />))
  }
}
