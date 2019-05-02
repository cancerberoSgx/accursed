import { Screen } from 'accursed'
import { EDITOR_ACTION } from './editor/editorActions'
import { SIDEBAR_ACTION } from './sidebar/sidebarActions'
import { ActionManager } from './store/actionManager'

interface Options {
  screen: Screen
}

const bindings = {
  gotoLine: ['C-g'],
  search: ['C-f'],
  searchFiles: ['C-r'], //ansi.keys.getSequenceFor({name: 'f', control: true, shift: true}), // ['M-f'],

  save: ['C-s'],
  /** control-p - locate files by name */
  quickOpen: ['C-p']
}
export function installKeyBindings(options: Options) {
  options.screen.enableKeys()

  options.screen.key(bindings.gotoLine, e => {
    ActionManager.get().dispatch({
      type: EDITOR_ACTION.GOTO_LINE_OPEN
    })

    // })
  })

  options.screen.key(bindings.searchFiles, e => {
    ActionManager.get().dispatch({
      type: SIDEBAR_ACTION.SEARCH_FILES_OPEN
    })
  })
  // options.screen.on('keypress', (ch, key)=>{
  //   debugInApp(key)
  //   if(key.name==='f' && key.ctrl && key.shift){
  //     ActionManager.get().dispatch({
  //       type: SIDEBAR_ACTION.SEARCH_FILES_OPEN
  //       })
  //   }
  // })
}
