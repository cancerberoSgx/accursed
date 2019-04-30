import { Div, React, Tab, TabBody, TabLabel, TabPanel } from 'accursed'
import { Component } from './component'
import { Editor } from './editor'
import { focusableOpts } from './style'
import { PREFIX } from './util'

// interface EditorsProps{
//   store: Store
// }

export class Editors extends Component {
  render() {
    return (
      <Div>
        <TabPanel>
          {this.s.documents.map(d => (
            <Tab _data={{ [PREFIX('path')]: d.path }}>
              <TabLabel {...focusableOpts()}>{d.name}</TabLabel>
              <TabBody>
                <Editor {...this.props} document={d} />
              </TabBody>
              {}
            </Tab>
          ))}
          {}
        </TabPanel>
      </Div>
    )
  }
}
