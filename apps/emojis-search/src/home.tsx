import { Div, React } from 'accursed'

export const Home = () => (
  <Div
    tags={true}
    content={`
{bold}{underline}Welcome!{/}

Select one of the categories below or search some words.

Tips: 

 * you can use the {bold}mouse{/bold}
 * {bold}focus{/bold} between elements using *TAB{/bold} and arrow keys
 * {bold}ENTER{/bold} or {bold}SPACE{/bold} to click
 * for enter text in {bold}input boxes{/bold} you need to {bold}ENTER{/bold} before. To restore focus navigation you need to press [ESC]to return focusing the other elements.

Good luck, enjoy. 

Project Home Page: https://github.com/cancerberoSgx/accursed
`}
  />
)
