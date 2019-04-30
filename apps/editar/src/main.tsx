import {React, Component, Columns, Column, TreeView, Rows, Row, Div, createScreen, installExitKeys, Screen, debug, findChildren, isElement, findDescendant} from 'accursed'
import {Store, createStore} from 'redux'
debug('init0')

import { reducer, AllActions, ActionManager } from './store';
debug('init1')

import { Context } from './context';
import { FSImpl } from './impl/fsImpl';

debug('init2')
import { App } from './app';

debug('init3')

function main(){

// (async ()=>{
  let screen: Screen
  try {
debug('starts')
    const store = createStore(reducer)
    ActionManager._create(store)
  debug('store created')
    screen=  buildScreen(store);
    screen.render();
    // screen=  await buildScreen(store);
    
      

} catch (error) {
  debug(error)
  screen.destroy()
  console.error(error);
  process.exit(1)

}

}

main()
  // })()


function buildScreen( store: Store) {
  const screen = createScreen({ 
    // useBCE: true,
    //  smartCSR: true,
      sendFocus: true 
    });
    installGlobalKeyHandlers(screen);
  screen.render();
  
  const context: Context = {fs: new FSImpl()}
  const AppConstructor = ()=><App store={store}
  //  dispatch={ (a: AllActions)=>ActionManager.get().dispatch(a)}
    context={context}/>
    screen.append(React.render(AppConstructor()));
  // screen.sendFocus = true
  // screen.render();

  // screen.enableKeys()
  // screen.enableMouse()
  // screen.enableInput()
  // screen.render();

  // await waitsFor(()=>screen.find)
  // setTimeout(() => {
  //   const c = findDescendant(screen, c => isElement(c) && c.options.focusable);
  //   if (isElement(c)) {
  //     debug('focusable', c.type);
  //     c.focus();
  //   }
  // }, 1000);

  return screen
}


// function findNextVisible

function installGlobalKeyHandlers(screen: Screen) {

  screen.key('C-q', k => {
    screen.destroy()
    process.exit(0)
  })

  screen.key('C-right', k => {
    // screen.history
    screen.focusNext()

  })
  screen.key('C-left', k => {
    screen.focusPrevious()
  })
}


