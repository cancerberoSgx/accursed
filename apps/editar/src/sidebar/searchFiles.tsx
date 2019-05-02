import { Br, Div, React, Tab, TabBody, TabLabel, TabPanel, Maximize, Collapsible, ref, Textbox } from 'accursed'
import { Component } from '../util/component'
import { labels } from '../util/labels'
import { focusableOpts, tabPanelOpts, tabLabelOpts, focusableBorderedOpts } from '../util/style'
import { PREFIX } from '../util/util'
import { FileExplorer } from './fileExplorer'

export class SearchFiles extends Component {
  searchInput: Textbox

  tabPanel: TabPanel;

  constructor(p, s) {
    super(p, s)
  }

  render() {
    return (
      <Div >
              <textbox label="Containing text" {...focusableBorderedOpts()} width="100%"  ref={ref<Textbox>(c=>this.searchInput = c)}/>
              <Br />
              <textbox label="Files to include" {...focusableBorderedOpts()} width="100%"  />
              <Br />
              <checkbox  {...focusableBorderedOpts()} checked={this.s.search.caseSensitive} content="Case sensitive" />
      </Div>
    )
  }

  focusSearchInput(): any {
    // setTimeout(() => {
      this.searchInput.focus()
      this.searchInput.input(()=>{})
    // }, 400);
  }
}
