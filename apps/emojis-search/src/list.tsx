import { Component, React, Div, Prompt, listtable, showInModal, ListTable, isElement } from 'accursed'
import { EmojiDefinition, emojiDescriptions, Emoji } from './data/emojis'
import { listTableOptions, inputOptions } from './elementOptions'

export class List extends Component<{
  list: string
}> {
  render() {
    return <Div>
      <listtable height="100%" width="100%" {...listTableOptions()} data={this.data()} 
      onKeyPress={e=>{
        if(e.key.name==='enter'||e.key.name==='space'){
          const c = this.data()[e.currentTarget.selected||0][0] 
          const emoji = (emojiDescriptions as any)[c]
          showInModal(this.blessedElement.screen, JSON.stringify(emoji, null, 2), `${c} Details. Copied to clipboard. [ESC] to close`)
        }
    }}  /></Div>
  }
  data() {
    const arr = getCategoryEmojis()[this.props.list]
    return [
      ['Character', 'Code Points', 'Name', 'Other'],
      ...arr.map(d => [d.emoji, d.unified||d.non_qualified||'', d.name||d.short_name||'', 'TODO'])
    ]
  }
}


let categoryEmojis: { [c: string]: (EmojiDefinition&{emoji: string})[] }
export function getCategoryEmojis() {
  if (!categoryEmojis) {
    categoryEmojis = {}
    Object.keys(emojiDescriptions).forEach(k => {
      const e = (emojiDescriptions as any)[k]
      const name = e.category||'Unknown'
      if (!categoryEmojis[name]) {
        categoryEmojis[name] = []
      }
      const c = categoryEmojis[name]
      c.push({...e, emoji: k})
    })
  }
  return categoryEmojis
}