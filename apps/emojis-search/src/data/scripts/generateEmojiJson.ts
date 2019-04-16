import { readFileSync, writeFileSync } from 'fs'
import { printUnicodeCharacter } from './printUnicodeCharacter';
import { EmojiDefinition } from '../data';

export interface EmojiLongDefinition {
  name?: string | null
  unified?: string | null
  non_qualified?: string | null
  docomo?: string | null
  au?: string | null
  softbank?: string | null
  google?: string | null
  image?: string | null
  sheet_x?: number | null
  sheet_y?: number | null
  short_name?: string | null
  short_names?: string[] | null
  text?: string | null
  texts?: string[] | null
  category?: string | null
  sort_order?: number | null
  added_in?: string | null
  has_img_apple?: boolean | null
  has_img_google?: boolean | null
  has_img_twitter?: boolean | null
  has_img_facebook?: boolean | null
  has_img_messenger?: boolean | null
  skin_variations?: { [emoji: string]: EmojiLongDefinition } | null
  obsoleted_by?: string | null
  obsoletes?: string | null
}

const s = readFileSync('./data/emoji.json').toString()
const data = JSON.parse(s) as EmojiLongDefinition[]
const processed = data
.filter(e=>e&& e.non_qualified || e.unified || e.google)
.map(e=>({name: e.name||e.short_name, cp: e.non_qualified || e.unified || e.google || '', char: printUnicodeCharacter(e.non_qualified || e.unified || e.google || '', true), category: e.category})) as EmojiDefinition[]
writeFileSync('./src/data/generated/emoji.json', JSON.stringify(processed, null, 2))



