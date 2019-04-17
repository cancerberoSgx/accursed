import { readFileSync } from 'fs'
import { join } from 'path'

export interface EmojiDefinition {
  name: string
  cp: string
  category: string
  char: string
  [s: string]: string
}

let emojiDefinitions: EmojiDefinition[]

let ucdNonUniHanDefinitions: EmojiDefinition[]

export function getEmojiDefinitions() {
  if (!emojiDefinitions) {
    emojiDefinitions = JSON.parse(readFileSync(join(__dirname, 'generated', 'emoji.json')).toString()) //as EmojiDefinition[]
  }

  if (!ucdNonUniHanDefinitions) {
    ucdNonUniHanDefinitions = JSON.parse(
      readFileSync(join(__dirname, 'generated', 'ucd.nonunihan.grouped.json')).toString()
    ) //as EmojiDefinition[]
  }
  return ucdNonUniHanDefinitions
  // return emojiDefinitions
}

let categoryEmojis: { [c: string]: (EmojiDefinition)[] } | undefined
export function getCategoryEmojis() {
  if (!categoryEmojis) {
    categoryEmojis = {}
    const defs = getEmojiDefinitions()
    defs.forEach(e => {
      // const e = (defs as any)[k]
      const name = e.category || 'Unknown'
      if (!categoryEmojis![name]) {
        categoryEmojis![name] = []
      }
      const c = categoryEmojis![name]
      c.push({ ...e, emoji: e.char })
    })
  }
  return categoryEmojis
}
export function getCategoryNames() {
  return Object.keys(getCategoryEmojis())
}
