import { Br, Div, React, ref, TabPanel, Textbox } from 'accursed'
import { Component } from '../util/component'
import { focusableBorderedOpts } from '../util/style'

export class SearchFiles extends Component {
  searchInput: Textbox

  tabPanel: TabPanel

  constructor(p, s) {
    super(p, s)
  }

  render() {
    return (
      <Div>
        <textbox
          label="Containing text"
          {...focusableBorderedOpts()}
          width="100%"
          ref={ref<Textbox>(c => (this.searchInput = c))}
        />
        <Br />
        <textbox label="Files to include" {...focusableBorderedOpts()} width="100%" />
        <Br />
        <checkbox {...focusableBorderedOpts()} checked={this.s.search.caseSensitive} content="Case sensitive" />
      </Div>
    )
  }

  focusSearchInput(): any {
    // setTimeout(() => {
    this.searchInput.focus()
    this.searchInput.input(() => {})
    // }, 400);
  }
}
