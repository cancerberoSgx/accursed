import { ListElementStyle } from '../blessedTypes'
import { Component, ComponentWithOptions } from '../jsx/component'
// import { create__Virtual } from '../jsx/createElement';

interface ListBarProps {
  keys?: string[] // TODO: this could ne also optional and querier from the markup
  /** user can provide options callbacks both from here or implementing method getCallbacks */
  callbacks?: {}
  // children?:
}
type Callback = () => void
/**
 * easier API for list bar
 */
export class ListBar<T extends ListBarProps, S = {}> extends Component<T, S> {
  protected optionsBase() {
    return {
      width: '88%',
      height: 3,
      border: 'line',
      top: 0,
      left: 0
    }
  }
  render() {
    // this.filterChildren(is__Virtual<>).forEach(v=>{

    // })
    return null
  }
}

/** uses __Virtual "feature"to return markup with data that will be ignored by the renderer , Data is consumend by our ListBar parent. This way we delare things not supported by blessed options in the markupwithout impact on the output. */
export class ListBarItem<T extends ListBarItemProps, S = {}> extends ComponentWithOptions<T, S> {
  render() {
    // return create__Virtual<ListBarItemProps>(this.props)
    return null
  }
}
interface ListBarItemProps extends ListElementStyle {
  callback(): void
  key: string
  // focused?: boolean
}
