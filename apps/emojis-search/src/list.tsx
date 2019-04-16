import { Component, React } from 'accursed'
import { EmojiDefinition, emojiDescriptions, Emoji } from './data/emojis'
import { countryFlagsDescriptions } from './data/countryFlags'
import { symbolsDescriptions } from './data/symbols'
import { listTableOptions } from './elementOptions'
import { charCodeHexString, getDescriptions } from './util'
import { buttonsDescriptions } from './data/buttons';

export class List extends Component<{
  list: string
}> {
  render() {
    return <listtable height="100%" width="100%" {...listTableOptions} data={this.data()} />
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
      // , emoji: k.length+' seee'}
      c.push({...e, emoji: k})
    })
  }
  return categoryEmojis
}