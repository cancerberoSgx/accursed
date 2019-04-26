import * as blessed from 'blessed'
import { Box, installExitKeys, Div, React, Screen, prompt } from '../../../../dist/src'
import { words } from '../../../../src/util/data'
import { number } from '../../gallery/util'


function ccolorMix(screen: Screen){
  const app = <Div parent={screen}>
    <box width="10%" height="10%" bg="#ff0000"></box>
  </Div>

React.render(app)
screen.render()
}



var screen = blessed.screen({})
installExitKeys(screen)

ccolorMix(screen)