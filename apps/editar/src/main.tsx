import { createScreen, debug, React, Screen } from 'accursed'
import { createStore } from 'redux'
import { App } from './app'
import { getContext } from './context/contextFactory'
import { ActionManager } from './store/actionManager'
import { reducer } from './store/generalReducer'
import { Store } from './store/store'

export function main() {
  let screen: Screen
  try {
    const store = createStore(reducer) as Store
    ActionManager._create(store)
    screen = buildScreen(store)
    screen.render()
  } catch (error) {
    debug(error)
    screen.destroy()
    process.exit(1)
  }
}

function buildScreen(store: Store) {
  const screen = createScreen({
    useBCE: true,
    // warnings: true,
    // log: 'log.txt',
    smartCSR: true
    // sendFocus: true
  })
  installGlobalKeyHandlers(screen)
  screen.render()

  const AppConstructor = () => <App store={store} context={getContext()} />
  screen.append(React.render(AppConstructor()))
  return screen
}

function installGlobalKeyHandlers(screen: Screen) {
  screen.key('C-q', k => {
    screen.destroy()
    process.exit(0)
  })
  screen.key('C-right', k => {
    screen.focusNext()
  })
  screen.key('C-left', k => {
    screen.focusPrevious()
  })
}
