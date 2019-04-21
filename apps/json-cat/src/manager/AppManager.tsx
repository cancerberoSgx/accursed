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
  protected setTreeData(data: TNode = this.data, andUpdata = true) {
    this._app.tree.setData({ ...data })
    andUpdata && this._app.tree.screen.render() //TODO: check if its dirty
  }
  _app: App = null as any
  /** cerates screen, and render app inside, waits till its ready before pushing data from json scream to tree componnet */
  async render() {
    const screen = createScreen({
      useBCE: true,
      smartCSR: true,
      focusable: true,
      sendFocus: true,
      log: 'log.txt',
      title: 'json-cat'
    })
    installExitKeys(screen)

    installExitKeys(screen)

    this._app = new App(
      {
        ready: () => {
          screen.focusNext()
          try {
            this._app.tree.focus()
            if (this.options.renderMode === 'progressively') {
              this.buildTreeProgressively()
              this._app.tree.screen.render()
            }

            // screen.key('tab', k => screen.focusNext())
            // screen.key('S-tab', k => screen.focusPrevious())
            // screen.render()
            screen.render()
            // this._app.tree

            // installFocusHandler('test1',screen.children.filter(isElement).map(el=>filterDescendants(el, d=>isElement(d) && d.type==="button" ||d.type==="textbox")).flat().filter(isElement), screen, undefined, false, true)
            this.emit(this.APP_RENDERED)

            installFocusHandler(
              'test1',
              filterDescendants(this._app.root.current!, d => isElement(d) && !!d.options.focusable),
              screen,
              undefined,
              false,
              true
            )
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
  protected updateTimer: NodeJS.Timeout = null as any
  protected buildTreeProgressively() {
    this.updateTimer = setInterval(() => {
      try {
        if (!this.dirty && !this.loaded) {
          // id its' not dirty but is loaded it could be that last time we need to uninstall the time
          return
        }
        if (this.loaded) {
          if (!this.options.noLoadingFeedback) {
          }
          visitTreeNodes(this.data, node => {
            node && delete (node as any)[this.LOADING_MSG]
            node && (node as any).children && delete (node as any).children[this.LOADING_MSG]
          })
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
      if (!this.dirty) {
        return
      }
      if (!this.options.noLoadingFeedback) {
        visitTreeNodes(this.data, node => {
          node && delete (node as any)[this.LOADING_MSG]
          node && (node as any).children && delete (node as any).children[this.LOADING_MSG]
        })
      }
      // this.log('buildTreeNonProgressively',this.data);
      // let t0 = performance.now();
      this.setTreeData({ ...this.data })
      // this.app.tree.setData({ ...this.data })
      // this.log('setData', performance.now() - t0);
      // t0 = performance.now();
      // this.app.tree.screen.render() //TODO: check if its dirty
      // this.log('render', performance.now() - t0);
      this.dirty = false
    } catch (error) {
      this.log('error', error, 'DATA', this.data)
    }
  }
}
