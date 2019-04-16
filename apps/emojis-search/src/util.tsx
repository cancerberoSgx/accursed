let util;
export function charCodeHexString(s: string) {
  return s.split('').map(s => s.charCodeAt(0).toString(16)).map(n => `\\u${n}`).join('');
}
/** List given enum keys as array */
export function enumKeys(anEnum: any): string[] {
  const a = [];
  for (let i in anEnum) {
    a.push(i);
  }
  return a;
}


export function getDescriptions(descriptions: any): string[][] {
  const o : [any, string][]= []
 Object.keys(descriptions).forEach(s => {
    o.push([s, descriptions[s]])
  });
  return o 
}