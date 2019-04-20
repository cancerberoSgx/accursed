import { Component, React } from '..'
import { getJSXChildrenProps, VirtualComponent } from '../blessed/virtualElement'
import { BoxOptions, isElement, Element } from '../blessedTypes'
import { log } from '../util/logger'
import { Div } from './jsxUtil'
import { Collapsible, CollapsibleProps } from './collapsible';
import { setCollapsed } from '../blessed';
import { ArtificialEvent } from '../jsx/types';

interface AccordionBlockProps extends CollapsibleProps {
  children: JSX.BlessedJsxNode|JSX.BlessedJsxNode[]
}
interface AccordionProps extends BoxOptions {
  onCollapseChange?: (e: ArtificialEvent<Element>&{collapsed: boolean, index: number, element: Element})=>void
  children: AccordionBlock|AccordionBlock[]
}
export class AccordionBlock extends VirtualComponent<AccordionBlockProps> {}

/**
Accordion widget based on Collapsible. Examples:

```jsx
<Accordion border="line">
  <AccordionBlock bg='red'> some content <button content="asdas"></button> hello</AccordionBlock>
  <AccordionBlock> some content two <button content="asdas"></button> hello</AccordionBlock>
  <AccordionBlock style={fg: 'blue'}> some content three <button content="asdas"></button> hello</AccordionBlock>
</Accordion>
```
   */
export class Accordion extends Component<AccordionProps> {
  _saveJSXChildrenProps = true
  render() {
    const blocks = getJSXChildrenProps(this)!
      .filter(e => e.tagName === 'AccordionBlock')!
      .map(c=>({...c, height: c.attrs.height||'40%'}))
    let expandedIndex = blocks.findIndex(c=>c.attrs.collapsed===false)    
    
    expandedIndex = expandedIndex   ===-1 ? 0 :expandedIndex
    blocks.forEach((b, i)=>{
      b.attrs.collapsed = i!==expandedIndex
    })
    return (
      <Div {...this.props}>
        {blocks.map((c, index) => (
          <Collapsible {...c.attrs} height={c.attrs.height||'40%'} onCollapseChange={e=>{
            if(!e.collapsed){
              e.currentTarget.parent!.children.filter(isElement).forEach(c=>{
                if(c!== e.currentTarget){
                  setCollapsed(c, true, false, true)
                }else {
                  setCollapsed(c, false, false, true)
                }
              })
              e.currentTarget.screen.render()
            }
            this.props.onCollapseChange && this.props.onCollapseChange({currentTarget: this.blessedElement, index, element: e.currentTarget, collapsed: e.collapsed})
          }}>
            {c.children}
          </Collapsible>
        ))}
      </Div>
    )
  }
}