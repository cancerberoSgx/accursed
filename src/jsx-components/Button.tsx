import { ButtonOptions, colors, IMouseEventArg } from '../blessedTypes'
import { Component } from '../jsx/component'
import { React } from '../jsx/createElement'

interface P extends ButtonOptions {
  onClick: onClickHandler<Button>
  children: string
}
export class Button extends Component<P, {}> {
  protected defaultOptions() {
    return {
      mouse: true,
      clickable: true,
      keys: true,
      keyable: true,
      width: '88%',
      height: 3,
      border: 'line',
      top: 0,
      left: 0,
      focusable: true,
      style: {
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
    }
  }
  render() {
    // return 'hello whoshdfihdsofh'
    // {this.props.children}
    // this.onCthis.props.onClick
    // const y : ObjectStringKeyValueUnion
    return (
      <button
        onClick={e => this.props.onClick.bind(this)}
        content={this.props.children + ''}
        {...{ style: this.props.style || {} }}
        {...this.defaultOptions()}
      />
    )
    // const content = (this.props.children as any).join(' ') // a known proble I have with JSX impls
    // return <button onClick={e=>this.props.onClick.bind(this)} content={content} {...{style: this.props.style||{}}} {...this.defaultOptions()}></button>
    // return <button onClick={this.props.onClick.bind(this)} content={this.props.children+''} {...}></button>
    //  return  <button onClick={this.props.onClick.bind(this)} content={'hello'}></button>
  }
}
// TODO: use the type
export type onClickHandler<T extends JSX.ElementType> = (this: T, e: IMouseEventArg) => void
