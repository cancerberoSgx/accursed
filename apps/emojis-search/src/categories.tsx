import { Box, Br, Component, Div, Element, isElement, List as ListElement, React } from 'accursed'
import { ArtificialEvent } from '../../../dist/src/jsx/types'
import { inputOptions } from './elementOptions'
import { List } from './list'
import { enumKeys } from './util'

export enum categories {
  'flags' = 'flags',
  'symbols' = 'symbols'
}

export class Categories extends Component<{
  category?: categories
}> {
  render() {
    return (
      <Div>
        Choose a category:
        <Br />
        <list
          padding={1}
          {...inputOptions}
          height={10}
          items={this.getCategoryNames()}
          onSelect={e => this.selected(e)}
        />
        <Br />
        <Div name="list-container">{this.props.category && <List list={this.props.category} />}</Div>
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
    const sel = this.getCategoryNames()[index] as categories
    const container = this.findDescendant(d => isElement(d) && d.name === 'list-container')! as Element
    container.children.forEach(c => c.destroy())
    container.append(React.render(<List list={sel} />))
    container.screen.render()
  }

  getCategoryNames(): categories[] {
    return enumKeys(categories) as any
  }
}
