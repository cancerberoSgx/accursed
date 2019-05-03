// import { React } from '..'
// import { getJSXChildrenProps, VirtualChildrenData, VirtualComponent } from '../blessed/virtualElement'
// import { ButtonOptions, Element, ElementOptions } from '../blessedTypes'
// import { Component } from '../jsx/component'
// import { ref, resolveRef } from '../jsx/createElement'
// import { focusableOpts } from '../util/sharedOptions'

// interface InputProps extends ElementOptions {
//   children: string|string[]|null
//   /**
//    * Notifies when the user moves thought the list as when pressing arrow functions. Notice that the user did not actionate the command, is just exploring the options.
//    */
//   onSelectItem?(index: number, item: Element): void
//   /**
//    * Notifies when the user presses ENTER or clicks a command.
//    */
//   onCommand?(index: number, item: Element): void

//   escapeKeys?: string[]
//   enterKeys?: []
//   blurKeys?: []
// }

// /**
//  * An opinionated and flexible version of textbox, more similar to input HTML API. Not virtual elements or wrappers, just decorated with a Component. Provides:
//  *
//  *  * onSubmit
//  *  * onChange // like in HTML only on blur or on enter
//  *  * onInput // as in HTML, when user is writing or navigating a list, tree or table, scrolling, collapsing, expanding, etc. User has performed some input but didn't performed the change/action gesture.
//  *  * onEscape the same as blessed onReset (I don't agree with that name).
//  *  * configuration for escape keys (so I can prevent TAB to cause blur). By default will be the same as in
//  *
//  * The idea is to define/refine the events better than blesse's so from here we build the rest of the components
//    * Example:
// ```jsx
// <Input onAction={} placeholder=""/>

// ```
//    */
// export class Input2 extends Component<InputProps> {
//   _saveJSXChildrenProps = true
//   dontEmitAction: any

//   constructor(p, s) {
//     super(p, s)
//     this.handleAction = this.handleAction.bind(this)
//     this.handleSelectItem = this.handleSelectItem.bind(this)
//   }

//   render() {
//     const childProps = getJSXChildrenProps(this)!
//     const Commands = childProps.filter(e => e.tagName === 'InputCommand')! as VirtualChildrenData[]

//     const commands: { [commandName: string]: Command } = {}
//     Commands.forEach(b => {
//       commands[b.children.join(' ')] = {
//         keys: b.attrs.keys || undefined,
//         callback: b.attrs.callback.bind(this),
//         text: b.attrs.text || undefined,
//         prefix: b.attrs.prefix || undefined
//         // commandId: b.attrs.commandId||undefined
//       }
//     })

//     //TODO: command button styles
//     return (
//       <Input
//         ref={ref<Input>(c => {
//           this.installHandlers(c)
//           resolveRef(this.props, c)
//         })}
//         {...{
//           ...focusableOpts(),
//           keyable: true,
//           clickable: true,
//           keys: true,
//           focusable: true,
//           mouse: true,
//           width: '100%',
//           ...this.props,
//           ref: undefined,
//           children: undefined
//         }}
//         commands={commands}
//       />
//     )
//   }
//   protected installHandlers(c: Input) {
//     c.on('select', this.handleAction)
//     c.on('selcet item', this.handleSelectItem)
//   }

//   protected handleAction(index: number, item: Element) {
//     if (!this.dontEmitAction && this.props.onCommand) {
//       this.props.onCommand(index, item)
//     }
//   }

//   protected handleSelectItem(index: number, item: Element) {
//     if (!this.dontEmitAction && this.props.onCommand) {
//       this.props.onCommand(index, item)
//     }
//   }

//   /**
//    * Will focus one of the list items. This won't call the callback, is the same action as moving though the list using the arrow keys.
//    */
//   select(indexOrText: number | string, options: { dontEmit?: boolean } = { dontEmit: false }) {
//     if (typeof indexOrText === 'string') {
//       indexOrText = this.Input.ritems.findIndex(i => i === indexOrText)
//     }
//     // if(indexOrText>0&&indexOrText<this.Input.items.length){
//     this.Input.select(indexOrText)
//     // }
//   }

//   /**
//    * This is equivalent to the user executing a command by pressing enter,  clicking it or pressing one of the commands [[keys]].
//    */
//   execute(index: number, options: { dontEmit?: boolean } = { dontEmit: false }) {
//     this.Input.selectTab(index)
//   }

//   addCommand(c: Command, options = { dontRenderScreen: false }) {
//     this.Input.appendItem(c)
//     if (!options.dontRenderScreen) {
//       this.screen.render()
//     }
//   }

//   get Input(): Input {
//     return this.blessedElement as Input
//   }

//   get selectedIndex() {
//     return this.Input.selected
//   }

//   get selectedText() {
//     return this.Input.ritems[this.Input.selected]
//   }
// }
