import { createScreen, debug, installExitKeys, React } from '../../../src'
import { borderBoxDemo } from './borderBoxDemo'

try {
  const screen = createScreen({ fastCSR: true, useBCE: true })
  installExitKeys(screen)
  const el = borderBoxDemo()
  screen.append(React.render(el))
  screen.render()
} catch (error) {
  debug(error)
}
