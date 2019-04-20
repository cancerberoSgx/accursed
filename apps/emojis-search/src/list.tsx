import { Component, Div, React, showInModal, Element, isElement, replaceChildren, Br, Button2 } from 'accursed'
import { EmojiDefinition, getCategoryEmojis, getEmojiDefinitions } from './data/data'
import { inputOptions, scrollableOptions } from './elementOptions'
import {asArray} from 'misc-utils-of-mine-generic'

export class List extends Component<{
  category?: string
  emojis?: (EmojiDefinition)[]
}> {
  private static lastListMode: 'compact'|'listTable'='listTable'
  render() {
    return (
      <Div height="100%">
        <checkbox {...inputOptions()} checked={List.lastListMode === 'listTable' ? false : true} content="Compact View" onChange={e => {
            this.replaceDescendantChildren("list-container", e.value ? this.compact() : this.listtable())
            List.lastListMode = e.value? 'compact' : 'listTable'
        }} />
        <Button2 {...inputOptions()} onClick={e=>{
          e.currentTarget.screen.readEditor({value: JSON.stringify(this.getListTableData(), null, 2)}, (err, data)=>{
          })
          // showInModal(e.currentTarget.screen, React.render(<textarea  {...inputOptions()}  width="100%" height="100%" value={JSON.stringify(this.getListTableData(), null, 2)} focused={true} keyable={true} keys={true} onceRender={e=>{e.currentTarget.focus(); e.currentTarget.screen.render()}}></textarea>))
        }}>Save</Button2>
        <Div name="list-container">{List.lastListMode === 'listTable' ? this.listtable() : this.compact() }        </Div>
      </Div>
    )
  }
  // getDescendantNamed
  replaceDescendantChildren(oldChildNameOrElement: string|Element, newChildren: (Element|JSX.Element)|(Element|JSX.Element)[]): any {
    const newElements = asArray(newChildren).map(c=> isElement(c) ? c:  React.render(c))
    const targetDescendant = isElement(oldChildNameOrElement) ? oldChildNameOrElement : this.findDescendant(d=>isElement(d) && d.name===oldChildNameOrElement)
    if(newElements && targetDescendant){
      replaceChildren(targetDescendant, newElements);
      // targetDescendant.replaceChildren(targetDescendant)
    }
    // throw new Error('Method not implemented.');
  } 
  private listtable() {
    return (
      <listtable
        {...scrollableOptions()}
        height="100%"
        width="100%"
        data={this.getListTableData()}
        onKeyPress={e => {
          if (e.key.name === 'enter' || e.key.name === 'space') {
            const char = this.getListTableData()[e.currentTarget.selected || 0][0] as string
            this.selectEmoji(char)
          }
        }}
      />
    )
  }

  private selectEmoji(char: string) {
    const emoji = getEmojiDefinitions().find(c => c.char === char)!

    this.blessedElement.screen.copyToClipboard(JSON.stringify(emoji))
    const text = `
(Copied to clipboard as JSON data. Press [q] to dismiss this modal.)

${Object.keys(emoji)
  .filter(k => emoji[k])
  .map(k => ` * {bold}${k}{/bold}: ${typeof emoji[k] === 'object' ? JSON.stringify(emoji[k]) : emoji[k]}`)
  .join('\n')}
`.trim()
    const box = React.render(
      <box
        scrollable={true}
        tags={true}
        mouse={true}
        keys={true}
        focused={true}
        focusable={true}
        content={text}
        label={`Details for "${char}"`}
        border="line"
        padding={1}
      />
    )
    showInModal(this.blessedElement.screen, box, undefined, '70%', '90%')
    box.focus()
  }

  getListTableData() {
    const arr = this.getData()
    return [['Character', 'Code Points', 'Name'], ...arr.map(d => [d.char, d.cp, d.name])]
  }

  private getData() {
    return this.props.category ? getCategoryEmojis()[this.props.category] : this.props.emojis || []
  }

  compact(): any {
    return (
      <Div {...inputOptions()} border={undefined} height="100%" width="100%" focusable={true}>
        {/* <button {...inputOptions()} content="hello"/>  <button content="hel🇦🇨lo"/> //<button>helloel🇦🇨l world</button> */}
        {this.getData().map(d => (
          <button
            {...inputOptions()}
            border={undefined}
            height={1}
            width={3}
            content={`${d.char}`}
            onPress={() => {
              this.selectEmoji(d.char)!
            }}
          />
        ))}
        {/* {[1,2,3,4,4,3,3,3,3].map(d=><button content="hel🇦🇨lo"/>)} */}
        {/* {this.getData().map(d=>d.char).join(' ')} */}
      </Div>
    )
  }
}

// /** will use layout with [[renderer]] */
// export function D(
//   props: {
//     children?: any
//   } & Partial<LayoutOptions> & Partial<EventOptions<Layout>>
// ) {
//   return (
//     <layout
//       {...{ ...props, children: undefined, height: props.height || '99%', width: props.width || '95%' , renderer: props.renderer || renderer}}>
//       {/* {...[Array.isArray(props.children) ?  props.children  :  [props.children]]} */}
//       {...props.children}
//     </layout>
//   )
// }
