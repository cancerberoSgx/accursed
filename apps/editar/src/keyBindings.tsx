import { screen, Screen, closeModal, showInModal, React } from 'accursed';
import { Component, Props } from './util/component';
import { GoToLineForm } from './editor/goToLineForm';
import { ActionManager } from './store/actionManager';
import { EDITOR_ACTION } from './editor/editorActions';
import { debugInApp } from './util/util';

interface Options {
  // props: Props
  screen: Screen
  // gotoLine: string[]
  // search: string[]
  // /** control-p - locate files by name */
  // quickOpen: string[]
}

const bindings = {
  gotoLine: ['C-g'],
  search: ['C-f'],
  save: ['C-s'],
  quickOpen: ['C-p']
}
export function installKeyBindings(options: Options){
  // options.screen.key(options.gotoLine, e=>gotoLine(options))
  options.screen.key(bindings.gotoLine, e=>{
    // debugInApp('installKeyBindings gotoLine handler')
    ActionManager.get().dispatch({
    type: EDITOR_ACTION.GOTO_LINE_OPEN
  })
})

}
