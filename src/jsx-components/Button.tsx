import { Button, ButtonOptions } from '../blessedTypes'
import { Component } from '../jsx/component'
import { React } from '../jsx/createElement'
import { ArtificialEvent } from '../jsx/types'
import { focusableOpts } from '../util/sharedOptions'

interface P extends ButtonOptions {
  onClick: (e: ArtificialEvent<Button>) => void
  children: string
}

export class Button2 extends Component<P, {}> {
  render() {
    return (
      <button
        {...{
          ...focusableOpts(),
          ...this.props,
          children: undefined
        }}
        onClick={e => this.props.onClick(e)}
        onPress={e => this.props.onClick(e)}
        content={this.props.children + ''}
      />
    )
  }
}
