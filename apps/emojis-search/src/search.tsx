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
  Strong
} from 'accursed'
import { EmojiDefinition, emojiDescriptions } from './data/emojis'
import { inputOptions } from './elementOptions'
import { getCategoryEmojis, List } from './list'

export class Search extends Component<{
  category?: string
}> {
  render() {
    return (
      <Div width="100%" height="100%">
        To search, focus the textbox below and press [enter] to start writing. [enter] for search. [esc] to restore
        focus navigation :
        <Br />
        <textbox
          {...inputOptions()}
          width="90%"
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
                const emojis = Object.keys(emojiDescriptions)
                  .filter(k => {
                    const e = (emojiDescriptions as any)[k] as EmojiDefinition
                    return JSON.stringify(
                      [
                        e.name,
                        e.short_name,
                        e.text,
                        e.texts && e.texts.join(' '),
                        e.short_names && e.short_names.join(' '),
                        e.au
                      ]
                        .filter(T => T)
                        .join(' ')
                    ).includes(v) // TODO: do this better
                  })
                  .map(k => ({ ...(emojiDescriptions as any)[k], emoji: k }))
                const container = this.findDescendant(d => isElement(d) && d.name === 'list-container')! as Element
                container.children.forEach(c => c.destroy())
                container.screen.render()
                setTimeout(() => {
                  container.append(
                    React.render(
                      <Div>
                        Results for <Strong>"{v}"</Strong>
                        <List emojis={emojis} />
                      </Div>
                    )
                  )
                  container.screen.render()
                }, 10)
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
        <Div name="list-container">{this.props.category && <List category={this.props.category} />}</Div>
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
    container.screen.render()
    setTimeout(() => {
      container.append(React.render(<List category={sel} />))
      container.screen.render()
    }, 10)
  }

  getCategoryNames(): string[] {
    return Object.keys(getCategoryEmojis())
  }
}
