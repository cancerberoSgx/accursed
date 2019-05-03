import { createScreen, installFocusAndExitKeysForEditorWidget, React, Screen } from 'accursed'
import { enumKeys } from 'misc-utils-of-mine-typescript'
import { App } from './app'
import { FIGLET_FONTS } from './figletFonts'
import { fontSelected, fontShow, textChange } from './store/fontsAction'
import { onFontChangeMetadataExtractor, onFontSelectRenderer, onTextChangeRenderer } from './store/sagas'
import { State } from './store/state'
import { Store } from './store/storeImpl'
import { appLogger } from './toolPanel/debugTool'

export function main() {
  let screen: Screen
  try {
    const initialState: State = {
      fonts: {
        text: 'Hello World',
        selected: enumKeys(FIGLET_FONTS)[0]
      }
    }
    const store = new Store(initialState)
    const allSagas = [onFontSelectRenderer, onTextChangeRenderer, onFontChangeMetadataExtractor]
    allSagas.forEach(s => {
      store.addActionListener(s.type, s.listener)
    })
    const allReducers = [fontSelected, textChange, fontShow]

    allReducers.forEach(s => {
      store.addStateReducer(s.type, s.reduce)
    })

    const screen = createScreen({
      useBCE: true,
      smartCSR: true,
      dockBorders: true
    })
    installFocusAndExitKeysForEditorWidget(screen)
    screen.append(React.render(<App store={store} />))
    screen.render()
  } catch (error) {
    appLogger(error)
    screen.destroy()
    process.exit(1)
  }
}
