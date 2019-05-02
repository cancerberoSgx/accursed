import { arrayToObject, enumNoValueKeys } from 'misc-utils-of-mine-generic'
import { showInModal } from '../../../src/blessed/modal'
import { Screen } from '../../../src/blessedTypes'
import { Br, Div, Strong } from '../../../src/jsx-components/jsxUtil'
import { Component } from '../../../src/jsx/component'
import { React } from '../../../src/jsx/createElement'
import { enumValueFromString } from '../../../src/util/misc'
import { anim2 } from '../experiments/anim2'
import { animDemo } from '../experiments/animDemo'
import { borderBoxDemo } from '../experiments/borderBoxDemo'
import { allColors } from '../experiments/colors/allColors'
import { color4 } from '../experiments/colors/colors4'
import { colors5Demo } from '../experiments/colors/colors5'
import { ButtonDemo } from './ButtonDemo'
import { CollapsibleDemo } from './CollapsibleDemo'
import { ColumnsAndRowsDemo } from './columnsAndRowsDemo'
import { LayoutDemo } from './LayoutDemo'
import { screen } from './main'
// import { RobotDemo } from './RobotDemo'
import { commonOptions } from './util'

enum Demo {
  button,
  layout,
  collapsible,
  // robot,
  colorPalette,
  colors5,
  allColors,
  anim,
  anim2,
  borderBox,
  columnsAndRows
}
interface P {
  screen: Screen
}
interface S {
  selectedDemo?: Demo
}
export class App extends Component<P, S> {
  private renderDemo(d: string) {
    try {
      const demo = enumValueFromString(d, Demo)
      if (typeof demo === 'undefined') {
        throw new Error('Demo not found ' + d)
      }
      if (demo === Demo.button) {
        return React.render(<ButtonDemo />)
      } else if (demo === Demo.layout) {
        return React.render(<LayoutDemo />)
      } else if (demo === Demo.colorPalette) {
        color4(this.blessedElement.screen)
        this.blessedElement.screen.render()
      } else if (demo === Demo.colors5) {
        colors5Demo(this.blessedElement.screen)
      } else if (demo === Demo.allColors) {
        allColors(this.blessedElement.screen)
      } else if (demo === Demo.borderBox) {
        return React.render(borderBoxDemo())
      } else if (demo === Demo.anim2) {
        anim2(this.blessedElement.screen)
      } else if (demo === Demo.anim) {
        animDemo(this.blessedElement.screen)
      } else if (demo === Demo.collapsible) {
        return React.render(<CollapsibleDemo />)
      } else if (demo === Demo.columnsAndRows) {
        return React.render(<ColumnsAndRowsDemo />)
      }
      // else if (demo === Demo.robot) {
      //   // return React.render(<RobotDemo screen={this.props.screen} />)
      // }
      else {
        throw new Error('Demo unknown ' + d)
      }
    } catch (error) {
      screen.log('Error in demo ', error)
    }
    throw new Error('Demo unknown ' + d)
  }
  render() {
    const { screen } = this.props
    return (
      <Div parent={screen} width="95%" height="100%" border="line" label="Blessed Gallery">
        <Br />
        <Strong>Chose a Demo:</Strong>
        <Br />
        <listbar
          {...commonOptions()}
          padding={1}
          top={3}
          align="center"
          keys={true}
          mouse={true}
          clickable={true}
          focusable={true}
          focused={true}
          border="line"
          width="95%"
          autoCommandKeys={true}
          commands={arrayToObject(enumNoValueKeys(Demo), d => () => {
            const demo = this.renderDemo(d)
            if (demo) {
              showInModal(screen, demo, `${d} demo (press q to close)`, '100%', '100%')
            }
          })}
        />
      </Div>
    )
  }
}
