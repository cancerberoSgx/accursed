import * as blessed from 'blessed'
import { installExitKeys } from '../../src/blessed/util'
import { React } from '../../src/jsx/createElement'

const screen = blessed.screen({ smartCSR: true })
installExitKeys(screen)
React.render(
  <box parent={screen} top="0%" content="box content">
    <button top={2} content="hello click me please" />
  </box>
)
screen.render()
