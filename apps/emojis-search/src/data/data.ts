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

let dataOnlyEmojis = true
// export function setOnlyEmojis(b: boolean){
//   dataOnlyEmojis = b
// }
// export function getOnlyEmojis(){
//   return dataOnlyEmojis
// }
export function getEmojiDefinitions() {
  if (!emojiDefinitions) {
    emojiDefinitions = JSON.parse(readFileSync(join(__dirname, 'generated', 'emoji.json')).toString()) //as EmojiDefinition[]
  }
  if (!ucdNonUniHanDefinitions) {
    ucdNonUniHanDefinitions = JSON.parse(
      readFileSync(join(__dirname, 'generated', 'ucd.nonunihan.grouped.json')).toString()
    ) //as EmojiDefinition[]
  }
return dataOnlyEmojis ? emojiDefinitions : ucdNonUniHanDefinitions
  // return emojiDefinitions
}

let categoryEmojis: { [c: string]: (EmojiDefinition)[] } | undefined
let categoryAllUnicode: { [c: string]: (EmojiDefinition)[] } | undefined
export function getCategoryEmojis() {
  // we repeat code because we dont want to load all unicode at the beggining when applcation startup sonly when user requires it
  if(dataOnlyEmojis){
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
  }else {
    if (!categoryAllUnicode) {
      categoryAllUnicode = {}
      const defs = getEmojiDefinitions()
      defs.forEach(e => {
        // const e = (defs as any)[k]
        const name = e.category || 'Unknown'
        if (!categoryAllUnicode![name]) {
          categoryAllUnicode![name] = []
        }
        const c = categoryAllUnicode![name]
        c.push({ ...e, emoji: e.char })
      })
    }
    return categoryAllUnicode
  }
 
}
export function getCategoryNames() {
  return Object.keys(getCategoryEmojis())
}
