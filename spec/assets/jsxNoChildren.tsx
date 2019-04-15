import * as blessed from 'blessed'
import { installExitKeys } from '../../src/blessed'
import { React } from '../../src/jsx/createElement'

const screen = blessed.screen({ smartCSR: true })
installExitKeys(screen)
React.render(<box parent={screen} top="0%" content="hehehehehe" />)
screen.render()
