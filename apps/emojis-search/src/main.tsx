import { installExitKeys, React, screen   } from 'accursed'
import { App } from './app'
import { createStore } from './store/createStore';

var s = createStore();
const aScreen = s.state.screen
try {
  const app = React.render(<App store={s} />)
  // s.append(app)
  aScreen.key('tab', k => aScreen.focusNext())
  aScreen.key('S-tab', k => aScreen.focusPrevious())
  aScreen.render()
} catch (error) {
  s && aScreen.log(error)
}