import { Box, Div, findChildren, Maximize, React, ArtificialEvent, Textbox, Br, findDescendantNamed, ref } from 'accursed'
import { Component, Props } from '../util/component'
import { focusableOpts } from '../util/style';
import { PREFIX } from '../util/util';
import { tryTo } from 'misc-utils-of-mine-generic';

interface GoToLineFormProps extends Props {
  onSubmit(line: number): void
  // onCancel(): void

}

/** I'm just a container for a given GoToLineForm widget and document */
export class GoToLineForm extends Component<GoToLineFormProps> {

  constructor(p, s) {
    super(p, s)
  }

  render() {
    return (
        <Div>
          {/* Go to line number:  */}
          <textbox {...focusableOpts()} input={true} focused={true} inputOnFocus={true} width="100%" onChange={e=>this.onChange(e)} 
          ref={ref<Textbox>(c=>{
            // c.on('attached', ()=>{
              setTimeout(() => {
                    tryTo(()=>c.focus())
                  }, 300);
            // })
          })}
          // onRender={e=>{
          //   setTimeout(() => {
          //     tryTo(()=>e.currentTarget.focus())
          //   }, 300);
          // }}
          />
          <Br/>
          <text name={PREFIX('GoToLineFormErrorMessage')}></text>
        </Div>
    )
  }

  onChange(e: ArtificialEvent<Textbox> & { value: string; })  {
    const n = parseInt(e.value)
    if(!n) {
      this.getDescendantNamed(PREFIX('GoToLineFormErrorMessage')).setContent('Invalid number')
      this.screen.render()
    }
    else {
      this.props.onSubmit(n)
    }
  }

}
