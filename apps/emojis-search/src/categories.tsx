import { React, Div, Component, Br, isElement, Element, Box, List as ListElement } from 'accursed';
import { ArtificialEvent } from '../../../dist/src/jsx/types';
import { enumKeys } from './util';
import { inputOptions } from "./elementOptions";
import { List } from "./list";

export enum categories {
  'flags' = 'flags',
  'symbols' = 'symbols'
}

export class Categories extends Component<{
  category?: categories;
}> {
  render() {
    return <Div  >
      Choose a category:<Br />
      {/* <Br /> */}
      {/* <Div>  */}
        <list padding={1} {...inputOptions} height={10} items={this.getCategoryNames()} onSelect={e => this.selected(e)} />
        {/* </Div> */}
      <Br />
      <Div name="list-container">
        {this.props.category && <List list={this.props.category}></List>}
      </Div>
    </Div>;
  }

  selected(e: ArtificialEvent<ListElement> & {
    index: number;
    element: Box;
  }): void {
    const index = e.currentTarget.selected || 0;
    const sel = this.getCategoryNames()[index] as categories;
    const container = this.findDescendant(d => isElement(d) && d.name === 'list-container')! as Element;
    container.children.forEach(c => c.destroy());
    // this.log('sebass', sel, index, e.currentTarget.selected)
    e.currentTarget.selected;
    container.append(React.render(<List list={sel} />));
    container.screen.render();
  }

  getCategoryNames(): categories[] {
    return enumKeys(categories) as any;
  }
}
