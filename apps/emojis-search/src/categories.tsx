import { ArtificialEvent, Box, Br, Component, Div, Element, isElement, List as ListElement, React } from 'accursed'
import { inputOptions, scrollableOptions } from './elementOptions'
import { getCategoryEmojis, List } from './list'

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
          items={this.getCategoryNames()}
          // on={['select item', (e:Element, index:number)=>this.selected(e)]}
          onSelect={e => this.selected(e)}
        />
        <Br />
        <Div name="list-container" height="70%">{this.props.category && <List category={this.props.category} />}</Div>
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
    container.children.forEach(c => {container.remove(c); c.destroy()})
    container.screen.render()
    // container.append(React.render(<List category={sel} />))    
    // container.screen.render()
    setTimeout(() => {
      container.append(React.render(<List category={sel} />))
      container.screen.render()
    }, 100)  
  }

  getCategoryNames(): string[] {
    return Object.keys(getCategoryEmojis())
  }
}
