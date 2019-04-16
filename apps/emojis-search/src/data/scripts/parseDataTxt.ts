import { readFileSync, writeFileSync } from 'fs';

export interface EmojiDefinition {
  "name"?: string | null;
  "unified"?: string | null;
  "non_qualified"?: string | null;
  "docomo"?: string | null;
  "au"?: string | null;
  "softbank"?: string | null;
  "google"?: string | null;
  "image"?: string | null;
  "sheet_x"?: number | null;
  "sheet_y"?: number | null;
  "short_name"?: string | null;
  "short_names"?: string[] | null;
  "text"?: string | null;
  "texts"?: string[]| null;
  "category"?: string | null;
  "sort_order"?: number | null;
  "added_in"?: string | null;
  "has_img_apple"?: boolean | null;
  "has_img_google"?: boolean | null;
  "has_img_twitter"?: boolean | null;
  "has_img_facebook"?: boolean | null;
  "has_img_messenger"?: boolean | null;
  "skin_variations"?: { [emoji: string]: EmojiDefinition } | null
  "obsoleted_by"?: string | null
  "obsoletes"?: string | null
}

const s = readFileSync('./data/emoji.json').toString()
const data = JSON.parse(s) as EmojiDefinition[]
const out = `
export interface EmojiDefinition {
  "name"?: string | null;
  "unified"?: string | null;
  "non_qualified"?: string | null;
  "docomo"?: string | null;
  "au"?: string | null;
  "softbank"?: string | null;
  "google"?: string | null;
  "image"?: string | null;
  "sheet_x"?: number | null;
  "sheet_y"?: number | null;
  "short_name"?: string | null;
  "short_names"?: string[] | null;
  "text"?: string | null;
  "texts"?: string[] | null;
  "category"?: string | null;
  "sort_order"?: number | null;
  "added_in"?: string | null;
  "has_img_apple"?: boolean | null;
  "has_img_google"?: boolean | null;
  "has_img_twitter"?: boolean | null;
  "has_img_facebook"?: boolean | null;
  "has_img_messenger"?: boolean | null
  "skin_variations"?: { [emoji: string]: EmojiDefinition } | null
  "obsoleted_by"?: string | null
  "obsoletes"?: string | null
}

export enum Emoji { 
  ${data
    .map(e => `
    '${`${(e.non_qualified || e.unified || e.google || '').split('-').map(s => String.fromCodePoint(parseInt('0x' + s, 16))).join('')}`}' = '${`${(e.non_qualified || e.unified || e.google || '').split('-').map(s => String.fromCodePoint(parseInt('0x' + s, 16))).join('')}`}'
  `.trim()).join(', ')} 
}

export const emojiDescriptions: {[e in Emoji]: EmojiDefinition} = {
  ${data
    .map(e => `
    [Emoji['${`${(e.non_qualified || e.unified || e.google || '').split('-').map(s => String.fromCodePoint(parseInt('0x' + s, 16))).join('')}`}']]: ${JSON.stringify(e)}
  `.trim()).join(', \n')} 
}
`.trim()


writeFileSync('./src/data/emojis.ts', out)