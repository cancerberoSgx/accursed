import { Div, Component, Br, ListTableOptions , React} from 'accursed';
import { countryFlagsArray } from "./test/countryFlagsArray";
import { charCodeHexString, getDescriptions } from './util';
import { categories } from './categories';
import {  listTableOptions } from "./elementOptions";
import { symbolsDescriptions } from './data/symbols';
import { countryFlagsDescriptions } from './data/countryFlags';


export class List extends Component<{
  list: categories;
}> {
  render() {
    
    return     <listtable height="100%" width="100%" {...listTableOptions} data={this.data()}></listtable>
    // <Div height="100%">
    //   <listtable height="100%" {...listTableOptions} data={this.data()}></listtable>
    // </Div>;
  }
  data() {
    // this.log('this.props', this.props);
    const arr = this.props.list === 'flags' ? getDescriptions(countryFlagsDescriptions) : this.props.list === 'symbols' ? getDescriptions(symbolsDescriptions) : [];
    return [
      ['Character', 'Code Points{/red-fg}', 'Description'],
      ...arr.map(d => [d[0], charCodeHexString(d[0]), d[1]])
    ];
  }
}
