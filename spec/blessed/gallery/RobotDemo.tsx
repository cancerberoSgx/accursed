import { colors, Screen } from '../../../src/blessed/blessedTypes'
import { Button } from '../../../src/blessed/jsx-components/Button'
import { Br, Div } from '../../../src/blessed/jsx-components/jsxUtil'
import { Component } from '../../../src/blessed/jsx/component'
import { React } from '../../../src/blessed/jsx/createElement'

export class RobotDemo extends Component<{ screen: Screen }> {
  render() {
    return (
      <Div>
        {/* <layout> */}
        <layout
          {...{
            top: 0,
            left: 0,
            width: '40%',
            height: '100%',
            label: 'Robot Performances',
            style: { fg: colors.brightcyan, bg: colors.lightgreen }
          }}>
          <Br />
          CHOSE a PERFORMANCE please
          <Br />
          {/* <button
          content="demo"
          clickable={true}
          mouse={true}
          border="line"
          padding={1}
          align="center"
          width="50%"
          height={4}
          top={11}
          valign="middle"
          style={{ border: { fg: 'cyan' }, hover: { bg: 'green' }, bg: 'magenta' }}
          onClick={e => {
            e.currentTarget.setText(e.currentTarget.getText() + number())
            this.props.screen.render()
          }}
        /> */}
          <Button top={13} left={1} onClick={e => this.moveMouseChangePointer()}>
            move mouse, change pointer
          </Button>
          >
        </layout>
        <layout
          {...{
            top: 0,
            left: '40%',
            width: '55%',
            height: '100%',
            label: 'here!',
            style: { fg: colors.brightblack, bg: colors.lightblue }
          }}>
          Playing with Low level API to automate the terminal, will I be able to do it?, me ? , being so so high level
          JSX / React / Web light developer ? Ho no the PC has broken, call the IT guy!!
          <Br />
          {}
          <Br />
        </layout>
        The end.
      </Div>
    )
  }

  protected async moveMouseChangePointer() {
    // screen.program
    // const screen = this.blessedElement.screen!
    // // const program = screen.program
    // screen.draw(2, 18)
    // screen.render()
    // screen.destroy()
    // const program = blessed.program()
    // // screen.cursorReset()
    // // // program.setAttrInRectangle()
    // // const t = 300
    // // program.cursorPos(10,10)
    // // await wait(3)
    // // program.key('q', (ch, key)=> {
    // //   program.clear();
    // //   program.disableMouse();
    // //   program.showCursor();
    // //   program.normalBuffer();
    // //   process.exit(0);
    // // });
    // program.on('mouse', function(data) {
    //   if (data.action === 'mousemove') {
    //     program.move(data.x, data.y);
    //     program.bg('red');
    //     program.write('x');
    //     program.bg('!red');
    //   }
    // });
    // program.alternateBuffer();
    // program.enableMouse();
    // program.hideCursor();
    // program.clear();
    // program.move(1, 1);
    // program.bg('black');
    // program.write('Hello world', 'blue fg');
    // program.setx((program.cols / 2 | 0) - 4);
    // program.down(5);
    // program.write('Hi again!');
    // program.bg('!black');
    // program.feed();
    // screen.enableMouse()
    // program.mou
    // program.move(20,20)
    // program.setBackground('red', )
    // program.showCursor();
    // screen.program.setMouse({ sendFocus: true }, true);
    //   setInterval(()=>{
    //   program.cursorPos(number(4, 20),number(4, 20))
    //     // ram.cursorShape, cursormcolor
    //     program.cursorColor(color())
    //     program.write(number(2, 120)+'')
    //   }, 1000)
  }
  // perform(p: performs): any {
  //   if(p===performs['move mouse, change pointer']){

  //   }
  // }
}

enum performs {
  'move mouse, change pointer'
}
