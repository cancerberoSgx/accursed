import { Component, React } from 'accursed'
import { categories } from './categories'
import { countryFlagsDescriptions } from './data/countryFlags'
import { symbolsDescriptions } from './data/symbols'
import { listTableOptions } from './elementOptions'
import { charCodeHexString, getDescriptions } from './util'

export class List extends Component<{
  list: categories
}> {
  render() {
    return <listtable height="100%" width="100%" {...listTableOptions} data={this.data()} />
  }
  data() {
    const arr =
      this.props.list === 'flags'
        ? getDescriptions(countryFlagsDescriptions)
        : this.props.list === 'symbols'
        ? getDescriptions(symbolsDescriptions)
        : []
    return [
      ['Character', 'Code Points{/red-fg}', 'Description'],
      ...arr.map(d => [d[0], charCodeHexString(d[0]), d[1]])
    ]
  }
}
