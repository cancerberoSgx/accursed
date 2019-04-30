debugger
console.log('1111')
import { createScreen, debug, React, Screen } from 'accursed'
console.log('1111')


import { createStore, Store } from 'redux'
console.log('1111')
import { App } from './app'
console.log('1111')
import { Context } from './context/context'
import { FSImpl } from './context/impl/fsImpl'
import { ActionManager } from './store/actionManager'
import { reducer } from './store/store'

function main() {
  // (async ()=>{
  let screen: Screen
  try {
    debugger
    const store = createStore(reducer)
    ActionManager._create(store)
    screen = buildScreen(store)
    screen.render()
    // screen=  await buildScreen(store);
  } catch (error) {
    debug(error)
    screen.destroy()
    console.error(error)
    process.exit(1)
  }
}

// })()

function buildScreen(store: Store) {
  const screen = createScreen({
    useBCE: true,
    warnings: true,
    log: 'log.txt',
    smartCSR: true
    // sendFocus: true
  })
  installGlobalKeyHandlers(screen)
  screen.render()

  const context: Context = { fs: new FSImpl() }
  const AppConstructor = () => (
    <App
      store={store}
      //  dispatch={ (a: AllActions)=>ActionManager.get().dispatch(a)}
      context={context}
    />
  )
  screen.append(React.render(AppConstructor()))
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

main()
