import {React, Component, Columns, Column, TreeView, Rows, Row, Div, createScreen, installExitKeys, Screen, debug, findChildren, isElement, findDescendant} from 'accursed'
import {Store, createStore} from 'redux'
import { App } from './app';
import { State } from './state';
import { reducer } from './store';


// (async ()=>{
  let screen: Screen
    try {

    const store = createStore(reducer)
    screen=  buildScreen(store);
    screen.render();
    // screen=  await buildScreen(store);
    

} catch (error) {
  debug(error)
  screen.destroy()
  console.error(error);
  process.exit(1)

}
  // })()


function buildScreen( store: Store) {
  const screen = createScreen({ 
    // useBCE: true,
    //  smartCSR: true,
      sendFocus: true 
    });
    installGlobalKeyHandlers(screen);
  screen.render();
  
    screen.append(React.render(<App store={store} />));
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


