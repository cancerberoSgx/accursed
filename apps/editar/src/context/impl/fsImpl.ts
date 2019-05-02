import { readFileSync, writeFileSync } from 'fs'
import { ls, test } from 'shelljs'
import { FS, FSGlobOptions } from '../context'
import { pathJoin } from 'misc-utils-of-mine-generic';
const pm = require('picomatch') 

export class FSImpl implements FS {
async cwd(){
  return '.'
}
  async read(path: string): Promise<string> {
    return readFileSync(path).toString()
  }
  async ls(path: string): Promise<string[]> {
    return ls(path)
  }
  // async list(patterns: string[], options: FSGlobOptions = {}): Promise<string[]> {
  //   options = options || {}
  //   options.cwd = options.cwd || await this.cwd();
  //   const format = str => str.replace(/^\.\//, '');
  //   const predicate = pm(patterns, { format });
  //   const files = await this.ls(options.cwd)
  //   const process = async (files: string[], predicate: ((s:string)=>boolean)) => {
  //     // const r = await Promise.all(files.filter(f=>!predicates.find(p=>{
  //     //   const abs = pathJoin(cwd, f)
  //     //   console.log(abs, p(abs));        
  //     //   return !p(abs)
  //     // })))
  //     // const absFiles = files.map(f=>pathJoin(cwd, f))
  //     const results= files. filter(f=>{
  //       console.log(f, predicate(f));        
  //       return predicate(f)
  //     })
  //     //.map(async f=>({path: f, isDirectory: await this.isDirectory(f) })))
  //     // r.forEach(f=>results.push(f.path))
  //     // const results =  r.map(f=>pathJoin(cwd, f))
  //     const withIsDir = await Promise.all(files.map(async path=>({path, isDirectory: await this.isDirectory(path)})))
  //     const all = withIsDir.filter(f=>f.isDirectory).map(async d=>{
  //       const children = (await this.ls(d.path)).map(f=>pathJoin(d.path, f))
  //       return  await process(children, predicate)
  //     })
  //     results.push(...(await Promise.all(all)).flat())
  //     return results
  //   }
  //   return await process(files, predicate)
  // }

  async isDirectory(path: string): Promise<boolean> {
    return test('-d', path)
  }
  async write(path: string, content: string): Promise<void> {
    writeFileSync(path, content)
  }
  static instance = new FSImpl
}
