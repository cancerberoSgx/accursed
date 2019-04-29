import { createScreen, debug, installExitKeys, React, BorderStyle, borderBox, borderStyles, layout } from '../../../src'
import { borderBoxDemo } from './borderBoxDemo'
import { enumKeys } from 'misc-utils-of-mine-generic';
import { color } from '../../../src/util/data';

try {
  const screen = createScreen({ fastCSR: true, useBCE: true })
  installExitKeys(screen)
  // const el = borderBoxDemo()
  // screen.append(React.render(el))
  test2({parent: screen})
  screen.render()
} catch (error) {
  debug(error)
}


function test2(options){
  const l = layout(  {  parent: options.parent, width: '100%', height: '100%'})
  borderStyles.map(style =>{
    borderBox({
      parent: l,
      borderStyle: style as any,
      label: style,
      style: { label: { fg: color() }, border: { fg: color() } },
      width: 12, 
      height: 7,
      content: 'using border style '+style
    })
  }
    )
}