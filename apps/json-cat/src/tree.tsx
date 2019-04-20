import { createScreen, installExitKeys, tree as createTree, visitTreeNodes } from 'accursed';
import * as contrib from 'blessed-contrib';
import { arrayToObject, objectKeys, setObjectProperty } from 'misc-utils-of-mine-generic';
import { isJSONObject } from './util';

interface TNode extends contrib.Widgets.TreeElementNode{
  children: TChildren
}
type TChildren = { [name: string]: TNode }

export class Tree {
  private tree: contrib.Widgets.TreeElement<TNode> = null as any
  private loaded = false
  private updateTimer: NodeJS.Timeout = null as any
  private dirty = false
  private LOADING_MSG: string = 'Loading...'
  private lastPath: string[] = null as any

  constructor() {
  }

  private data: TNode  = {
    name: 'Root',
    extended: true, 
    children: {
      [this.LOADING_MSG]: {
        name: this.LOADING_MSG, extended: false, children: {}
      }
    }
  }

  protected buildTNode(value: any, name: string): TNode {
    if ((isJSONObject(value) || Array.isArray(value))) {
      return {
        name: `${name} (${Array.isArray(value) ? 'Array' : 'Object'})`,
        extended: true,
        children: arrayToObject(objectKeys(value), childName => this.buildTNode((value as any)[childName], childName))
      }
    }
    else {
      return {
        name: `${name} (${typeof value})`,
        extended: false,
        children: {}
      }
    }
  }

  log(...args: any[]){
    this.tree && this.tree.screen.log(...args)
  }

  handle(value: any, path: string[], partials: any[]): any {
    this.dirty=true
    const node = this.buildTNodeWithVisualFeedback(path, value);
    setObjectProperty(this.data.children, path, node)
    this.log('handle',{ path, node, data: this.data});
  }

  protected buildTNodeWithVisualFeedback(path: string[], value: any) {
    const valueFinished =this.loaded && ( this.lastPath ? path.length < this.lastPath.length : false)
    this.lastPath = path;
    const name = path[path.length - 1];
    const node = this.buildTNode(value, name);
    if (!valueFinished) {
      node.children = { ...(this.loaded ? {} : {[this.LOADING_MSG]: { name: this.LOADING_MSG, children: {}, extended: false }}), ...node.children };
    }
    return node
  }

  render() {
    const screen = createScreen({ smartCSR: true, log: 'log.txt' })
    this.tree = createTree({
      parent: screen,
      fg: 'green',
      mouse: true,
      clickable: true,
      scrollable: true,
      draggable: true,
      scrollbar: {
        ch: ' ',
        track: {
          bg: 'cyan'
        },
        style: {
          inverse: true
        }
      }
    })

    //@ts-ignore
    installExitKeys(screen)
    this.tree.on('click', (data: any) => {
      console.log(data)
    })
    this.tree.on('select', function (node: any) {
      screen.render()
    })
    this.updateTimer = setInterval(() => {
      if(!this.dirty){
        return
      }
      if (this.loaded) {
        visitTreeNodes(this.data, node=>{
          node &&  delete (node as any)[this.LOADING_MSG];
          node && (node as any).children &&  delete (node as any).children[this.LOADING_MSG]
        })        
        clearInterval(this.updateTimer)
      } 
      this.tree.setData({ ...this.data })
      this.tree.screen.render() //TODO: check if its dirty
    }, 200)

    screen.append(this.tree)
    this.tree.focus()
    screen.render()
  }
}

