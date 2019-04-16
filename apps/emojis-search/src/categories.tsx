import { Box, Br, Component, Div, Element, isElement, List as ListElement, React } from 'accursed'
import { ArtificialEvent } from '../../../dist/src/jsx/types'
import { inputOptions } from './elementOptions'
import { List, getCategoryEmojis } from './list'
import { enumKeys } from './util'
import { emojiDescriptions } from './data/emojis';

// export enum categories {
//   'Country Flags' = 'Country Flags',
//   'symbols' = 'symbols',
//   'buttons' = 'buttons'
// }

export class Categories extends Component<{
  category?: string
}> {
  render() {
    return (
      <Div>
        Choose a category:
        {Object.values(emojiDescriptions).map(e=>e.category).filter((c,i,a)=>a.indexOf(c)===i).join(' ')}
        <Br />
        <list
          padding={1}
          {...inputOptions}
          height={6}
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
    const sel = this.getCategoryNames()[index] 
    const container = this.findDescendant(d => isElement(d) && d.name === 'list-container')! as Element
    container.children.forEach(c => c.destroy())
    container.append(React.render(<List list={sel} />))
    container.screen.render()
  }

  getCategoryNames(): string[] {
    return Object.keys(getCategoryEmojis())
  }
}
