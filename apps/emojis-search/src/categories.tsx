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
  Strong
} from 'accursed'
import { getCategoryNames } from './data/data'
import { scrollableOptions } from './elementOptions'
import { List } from './list'
import { Props } from './store/actions';
import { UnicodeStoreComponent } from './storeComponent';

export class Categories extends UnicodeStoreComponent  {
  _render() {
    return (
      <Div>
        {/* {getOnlyEmojis() ? <Div>Showing only Emojis, a small category inside the whole <Strong>UniCode</Strong> set. </Div> : <Div>Showing the whole <Strong>UniCode</Strong> set. this is a lot of data, more tools to come for better experience to come</Div>}
        <Br/>
        Choose a category, use the mouse, or mouse wheel to scroll, and press enter or double click to select an icon for for details.
        <Br /> */}
        <list
          {...scrollableOptions()}
          height={'20%'}
          items={this.getCategoryNames()}
          onSelect={e => this.selected(e)}
          width="100%"
        />
        <Br />
        <Div name="list-container" height="70%">
          {this.state.categoriesView.selectedCategory && <List {...this.props} />}
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
    const sel = this.getCategoryNames()[index]
    const container = this.findDescendant(d => isElement(d) && d.name === 'list-container')! as Element
    replaceChildren(container, React.render(<List {...this.props}/>))
  }
}
