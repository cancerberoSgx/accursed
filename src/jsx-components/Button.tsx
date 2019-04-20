import { Button, ButtonOptions } from '../blessedTypes'
import { Component } from '../jsx/component'
import { React } from '../jsx/createElement'
import { ArtificialEvent } from '../jsx/types'

interface P extends ButtonOptions {
  onClick: onClickHandler<Button2>
  children: string
}
export type onClickHandler<T extends JSX.ElementType> = (e: ArtificialEvent<Button>) => void

export class Button2 extends Component<P, {}> {
  // protected defaultOptions() {
  //   return {
  //     mouse: true, clickable: true,
  //     keys: true, keyable: true, width: '88%',
  //     height: 3, border: 'line', top: 0, left: 0,
  //     focusable: true,
  //     style: {
  //       selected: { bg: 'magenta' },
  //       hover: { bg: 'blue' }
  //     }
  //   }
  // }
  render() {
    // return 'hello whoshdfihdsofh'
    // {this.props.children}
    // this.onCthis.props.onClick
    // const y : ObjectStringKeyValueUnion
    return (
      <button
        {...{
          // ...this.defaultOptions(),
          ...this.props,
          children: undefined
        }}
        // {...this.props,}
        onClick={e => this.props.onClick(e)}
        onPress={e => this.props.onClick(e)}
        content={this.props.children + ''}
        // style={{...this.defaultOptions(), ...this.props.style||{}}}
        // {...{ style: this.props.style || {} }}
      />
    )
    // const content = (this.props.children as any).join(' ') // a known proble I have with JSX impls
    // return <button onClick={e=>this.props.onClick.bind(this)} content={content} {...{style: this.props.style||{}}} {...this.defaultOptions()}></button>
    // return <button onClick={this.props.onClick.bind(this)} content={this.props.children+''} {...}></button>
    //  return  <button onClick={this.props.onClick.bind(this)} content={'hello'}></button>
  }
}
// TODO: use the type
