import { Br, Div } from '../../../src/blessed/jsx-components/jsxUtil'
import { Component } from '../../../src/blessed/jsx/component'
import { React } from '../../../src/blessed/jsx/createElement'
import { color, number } from './util'

export class LayoutDemo extends Component {
  render() {
    return (
      <Div>
        TIP: Press [2] to re render this example and see how sizes that are random affect the layouts.
        <Br />
        This demo shows how to use three built in blessed layout implementations. The first two are 'inline' and
        'inline-block that are quite similar: <Br />
        <layout width={number(15, 20)} height={number(6, 13)} border="line" layout="inline">
          Just some text with a bigger box
          <box
            height={3}
            width={3}
            border="line"
            style={{ fg: 'blue', bold: true, border: { fg: 'magenta' } }}
            content="B"
          />
          in the middle, should be displayed like CSS display: inline
        </layout>
        <layout width={number(15, 20)} height={number(6, 13)} border="line" layout="inline-block">
          Just some text with a bigger box
          <box
            height={3}
            width={3}
            border="line"
            style={{ fg: 'blue', bold: true, border: { fg: 'magenta' } }}
            content="B"
          />
          in the middle, should be displayed like CSS display: inline-block
        </layout>
        <Br />
        Finally the 'grid' layout that will create an automatic grid based on element dimensions. The grid cells' width
        and height are always determined by the largest children in the layout. <Br />
        <layout width={number(40, 60)} height={number(15, 20)} border="line" layout="grid">
          {new Array(10).fill(0).map((e, i) => (
            <box
              width={number(5, 10)}
              height={number(4, 7)}
              style={{ bg: color() }}
              border="line"
              content={i + 1 + 12 + ''}
            />
          ))}
        </layout>
      </Div>
    )
  }
}
