import { readFileSync, writeFileSync } from 'fs'
import { ls, test } from 'shelljs'
import { FS } from '../context'

export class FSImpl implements FS {
  async read(path: string): Promise<string> {
    return readFileSync(path).toString()
  }
  async ls(path: string): Promise<string[]> {
    return ls(path)
  }
  async isDirectory(path: string): Promise<boolean> {
    return test('-d', path)
  }
  async write(path: string, content: string): Promise<void> {
    writeFileSync(path, content)
  }
}
