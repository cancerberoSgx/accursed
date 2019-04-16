import { Component, Div, React, showInModal } from 'accursed'
import { EmojiDefinition, emojiDescriptions } from './data/emojis'
import { listTableOptions } from './elementOptions'

export class List extends Component<{
  category?: string
  emojis?: (EmojiDefinition & { emoji: string })[]
}> {
  render() {
    return (
      <Div>
        <listtable
          height="90%"
          width="100%"
          {...listTableOptions()}
          data={this.data()}
          onKeyPress={e => {
            if (e.key.name === 'enter' || e.key.name === 'space') {
              const c = this.data()[e.currentTarget.selected || 0][0]
              const emoji = (emojiDescriptions as any)[c]
              this.blessedElement.screen.copyToClipboard(JSON.stringify(emoji))
              const text = `
(Copied to clipboard as JSON data. Press [q] to dismiss this modal.)

${Object.keys(emoji)
  .filter(k => emoji[k])
  .map(k => ` * {bold}${k}{/bold}: ${typeof emoji[k] === 'object' ? JSON.stringify(emoji[k]) : emoji[k]}`)
  .join('\n')}
`.trim()
              const box = React.render(
                <box
                  scrollable={true}
                  tags={true}
                  mouse={true}
                  keys={true}
                  focused={true}
                  focusable={true}
                  content={text}
                  label={`Details for "${c}"`}
                  border="line"
                  padding={1}
                />
              )

              showInModal(this.blessedElement.screen, box, undefined, '70%', '90%')
              box.focus()
            }
          }}
        />
      </Div>
    )
  }
  data() {
    const arr = this.props.category ? getCategoryEmojis()[this.props.category] : this.props.emojis || []
    // if(this.props.category){
    // const arr = getCategoryEmojis()[this.props.category]
    return [
      ['Character', 'Code Points', 'Name'],
      ...arr.map(d => [d.emoji, d.unified || d.non_qualified || '', d.name || d.short_name || ''])
    ]
    // }
    // else if(this.props.emojis){
    //   return this.props.emojis
    // }
    // else {
    //   return []
    // }
  }
}

let categoryEmojis: { [c: string]: (EmojiDefinition & { emoji: string })[] }
export function getCategoryEmojis() {
  if (!categoryEmojis) {
    categoryEmojis = {}
    Object.keys(emojiDescriptions).forEach(k => {
      const e = (emojiDescriptions as any)[k]
      const name = e.category || 'Unknown'
      if (!categoryEmojis[name]) {
        categoryEmojis[name] = []
      }
      const c = categoryEmojis[name]
      c.push({ ...e, emoji: k })
    })
  }
  return categoryEmojis
}
