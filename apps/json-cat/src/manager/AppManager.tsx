import {
  createScreen,
  filterDescendants,
  installExitKeys,
  installFocusHandler,
  isElement,
  React,
  visitTreeNodes
} from 'accursed'
import { App } from '../app/app'
import { TNode } from '../types'
import { BaseManager } from './BaseManager'

export class AppManager extends BaseManager {
  protected updateTimer: NodeJS.Timeout = null as any
  protected _app: App = null as any

  TREE_UPDATE_FINISH = 'TREE_UPDATE_FINISH'
  TREE_UPDATED = 'TREE_UPDATED'
  APP_RENDERED = 'APP_RENDERED'
  
  constructor() {
    super()
    this.on(this.JSON_LOADED, () => {
      if (this._jsonLoaded && this.options.renderMode === 'waitForJsonLoad') {
        this.buildTreeNonProgressively()
      }
    })
  }

  protected setTreeData(data: TNode = this.data, andUpdate = true) {
    // this.log('setTreeData', data)
    this._app.tree.setNodes( data.children)
    // andUpdate && 
    this._app.tree.screen.render() //TODO: check if its dirty
  }

  /** cerates screen, and render app inside, waits till its ready before pushing data from json scream to tree componnet */
  async render() {
    const screen = createScreen({
      // useBCE: true,
      smartCSR: true,
      
      focusable: true,
      sendFocus: true,
      log: 'log.txt',
      title: 'json-cat'
    })
    installExitKeys(screen)

    screen.key('tab', k => screen.focusNext())
    screen.key('S-tab', k => screen.focusPrevious())

    this._app = new App(
      {
        manager: this, 
        ready: () => {
          screen.focusNext()
          try {
            // this._app.tree.focus()
            if (this.options.renderMode === 'progressively') {
              this.buildTreeProgressively()
              this._app.tree.screen.render()
            }
            screen.render()
            this.emit(this.APP_RENDERED)
            // installFocusHandler(
            //   'test1',
            //   filterDescendants(this._app.root.current!, d => isElement(d) && !!d.options.focusable),
            //   screen,
            //   undefined,
            //   false,
            //   false
            // )
          } catch (error) {
            this.log(error)
            throw error
          }
        }
      },
      {}
    )
    const appEl = this._app.render()
    screen.append(React.render(appEl))
    screen.render()
  }

  protected buildTreeProgressively() {
    this.updateTimer = setInterval(() => {
      try {
        if (!this.dirty && !this.loaded) {
          // id its' not dirty but is loaded it could be that last time we need to uninstall the time
          return
        }
        if (this.loaded) {
          if (!this.options.noLoadingFeedback) {
            delete (this.data as any)[this.LOADING_MSG]
            delete (this.data.children as any)[this.LOADING_MSG]
            this._app.tree.visitNodes(node => {
              node && delete (node as any)[this.LOADING_MSG]
              node && (node as any).children && delete (node as any).children[this.LOADING_MSG]
              return false
            })
          }
            
          // visitTreeNodes(this.data, node => {
          //   node && delete (node as any)[this.LOADING_MSG]
          //   node && (node as any).children && delete (node as any).children[this.LOADING_MSG]
          // })
          clearInterval(this.updateTimer)
          this.emit(this.TREE_UPDATE_FINISH)
        }
        if (this.dirty) {
          this.setTreeData({ ...this.data })
          this.dirty = false
          this.emit(this.TREE_UPDATED)
        }
      } catch (error) {
        this.log('error', error)
      }
    }, this.options.loadingUpdateInterval)
  }

  protected buildTreeNonProgressively(): any {
    try {
      // if (!this.dirty) {
      //   return
      // }
      // if (!this.options.noLoadingFeedback) {
      //   this._app.tree.visitNodes( node => {
      //     node && delete (node as any)[this.LOADING_MSG]
      //     node && (node as any).children && delete (node as any).children[this.LOADING_MSG]
      //     return false
      //   })
      // }
      this.setTreeData({ ...this.data })
      this.dirty = false
    } catch (error) {
      this.log('error', error, 'DATA', this.data)
    }
  }
}
