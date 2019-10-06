import { tryTo } from 'misc-utils-of-mine-generic'
import { Component, createScreen, Div, installExitKeys, React, Screen } from '../src'
import { VirtualComponent } from '../src/blessed/virtualElement'

/** see guides/virtual-elements.md  */
xdescribe('virtualElements', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })
  it('dumm', () => {
    expect(1).toBe(1)
  })
  xit('should allow authors define semantics with arbirary markyp and validate children and attributes fleible', async done => {
    let screen: Screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
    installExitKeys(screen)
    // component declarations (extend VirtualComponent then they wont be rendered (wont create any elememt only provide parent with data.))
    class TabHeadings extends VirtualComponent<TabHeadingsProps> { }
    class TabBlocks extends VirtualComponent<TabBlocksProps> { }
    class TabBlock extends VirtualComponent<TabBlockProps> { }
    class TabHeading extends VirtualComponent<TabHeadingProps> { }

    // component Props, . where the semantics / API is really defined (validated)
    interface TabPanelProps {
      /** Only must contain only TabHeadings and  TabBlocks children,and only one of each. */
      children: (TabHeadings | TabBlocks)[]
    }
    /** only alows  TabBlock there must be  */
    interface TabBlocksProps {
      children: JSX.BlessedJsxNode | TabBlock[]
    }
    interface TabBlockProps {
      id: string
      children: JSX.BlessedJsxNode
    }
    interface TabHeadingsProps {
      children: JSX.BlessedJsxText | TabHeading[]
    }
    /** inner text is mandatory and only text. id attr is mandatory. */
    interface TabHeadingProps {
      active?: boolean
      focus?: boolean
      id: string
      children: JSX.BlessedJsxNode
    }
    class TabPanel extends Component<TabPanelProps> {
      render() {
        return (
          <Div>
            Welcome to the soper heroe store, use the tabs below to focus on special super powers.
            <listbar commands={[]} />
            <Div />
          </Div>
        )
      }
    }
    const UserApp2 = (
      <Div>
        Welcome to the soper heroe store, use the tabs below to focus on special super powers. Here we are inside real
        blessed components, container box for exampe. But below (TabPanel> are virtual components that won't be rendered
        at all. Probably other elements wil be rendered instead
        <TabPanel>
          <TabHeadings>
            <TabHeading id="t1" active={true}>
              Removint this text gives an error
            </TabHeading>
            <TabHeading id="id is mandatory">Ttiel1 </TabHeading>
            there could be text or spaces between Headings but not other elements not even intrinsic so uncommenting the
            next will give error _{/* <text content="elements"/> */}
          </TabHeadings>
          <TabBlocks>
            <TabBlock id="12"> blocks must have text and can contain any other kind of element</TabBlock>
            There cannot be any element besides text between blocks so uncomenting the follwoiing gives
            {/* <button content=""incalud></button> */}
            <TabBlock id="2">id is mandatory</TabBlock>
          </TabBlocks>
          >
          {/* There cannot be text between TabBlocks and TabPanel asd123 123 
            un commenting this text gives error*/}
        </TabPanel>
      </Div>
    )
    done()
  })
})
