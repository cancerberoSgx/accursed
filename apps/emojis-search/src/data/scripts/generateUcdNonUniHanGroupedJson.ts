import { readFileSync, writeFileSync } from 'fs';
import { xml2js, Element } from 'xml-js';
import { Group, Block, CharWithGroup, getCharsWithBlockAndGroupIndexDocument, getCharsDefinitions } from './parseUcdGroupedXml';

function generateUcdNonUniHanGroupedJson() {
  const s = readFileSync('./data/ucd.nounihan.grouped.xml').toString();
  const obj = xml2js(s, { compact: false }) as Element;
  const groupElements = obj.elements!.find(e => e.name === 'ucd')!.elements!.find(e => e.name === 'repertoire')!.elements!.filter(e => e.name === 'group');
  const groups = groupElements.map(g => g.attributes as Group);
  const blocks = obj.elements!.find(e => e.name === 'ucd')!.elements!.find(e => e.name === 'blocks')!.elements!.filter(e => e.name === 'block').map(b => b.attributes as Block);
  const chars = groupElements.map(g => (g.elements || []).filter(e => e.name === 'char').map(char => ({ ...char.attributes, group: g.attributes as Group } as CharWithGroup))).flat();

  const result = getCharsDefinitions(chars, blocks, groups);
  writeFileSync('src/data/generated/ucd.nonunihan.grouped.json', JSON.stringify(result ))
  
  // console.log(blocks.map(b=>b.name).join('\n'));
  // toTsTest(chars, blocks, groups);
  // getCharsWithBlockAndGroupIndexDocumentTest(chars, blocks, groups);
  // getCharBlockTest(chars, blocks)
  // charsWithData.chars.map(c=>({...c, name: c.na||c.na1, category: c.block.name}))
}
generateUcdNonUniHanGroupedJson();



// export const emojiDescriptions: {[e in Emoji]: EmojiDefinition} = {
//   [Emoji['#⃣']]: {"name":"HASH KEY","unified":"0023-FE0F-20E3","non_qualified":"0023-20E3","docomo":"E6E0","au":"EB84","softbank":"E210","google":"FE82C","image":"0023-fe0f-20e3.png","sheet_x":0,"sheet_y":0,"short_name":"hash","short_names":["hash"],"text":null,"texts":null,"category":"Symbols","sort_order":131,"added_in":"3.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_facebook":false,"has_img_messenger":false}, 
// [Emoji['*⃣']]: {"name":null,"unified":"002A-FE0F-20E3","non_qualified":"002A-20E3","docomo":null,"au":null,"softbank":null,"google":null,"image":"002a-fe0f-20e3.png","sheet_x":0,"sheet_y":1,"short_name":"keycap_star","short_names":["keycap_star"],"text":null,"texts":null,"category":"Symbols","sort_order":132,"added_in":"3.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_facebook":false,"has_img_messenger":false}, 
// [Emoji['0⃣']]: {"name":"KEYCA