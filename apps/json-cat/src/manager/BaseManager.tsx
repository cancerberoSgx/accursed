import { debug } from 'accursed'
import { EventEmitter } from 'events'
import { managerOptions, TNode } from '../types'
import { DataManager } from './DataManager'
export class BaseManager extends EventEmitter {
  protected static defaultOptions: Required<managerOptions> = {
    loadingUpdateInterval: 1000,
    noColors: false,
    renderMode: 'progressively',
    noLoadingFeedback: false
  }
  JSON_LOADED = 'json-loaded'
  constructor(protected options: Required<managerOptions> = DataManager.defaultOptions) {
    super()
  }
  protected dirty = false
  protected LOADING_MSG: string = 'Loading...'
  protected lastPath: string[] = null as any
  protected data: TNode = {
    name: 'Root',
    label: 'Root',
    node: {},
    expanded: true,
    children: [
      ...(this.options.noLoadingFeedback
        ? []
        : [
            {
              name: this.LOADING_MSG,
              expanded: false,
              children: []
            }
          ])
    ]
  }

  protected _jsonLoaded: any | undefined
  set loaded(value: any) {
    if (value) {
      this.emit(this.JSON_LOADED, value)
      this._jsonLoaded = value
    }
  }
  log(...args: any[]) {
    debug(...args)
  }
}
