import {
  ArtificialEvent,
  Box,
  Br,
  Component,
  Div,
  Element,
  isElement,
  List as ListElement,
  React,
  replaceChildren,
  input,
  Columns,
  Column
} from 'accursed'
import { getCategoryNames } from './data/data'
import { scrollableOptions, inputOptions } from './elementOptions'
import { List } from './list'

export class Categories extends Component<{
  category?: string
}> {
  protected listRef = React.createRef<ListElement>()
  render() {
    return (
      <Div>
        <Columns height={7}>
        <Column>
        Choose a category, filter them if there are too many, select character in the table to see its details. Switch for a compat view or click "Save" to open the results in  an editor. 
        </Column>
        <Column>
        <textbox
          {...inputOptions()}
          width="40%"
          padding={1}
          label="Filter Categories"
          height={5}
          input={true}
          {...{ value: '' }}
          on={[
            'submit',
            (value: string) => {
              this.categoryFilter = value||''
              this.listRef.current!.setItems (this.getCategoryNames())
              this.listRef.current!.screen.render()
              }
          ]}
        />
        </Column>
        {}
        </Columns>
       
        <Br />
        <list
        ref={this.listRef}
          // padding={1}
          {...scrollableOptions()}
          height={'20%'}
          items={this.getCategoryNames()}
          // on={['select item', (e:Element, index:number)=>this.selected(e)]}
          onSelect={e => this.selected(e)}
        />
        <Br />
        <Div name="list-container" height="70%">
          {this.props.category && <List category={this.props.category} />}
        </Div>
      </Div>
    )
  }

  protected categoryFilter =''
  protected getCategoryNames(){
    const r = getCategoryNames().filter(c=>c.toLowerCase().trim().includes(this.categoryFilter.toLowerCase().trim()))
    return r.length === 0 ? ['No Results for '+this.categoryFilter] : r
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
