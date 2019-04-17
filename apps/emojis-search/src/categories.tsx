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
  replaceChildren
} from 'accursed'
import { getCategoryNames } from './data/data'
import { scrollableOptions } from './elementOptions'
import { List } from './list'

export class Categories extends Component<{
  category?: string
}> {
  render() {
    return (
      <Div>
        Choose a category, select and emoji and press [ENTER] for details.
        <Br />
        <list
          // padding={1}
          {...scrollableOptions()}
          height={'20%'}
          items={getCategoryNames()}
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

  selected(
    e: ArtificialEvent<ListElement> & {
      index: number
      element: Box
    }
  ): void {
    const index = e.currentTarget.selected || 0
    const sel = getCategoryNames()[index]
    const container = this.findDescendant(d => isElement(d) && d.name === 'list-container')! as Element
    replaceChildren(container, React.render(<List category={sel} />))
  }
}
