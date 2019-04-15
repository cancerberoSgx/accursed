// import { colors as c } from 'blessed'
import { BoxOptions, colors, InputOptions } from '../../../src/blessed/blessedTypes'
import { installCollapsible, toggleCollapsed } from '../../../src/blessed/collapsible'
import { Br, Div, NbrSpc, Strong } from '../../../src/blessed/jsx-components/jsxUtil'
import { Component } from '../../../src/blessed/jsx/component'
import { React } from '../../../src/blessed/jsx/createElement'
import { renderer } from '../../../src/blessed/layoutRenderer'

export class CollapsibleDemo extends Component {
  render() {
    // screen.log(c)
    const common: () => BoxOptions = () => ({
      // ...commonOptions(),
      mouse: true,
      clickable: true,
      keys: true,
      keyable: true,
      focusable: true,
      style: {
        // ...commonOptions(),
        selected: {
          border: {
            fg: colors.lightgreen
          },
          bg: 'magenta'
        },
        hover: {
          bg: 'blue'
        }
      }
    })
    const buttonOptions: () => BoxOptions = () => ({
      ...common(),
      padding: 1,
      border: 'line',
      style: {
        // ...common().style,
        // border: {
        //   fg: 'cyan'
        // },
        // bg: 'yellow'
      }
    })
    const inputTextOptions: () => InputOptions = () => ({
      ...buttonOptions(),
      padding: 0,
      width: '90%',
      // border: 'line',
      // inputOnFocus: true,
      style: {
        ...common().style,
        border: {
          fg: 'cyan'
        },
        bg: colors.lightyellow
      }
    })
    const el = (
      <Div style={{ bg: 'cyan', fg: 'black' }}>
        Collapsible are a couple of functions, implemented by me (not in blessed distribution) that allow to install
        "collapse"/"expand" functionality in any blessed Element. <Br />
        Has mainly two modes,
        <Strong>Manual mode</Strong> in which user is responsible of adding some buttons to trigger the collapse/expand
        when user clicks them, and a<Strong>Automatic mode</Strong>, in which these handlers will be installed
        automatically on the element and also hiding children, updating labels, visual feedback, etc
        <Br />
        <layout
          width="100%"
          // bottom="100%"
          height="50%"
          renderer={renderer}>
          <layout width="50%" height="100%" renderer={renderer}>
            <Br />
            <Strong>Automatic mode:</Strong>
            <Br />
            <layout
              onRender={e => installCollapsible(e.currentTarget, { auto: true })}
              label="New Contact"
              renderer={renderer}
              width="100%"
              height="100%"
              border="line">
              <textbox {...inputTextOptions()} content="Tell us your name" />
              <Br />
              <checkbox {...common()} content="Female?" />
              <Br />
              <radioset label="Level" height={5} border="line">
                <radiobutton {...common()} top={0} content="Afraid of hights" />
                <radiobutton {...common()} top={1} content="Sometimes I'm fast" checked={true} />
                <radiobutton {...common()} top={2} content="Petrol in my veins" />
              </radioset>
              <Br />
              <checkbox
                {...common()}
                content="Do you Accept the licence and foo bar a lot of text here that needs to be collapsed"
              />
              <Br />
              <button {...buttonOptions()} content="Submit" />
              <NbrSpc />
              <NbrSpc />
              <NbrSpc />
              <button {...buttonOptions()} content="Go back" />
            </layout>
          </layout>

          <layout width="50%" height="90%" renderer={renderer}>
            <Br />
            <Strong>Manual mode:</Strong>
            <Br />
            <layout
              onRender={e => installCollapsible(e.currentTarget, { collapsedHeight: 4 })}
              label="Search Hero"
              renderer={renderer}
              style={{
                //@ts-ignore
                overflow: 'hidden',
                ...{ bg: 'black', fg: 'lightred' }
              }}
              width="100%"
              height="100%"
              border="line">
              <Br />
              <checkbox
                {...common()}
                style={{ ...common().style, fg: 'magenta' }}
                content="Collapsed"
                checked={false}
                onChange={e => toggleCollapsed(e.currentTarget.parent as any, true)}
              />
              <Br />
              <textbox {...inputTextOptions()} content="By Name" />
              <Br />
              <checkbox {...common()} content="Female?" />
              <Br />
              <radioset label="Comic" height={5} border="line">
                <radiobutton {...common()} top={0} content="X-Men" />
                <radiobutton {...common()} top={1} content="Caballeros del Zoodiaco" checked={true} />
                <radiobutton {...common()} top={2} content="StarCraft" />
              </radioset>
              <Br />
              <radioset label="Power Kind" height={5} border="line">
                <radiobutton {...common()} top={0} content="Psionic" />
                <radiobutton {...common()} top={1} content="Brute force" checked={true} />
                <radiobutton {...common()} top={2} content="Magic" />
              </radioset>
              <Br />
              <checkbox {...common()} content="Include Secondary Heroes" />
              <Br />
              <button {...buttonOptions()} content="Submit" />
              <NbrSpc />
              <NbrSpc />
              <NbrSpc />
              <button {...buttonOptions()} content="Go back" />
            </layout>
          </layout>
        </layout>
      </Div>
    )
    return el
  }
}
