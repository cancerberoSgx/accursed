import { createScreen, debug, React, Screen, installFocusAndExitKeysForEditorWidget} from 'accursed'
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
    smartCSR: true,
    dockBorders: true
  })
  installFocusAndExitKeysForEditorWidget(screen)
  screen.render()

  const AppConstructor = () => <App store={store} context={getContext()} />
  screen.append(React.render(AppConstructor()))
  return screen
}
