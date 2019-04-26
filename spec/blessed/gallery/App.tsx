import { debug } from '../../../src'
import { showInModal } from '../../../src/blessed/modal'
import { Screen } from '../../../src/blessedTypes'
import { Br, Div, Strong } from '../../../src/jsx-components/jsxUtil'
import { Component } from '../../../src/jsx/component'
import { React } from '../../../src/jsx/createElement'
import { arrayToObject, enumNoValueKeys, enumValueFromString } from '../../../src/util/misc'
import { color4 } from '../experiments/colors/colors4'
import { ButtonDemo } from './ButtonDemo'
import { CollapsibleDemo } from './CollapsibleDemo'
import { LayoutDemo } from './LayoutDemo'
import { screen } from './main'
// import { RobotDemo } from './RobotDemo'
import { commonOptions } from './util'
import { colors5Main } from '../experiments/colors/colors5Main';
import { colors5Demo } from '../experiments/colors/colors5';
import { allColors } from '../experiments/colors/allColors';

enum Demo {
  button,
  layout,
  collapsible,
  robot,
  colorPalette,
  colors5,
  allColors
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
        return React.render(<ButtonDemo screen={this.props.screen} />)
      } else if (demo === Demo.layout) {
        return React.render(<LayoutDemo />)
      } else if (demo === Demo.colorPalette) {
        // try {
          // this.blessedElement.screen.free()
          color4(this.blessedElement.screen)
          this.blessedElement.screen.render()
        // } catch (error) {
        //   debug(error)
        // }
      } 
      else if (demo === Demo.colors5) {
        // try {
          colors5Demo(this.blessedElement.screen)
          // this.blessedElement.screen.render()
        // } catch (error) {
        //   debug(error)
        // }
      }  else if (demo === Demo.allColors) {
        // try {
          allColors(this.blessedElement.screen)
          // this.blessedElement.screen.render()
        // } catch (error) {
        //   debug(error)
        // }
      } 
      else if (demo === Demo.collapsible) {
        return React.render(<CollapsibleDemo />)
      } else if (demo === Demo.robot) {
        // return React.render(<RobotDemo screen={this.props.screen} />)
      } else {
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
