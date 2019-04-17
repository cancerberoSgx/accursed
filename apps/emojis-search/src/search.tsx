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
import { getCategoryNames, getEmojiDefinitions } from './data/data'
import { inputOptions } from './elementOptions'
import { List } from './list'
import { Props } from './store/actions';
import { StoreComponent } from './storeComponent';
import { MainView } from './store/uiActions';

export class Search extends StoreComponent<Props> {
  _render() {
    const emojiDescriptions = getEmojiDefinitions(this.state.currentView===MainView.Emojis)
    return (
      <Div width="100%" height="100%">
        To search, focus the textbox below and press [enter] to start writing. [enter] for search. [esc] to restore
        focus navigation :
        <Br />
        <textbox
          {...inputOptions()}
          width="100%"
          padding={1}
          label="Search Query"
          height={5}
          input={true}
          {...{ value: 'ball' }}
          on={[
            'submit',
            (value: string) => {
              if (this.blessedElement && this.blessedElement.screen) {
                const v = value.toLowerCase().trim()
                this.log('search', v)
                const emojis = emojiDescriptions.filter(c => {
                  return JSON.stringify(c)
                    .toLowerCase()
                    .includes(v)
                })
                const container = this.findDescendant(
                  d => isElement(d) && d.name === 'search-list-container'
                )! as Element
                replaceChildren(
                  container,
                  React.render(
                    <Div>
                      Results for <Strong>"{v}"</Strong>
                      <List {...this.props}/>
                    </Div>
                  )
                )
                // container.children.forEach(c => c.destroy())
                // container.screen.render()
                // setTimeout(() => {
                //   container.append(
                //     React.render(
                //       <Div>
                //         Results for <Strong>"{v}"</Strong>
                //         <List emojis={emojis} />
                //       </Div>
                //     )
                //   )
                //   container.screen.render()
                // }, 10)
              }
            }
          ]}
        />
        <Br />
        <Br />
        <Br />
        <Br />
        <Br />
        <Br />
        <Div name="search-list-container">{this.state.categoriesView.selectedCategory&& <List{...this.props} />}</Div>
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
    const sel = getCategoryNames(this.state.currentView===MainView.Emojis)[index]
    const container = this.findDescendant(d => isElement(d) && d.name === 'search-list-container')! as Element
    replaceChildren(container, React.render(<List {...this.props}/>))
    // container.children.forEach(c => c.destroy())
    // container.screen.render()
    // setTimeout(() => {
    //   container.append()
    //   container.screen.render()
    // }, 10)
  }
}
