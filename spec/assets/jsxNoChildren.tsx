import * as blessed from 'blessed'
import { installExitKeys } from '../../src/blessed/blessed'
import { React } from '../../src/blessed/jsx/createElement'

const screen = blessed.screen({ smartCSR: true })
installExitKeys(screen)
React.render(<box parent={screen} top="0%" content="hehehehehe" />)
screen.render()
