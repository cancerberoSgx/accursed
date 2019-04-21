import { createScreen, installExitKeys, tree as createTree, visitTreeNodes, onTreeNodeFocus, showInModal, Screen, debug } from 'accursed';
import * as contrib from 'blessed-contrib';
import { arrayToObject, objectKeys, setObjectProperty } from 'misc-utils-of-mine-generic';
import { isJSONObject } from './util';
import { inspect } from 'util';
import { performance } from 'perf_hooks';
import { FailReason } from 'oboe';
const { format } = require('ansi-escape-sequences')

interface TNode extends contrib.Widgets.TreeElementNode {
  children: TChildren
}
type TChildren = { [name: string]: TNode }
interface Options {
  noColors?: boolean
  renderMode?: 'waitForJsonLoad'|'progressively'
  loadingUpdateInterval?: number
  noLoadingFeedback?: boolean
}
export class Tree {
  
  protected tree: contrib.Widgets.TreeElement<TNode> = null as any
  protected _loaded = false
  
  protected dirty = false
  protected LOADING_MSG: string = 'Loading...'
  protected lastPath: string[] = null as any

  protected static defaultOptions : Required<Options>= {
    loadingUpdateInterval: 1000,
    noColors: false,
    renderMode: 'progressively',
    noLoadingFeedback: false
  }

  constructor(protected options: Required<Options> = Tree.defaultOptions) {
  }

  protected data: TNode = {
    name: 'Root',
    extended: true,
    children: {
      ...this.options.noLoadingFeedback ? {} : {[this.LOADING_MSG]: {
        name: this.LOADING_MSG,
        extended: false,
        children: {}
      }}
    }
  }

  protected formatNodeValue(name: string, value: any): string {
    let f: string[] = []
    const t = typeof value
    let v = ''
    if (t === 'number' || t === 'boolean') {
      f = ['blue']
      v = value + ''
    }
    else if (t === 'string') {
      f = ['red']
      v = value + ''
    }
    else if (t === null) {
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

  log(...args: any[]) {
    // this.tree && this.tree.screen.log(...args)
    debug(...args)
  }

  handle(value: any, path: string[], partials: any[]): any {
    const node = this.buildTNodeWithVisualFeedback(path, value);
    setObjectProperty(this.data.children, path, {...node.children})
    // debug('handle', path)
    this.dirty = true
  }

  protected buildTNode(value: any, name: string): TNode {
    if ((isJSONObject(value) || Array.isArray(value))) {
      return {
        name: `${this.formatNodeLabel(name, value)}: ${this.formatNodeValue(name, value)}`,
        extended: false,
        children: arrayToObject(objectKeys(value), childName => this.buildTNode((value as any)[childName], childName))
      }
    }
    else {
      return {
        name: `${this.formatNodeLabel(name, value)}: ${this.formatNodeValue(name, value)}`,
        extended: false,
        children: {}
      }
    }
  }

  protected buildTNodeWithVisualFeedback(path: string[], value: any) {
    const valueFinished = this.loaded && (this.lastPath ? path.length < this.lastPath.length : false)
    this.lastPath = path;
    const name = path[path.length - 1];
    const node = this.buildTNode(value, name);
    if (!valueFinished) {
      node.children = { ...(this.loaded||this.options.noLoadingFeedback) ? {} : { [this.LOADING_MSG]: {
        name: this.LOADING_MSG, 
        children: {}, 
        extended: false 
      } }, ...node.children }
    }
    return node
  }
  get screen() {
    return this.tree && this.tree.screen
  }

  render() {
    const screen = createScreen({ 
      useBCE: true, 
      smartCSR: true, 
      log: 'log.txt' ,
      // lockKeys: true,
      title: 'json-cat',
    }) as any

    //@ts-ignore
    installExitKeys(screen)

    this.tree = createTree({
      parent: screen,
      width: "100%",
      // border: 'line',
      height: "100%",
      mouse: true,
      clickable: true,
      // scrollable: true,
      // bg: 'green',
      // // draggable: true,
      // style: {
      //   scrollbar: {
      //     ch: ' ',
      //     track: {
      //       bg: 'cyan'
      //     },
      //     style: {
      //       inverse: true
      //     }
      //   }
      // }
    })

    this.tree.on('click', (data: any) => {
      console.log(data)
    })
    onTreeNodeFocus(this.tree, node=>{

    })
    this.tree.on('select', function (node: any) {
      screen.render()
    })

    if(this.options.renderMode==='progressively'){
      this.buildTreeProgressively(screen);
    }

    screen.append(this.tree)
    this.tree.focus()
    screen.render()
  }

  failed(err: FailReason): any {
    this.log('An error occurred processing JSON input: ' + err)
    // showInModal(this.screen as any, 'An error occurred processing JSON input: ' + err)
  }

  set loaded(l: boolean){
    if(l && !this._loaded && this.options.renderMode === 'waitForJsonLoad'){
      this.buildTreeNonProgressively()
    }
    this._loaded = l
  }

  protected buildTreeNonProgressively(): any {
    try {
    if (!this.dirty) {
      return;
    }
    if(!this.options.noLoadingFeedback){
      visitTreeNodes(this.data, node => {
        node && delete (node as any)[this.LOADING_MSG];
        node && (node as any).children && delete (node as any).children[this.LOADING_MSG];
      });
    }
    // this.log('buildTreeNonProgressively',this.data);
    // let t0 = performance.now();
    this.tree.setData({ ...this.data });
    // this.log('setData', performance.now() - t0);
    // t0 = performance.now();
    this.tree.screen.render(); //TODO: check if its dirty
    // this.log('render', performance.now() - t0);
    this.dirty=false
  }catch (error) {
      this.log('error', error, 'DATA', this.data );
    }
  }

  protected updateTimer: NodeJS.Timeout = null as any

  protected buildTreeProgressively(screen: Screen) {
    this.updateTimer = setInterval(() => {
      try {
        if (!this.dirty&& !this.loaded) {
          return;
        }
        if (this.loaded) {
          if( !this.options.noLoadingFeedback){
          }
          visitTreeNodes(this.data, node => {
            node && delete (node as any)[this.LOADING_MSG];
            node && (node as any).children && delete (node as any).children[this.LOADING_MSG];
          });            
          clearInterval(this.updateTimer);
        }
        // screen.lockKeys = false;
        // this.log('hshshshs');
        // let t0 = performance.now();
        this.tree.setData({ ...this.data });
        // this.log('setData', performance.now() - t0);
        // t0 = performance.now();
        this.tree.screen.render(); //TODO: check if its dirty
        // this.log('render', performance.now() - t0);
        this.dirty=false
      }
      catch (error) {
        this.log('error', error);
      }
    }, this.options.loadingUpdateInterval);
  }
}

