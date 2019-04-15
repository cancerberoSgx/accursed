import * as blessed from 'blessed'
import { installExitKeys } from '../../src/blessed/blessed'
import { BoxOptions, Style } from '../../src/blessed/blessedTypes'
import { React } from '../../src/blessed/jsx/createElement'
import { renderer } from '../../src/blessed/layoutRenderer'

const screen = blessed.screen({ smartCSR: true })
installExitKeys(screen)

const commonOptions: BoxOptions = {
  mouse: true,
  border: 'line',
  style: {
    bg: 'gray',
    fg: 'blue',
    border: {
      fg: 'black'
    },
    focus: {
      border: {
        fg: 'red'
      }
    }
  }
}

function Comp1(props: { name: string; age: number }) {
  return (
    <layout {...commonOptions} width={40} height={1} parent={screen}>
      <text content="Welcome " />
      <text content={props.name} />
      <text content=" of " />
      <text content={props.age + ''} />
      <text content="years old" />
    </layout>
  )
}

abstract class Component<P = {}> {
  constructor(public props: P) {}
  abstract render(): void
}

class Comp2 extends Component<{ friends: string[] }> {
  render() {
    //@ts-ignore
    const style: Style = { style: { display: 'block' } }
    return (
      <layout {...commonOptions} width="100%" height="100%" parent={screen} renderer={renderer}>
        A Duplex stream is one that implements both Readable and Writable, such as a TCP socket connection. Because
        JavaScript does not have support for multiple inheritance, the stream.Duplex class is extended to implement a
        Duplex stream (as opposed to extending the stream.Readable and stream.Writable classes).
        <text {...style} content={''} />
        <text {...style} content={''} />
        <checkbox {...style} content="understand?" />
        <text {...style} content={''} />
        <text {...style} content={''} />
        The stream.Duplex class prototypically inherits from stream.Readable and parasitically from stream.Writable, but
        instanceof will work properly for both base classes due to overriding Symbol.hasInstance on stream.Writable.
        Custom Duplex streams must call the new stream.Duplex([options]) constructor and implement both the
        readable._read() and writable._write() methods.
        <text {...style} content={''} />
        <text {...style} content={''} />
        <checkbox {...style} content="really?" />
        <text {...style} content={''} />
        <text {...style} content={''} />
        {this.props.friends.map(f => (
          <text content={f}> - </text>
        ))}
        <text {...style} content={''} />
        <text {...style} content={''} />
        <text content="years old" />
        <text {...style} content={''} />
        <text {...style} content={''} />
      </layout>
    )
  }
}
try {
  React.render(
    <box width="100%" height="100%">
      <Comp2 friends={new Array(20).fill(0).map((a, i) => `Friend_${i}_"${Math.trunc(Math.random() * 100)}"`)} />

      <Comp1 name="Seba" age={18} />
    </box>
    //

    // <layout {...commonOptions} width="100%" height="100%" parent={screen}>
    //   <text content="Welcome "></text>
    //   {/* <text content={props.name}></text> */}
    //   <text content="of"></text>
    //   {/* <text content={props.age+''}></text> */}
    //   <text content="years old"></text>
    // </layout>

    // <box {...commonOptions} parent={screen} top="0%" label="Contact me">
    // {/* <text content="Welcome "></text> */}
    // </box>
  )
} catch (error) {
  console.log(error)
}

screen.render()
