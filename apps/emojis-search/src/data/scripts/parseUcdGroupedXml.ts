// parses unicode xml data table as in https://www.unicode.org/Public/latest/ucdxml/
import { writeFileSync } from 'fs'
import {Element} from 'xml-js'
import { notFalsy, unique, uniqueNotFalsy } from '../../util';
import { printUnicodeCharacter } from "./printUnicodeCharacter";

export type CharWithGroup = Char&{group: Group}

export function getCharsDefinitions(chars: CharWithGroup[], blocks: Partial<Block_>[], groups: Partial<Group_>[]) {
  const charsWithBlockAndGroupIndex = chars.map(c => {
    const block = getCharBlock(c, blocks);
    if (!block) {
      console.log('block not found for char ', {...c, group: null});
      return undefined;
    }
    else {
      return { name: c.na||c.na1, category: block.name, cp: c.cp, char: printUnicodeCharacter(c.cp!, true) }
    }
  }).filter(notFalsy)
  return charsWithBlockAndGroupIndex
}


function toTsTest(chars: CharWithGroup[], blocks: Partial<Block_>[], groups: Partial<Group_>[]) {
  const code = toTs(chars, blocks, groups, blocks.map(b=>b.name!)
  .filter(b=>!['Variation Selectors Supplement', 'Tags', 'General Punctuation', 'Basic Latin'].includes(b))
  .filter(notFalsy));
  writeFileSync('test/getCharsWithBlockAndGroupIndexDocument.ts', code);
}

export function toTs(chars: CharWithGroup[], blocks: Partial<Block_>[], groups: Partial<Group_>[], filteredBlocks: string[]=blocks.map(b=>b.name).filter(notFalsy)) {
  // filteredBlocks = filteredBlocks || blocks.map(b=>b.name).filter(notFalsy)
  const parsedChars = getCharsWithBlockAndGroupIndexDocument(chars, blocks, groups);
  const filteredChars = parsedChars.chars.filter(c => c.blockName && filteredBlocks.includes(c.blockName));
  // ${filteredChars.map(c=>`'\u${c.cp}'`).join(', ')}
  const code = `
export enum Unicode12 {
  ${filteredChars
    .filter(c=>c.Hex!=='Y' || c.AHex!=='Y' || c.nv!=='Y') // filter digits since they cannot be enum names
    .map(c => `${printUnicodeCharacter(c.cp!, true)}`).join(', \n')}
}
${filteredChars.map(c => c.blockName).filter(uniqueNotFalsy).map(b => `
export enum ${b.replace(/[^a-zA-Z0-9_]/g, '_')} {
  ${filteredChars
    .filter(c=>c.Hex!=='Y' || c.AHex!=='Y' || c.nv!=='Y') // filter digits since they cannot be enum names

    .filter(c => c.blockName === b).map(c => printUnicodeCharacter(c.cp!, true) ).join(', ')}
}
`).join('\n')}
`;
  return code;
}


function getCharsWithBlockAndGroupIndexDocumentTest(chars: CharWithGroup[], blocks: Partial<Block_>[], groups: Partial<Group_>[]) {
  const result = getCharsWithBlockAndGroupIndexDocument(chars, blocks, groups);
  writeFileSync('test/getCharsWithBlockAndGroupIndexDocument.json', JSON.stringify(result, null, 2));
}

export function getCharsWithBlockAndGroupIndexDocument(chars: CharWithGroup[], blocks: Partial<Block_>[], groups: Partial<Group_>[]) {
  const charsWithBlockAndGroupIndex = chars.map(c => {
    const block = getCharBlock(c, blocks);
    if (!block) {
      console.log('block not found for char ', {...c, group: null});
      return undefined;
    }
    else {
      const groupIndex = groups.findIndex(g => g === c.group); //JSON.stringify(g)===JSON.stringify(c.group)) }
      const r = { ...c, groupIndex, name: c.na||c.na1, blockName: block.name }
      delete r.group
      return r;
    }
  }).filter(notFalsy)
  const result = {
    groups,
    chars: charsWithBlockAndGroupIndex,
  };
  return result
}

// let blockRanges: number[][]|undefined
function getCharBlockTest(chars: Char[], blocks: Block[]){
  const c = chars.find(c=>c.na==="SHOULDERED OPEN BOX")
  console.log({...c, group: null}, getCharBlock(c!, blocks));
}
function getCharBlock(c: Char, blocks: Block[]) : Block|undefined{
  if(!c.cp){
    console.log('Ignoring char ', {...c, group: null});
    return undefined
  }
blocks = blocks.filter(b=>b['first-cp'] && b['last-cp'])
  const blockRanges =blocks.map(b=>[parseInt(b['first-cp']!, 16),parseInt(b['last-cp']!, 16) ])
  const cp = parseInt(c.cp, 16)
  const blockIndex = blockRanges.findIndex(b=>b[0]<=cp && b[1]>=cp)
  if(blockIndex===-1){
    return undefined
  }
  return blocks[blockIndex]
}

/** print samples of object for create types with most attribtues */
function printTypeSamples(obj: Element) {
  const groups = obj.elements!.find(e => e.name === 'ucd')!.elements!.find(e => e.name === 'repertoire')!.elements!.filter(e => e.name === 'group');
  const blocks = obj.elements!.find(e => e.name === 'ucd')!.elements!.find(e => e.name === 'blocks')!.elements!.filter(e => e.name === 'block');
  // function findChar
  function findWithMostAttributes(a: Element[]): Element | undefined {
    let found: Element | undefined, max = -1;
    a.forEach(e => {
      const attrCount = Object.keys(e.attributes || {}).length;
      if (attrCount > max) {
        found = e;
        max = attrCount;
      }
    });
    return found;
  }
  console.log(JSON.stringify({ ...blocks[0], elements: null }));
  console.log('block', JSON.stringify({ ...(findWithMostAttributes(blocks) || {}).attributes || {} }));
  console.log('group', JSON.stringify({ ...(findWithMostAttributes(groups) || {}).attributes || {} }));
  console.log('char', JSON.stringify({ ...(findWithMostAttributes(groups.map(g => g.elements!.filter(e => e.name === 'char')!).flat()) || {}).attributes || {} }));
}


type Char = Partial<Char_>
interface Char_{
    'first-cp': string;
    'last-cp': string;
    age: string;
    na: string;
    JSN: string;
    gc: string;
    ccc: string;
    dt: string;
    cp: string
    dm: string;
    nt: string;
    nv: string;
    bc: string;
    Bidi_M: string;
    bmg: string;
    suc: string;
    slc: string;
    stc: string;
    uc: string;
    lc: string;
    tc: string;
    scf: string;
    cf: string;
    jt: string;
    jg: string;
    ea: string;
    lb: string;
    sc: string;
    Dash: string;
    WSpace: string;
    Hyphen: string;
    QMark: string;
    Radical: string;
    Ideo: string;
    UIdeo: string;
    IDSB: string;
    IDST: string;
    hst: string;
    DI: string;
    ODI: string;
    Alpha: string;
    OAlpha: string;
    Upper: string;
    OUpper: string;
    Lower: string;
    OLower: string;
    Math: string;
    OMath: string;
    Hex: string;
    AHex: string;
    NChar: string;
    VS: string;
    Bidi_C: string;
    Join_C: string;
    Gr_Base: string;
    Gr_Ext: string;
    OGr_Ext: string;
    Gr_Link: string;
    STerm: string;
    Ext: string;
    Term: string;
    Dia: string;
    Dep: string;
    IDS: string;
    OIDS: string;
    XIDS: string;
    IDC: string;
    OIDC: string;
    XIDC: string;
    SD: string;
    LOE: string;
    Pat_WS: string;
    Pat_Syn: string;
    GCB: string;
    WB: string;
    SB: string;
    CE: string;
    Comp_Ex: string;
    NFC_QC: string;
    NFD_QC: string;
    NFKC_QC: string;
    NFKD_QC: string;
    XO_NFC: string;
    XO_NFD: string;
    XO_NFKC: string;
    XO_NFKD: string;
    FC_NFKC: string;
    CI: string;
    Cased: string;
    CWCF: string;
    CWCM: string;
    CWKCF: string;
    CWL: string;
    CWT: string;
    CWU: string;
    NFKC_CF: string;
    isc: string;
    na1: string;
}

export type Block = Partial<Block_>
interface Block_  {
  'first-cp': string;
  'last-cp': string;
  name: string;
}

export type Group = Partial<Group_>
interface Group_  {
    age: string;
    na: string;
    JSN: string;
    gc: string;
    ccc: string;
    dt: string;
    dm: string;
    nt: string;
    nv: string;
    bc: string;
    Bidi_M: string;
    bmg: string;
    suc: string;
    slc: string;
    stc: string;
    uc: string;
    lc: string;
    tc: string;
    scf: string;
    cf: string;
    jt: string;
    jg: string;
    ea: string;
    lb: string;
    sc: string;
    Dash: string;
    WSpace: string;
    Hyphen: string;
    QMark: string;
    Radical: string;
    Ideo: string;
    UIdeo: string;
    IDSB: string;
    IDST: string;
    hst: string;
    DI: string;
    ODI: string;
    Alpha: string;
    OAlpha: string;
    Upper: string;
    OUpper: string;
    Lower: string;
    OLower: string;
    Math: string;
    OMath: string;
    Hex: string;
    AHex: string;
    NChar: string;
    VS: string;
    Bidi_C: string;
    Join_C: string;
    Gr_Base: string;
    Gr_Ext: string;
    OGr_Ext: string;
    Gr_Link: string;
    STerm: string;
    Ext: string;
    Term: string;
    Dia: string;
    Dep: string;
    IDS: string;
    OIDS: string;
    XIDS: string;
    IDC: string;
    OIDC: string;
    XIDC: string;
    SD: string;
    LOE: string;
    Pat_WS: string;
    Pat_Syn: string;
    GCB: string;
    WB: string;
    SB: string;
    CE: string;
    Comp_Ex: string;
    NFC_QC: string;
    NFD_QC: string;
    NFKC_QC: string;
    NFKD_QC: string;
    XO_NFC: string;
    XO_NFD: string;
    XO_NFKC: string;
    XO_NFKD: string;
    FC_NFKC: string;
    CI: string;
    Cased: string;
    CWCF: string;
    CWCM: string;
    CWKCF: string;
    CWL: string;
    CWT: string;
    CWU: string;
    NFKC_CF: string;
    isc: string;
    na1: string;

}



// const al