import { arrayToObject, objectKeys, setObjectProperty } from 'misc-utils-of-mine-generic'
import { FailReason } from 'oboe'
import { inspect } from 'util'
import { TNode } from '../types'
import { isJSONObject } from '../util'
import { AppManager } from './AppManager'
const { format } = require('ansi-escape-sequences')
export class DataManager extends AppManager {
  constructor() {
    super()
  }
  protected formatNodeValue(name: string, value: any): string {
    let f: string[] = []
    const t = typeof value
    let v = ''
    if (t === 'number' || t === 'boolean') {
      f = ['blue']
      v = value + ''
    } else if (t === 'string') {
      f = ['red']
      v = value + ''
    } else if (t === null) {
      f = ['darkgray']
      v = 'null'
    } else {
      f = ['gray']
      v = inspect(value, { breakLength: 30, compact: true, maxArrayLength: 2 })
    }
    return this.options.noColors ? v : format(v, f)
  }
  protected formatNodeLabel(name: string, value: any): string {
    return format(name, ['magenta'])
  }
  handle(value: any, path: string[], partials: any[]): any {
    const node = this.buildTNodeWithVisualFeedback(path, value)
    setObjectProperty(this.data.children, path, { ...node.children })
    // debug('handle', path)
    this.dirty = true
  }
  protected buildTNode(value: any, name: string): TNode {
    if (isJSONObject(value) || Array.isArray(value)) {
      return {
        name: `${this.formatNodeLabel(name, value)}: ${this.formatNodeValue(name, value)}`,
        extended: false,
        children: arrayToObject(objectKeys(value), childName => this.buildTNode((value as any)[childName], childName))
      }
    } else {
      return {
        name: `${this.formatNodeLabel(name, value)}: ${this.formatNodeValue(name, value)}`,
        extended: false,
        children: {}
      }
    }
  }
  protected buildTNodeWithVisualFeedback(path: string[], value: any) {
    const valueFinished = this.loaded && (this.lastPath ? path.length < this.lastPath.length : false)
    this.lastPath = path
    const name = path[path.length - 1]
    const node = this.buildTNode(value, name)
    if (!valueFinished) {
      node.children = {
        ...(this.loaded || this.options.noLoadingFeedback
          ? {}
          : {
              [this.LOADING_MSG]: {
                name: this.LOADING_MSG,
                children: {},
                extended: false
              }
            }),
        ...node.children
      }
    }
    return node
  }
  failed(err: FailReason): any {
    this.log('An error occurred processing JSON input: ' + err)
    // showInModal(this.screen as any, 'An error occurred processing JSON input: ' + err)
  }
}
