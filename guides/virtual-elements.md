This is a concept that is not in react...It makes much sencse sence with typescript ... 

Besides react fragments all JSX.Elements declared render a DOM / blessed element. From bottom to the top. 

Virtual element let component authors declare element's children props that won't be rendered at all. Useful to define complex component API as markup and then render another thing that implements it. 
    

Example: A Tab Panel (types definitions as JSX ELement Props)

## Componnet decarations 

(extend VirtualComponent then they wont be rendered (wont create any elememt only provide parent with data.))

```jsx
class TabHeadings extends VirtualComponent<TabHeadingsProps>{ }
class TabBlocks extends VirtualComponent<TabBlocksProps>{ }
class TabBlock extends VirtualComponent<TabBlockProps>{ }
class TabHeading extends VirtualComponent<TabHeadingProps>{ }
```

## Props declarations: 

Component Props, . where the semantics 

The API semantics & structure is really defined here (the markup the user needs to write)

```tsx
interface TabPanelProps {
  /** Only must contain only TabHeadings and  TabBlocks children,and only one of each. */
  children: (TabHeadings | TabBlocks)[] 
}
/** only alows  TabBlock there must be  */
interface TabBlocksProps {
  children: JSX.BlessedJsxNode | TabBlock[]
}
interface TabBlockProps {
  id:  string, children: JSX.BlessedJsxNode
}
interface TabHeadingsProps {
  children: JSX.BlessedJsxText | TabHeading[]
}
/** inner htext is mandatoryy and only text. id attr is mandatory. */
interface TabHeadingProps {
  active?: boolean, focus?: boolean, id: string, children: JSX.BlessedJsxNode
}
```
## Users code
It needs to respect Props structure or fail to compile

```tsx
const UserApp2 = <Div>
Welcome to the soper heroe store, use the tabs below to focus on special super powers.
Here we are inside real blessed components, container box for exampe. But 
below (TabPanel> are virtual components that won't be rendered at all. Probably other elements wil be rendered instead
<TabPanel>
  <TabHeadings>
    <TabHeading id="t1" active={true}>Removint this text gives an error</TabHeading>
    <TabHeading id="id is mandatory">Ttiel1 </TabHeading>
    there could be text or spaces between Headings     but not other elements not even intrinsic
    so uncommenting the next will give error _
    {/* <text content="elements"/> */}
  </TabHeadings>
  <TabBlocks>
    <TabBlock id="12"> blocks must have text and can contain any other kind of element</TabBlock>

    There cannot be any element besides text between blocks so uncomenting the follwoiing gives
  {/* <button content=""incalud></button> */}
    <TabBlock id="2">id is mandatory</TabBlock>
  </TabBlocks>>
    {/* There cannot be text between TabBlocks and TabPanel asd123 123 
    uncommenting this text vigeserror*/}
</TabPanel>
</Div>
```

## The actual implementation

we implemetnt it we hyst a couple of blessing elements 

```jsx
class TabPanel extends Component<TabPanelProps>{
  render() {
    return <Div>
      Welcome to the soper heroe store, use the tabs below to focus on special super powers.
        <listbar commands={[]}></listbar>
      <Div>
      </Div>
    </Div>
  }
}
```

  

# TIPS for TypeScript begginrs


* Notice that COmponent's accept above Props and returns a much simpler structure (only blessed elements that **will consume the user input, structure, attributes, cgiuldrem etc) as input data / optinos:

 * union with JSX.BlessedJsxNode will include elemnts 
 * unioin with  JSX.BlessedJsxText to include text 
 * Children validation TIP: 
 * {}  no children alowed or text
 * children: JSX.BlessedJsxNode exactly one children , of any type
 * children [A, B, C] : exacly three childrens and their types must have that order.
 * children A|B|C|JSX.BlessedJsxText any of a, b, v or text, in any order any amount
 *  children: Type | JSX.BlessedJsxNode will allow children of 
 * Type Union with `JSX.BlessedJsxText``to allow Text (string) children


# Bless options 

in blessed feets very well with transversal convepts like border and scrollbar since it allows to separate that seantics with the elelnet:
Currently is all mixed in the same declaration object - and spreaded ...  at the same time.. 


## Proposal : Children eleemnt affects all descendants of its parent:

```tsx
const userCode =       <ListTable>
  <Scroll></Scroll>                               <---- .... add a ScrollBar to the list table parent
  <THead style={{border: {}, backgroud: '', }>     <--- the style is only for the head
<tr><th>title1</th><th>title2</th></tr>>
  </THead>
  <tbody>    
  <style....>                                   <---- style for cels , spanm etc
    <tr><td>value1</td><td>value2</td></tr>
  </tbody>
</listTable>
<Form>
<Focus siblings keys="...."  style=""  >   <-- all siblings
<Input>Button>
</form>
                                                <---- no more focus
  other content
  </box>
```

## Proposal: React-like Providers

(although react's care musch simpler. (Cannot be nested) or doesn't contain qualifiers like these)

Wrap elements to affect options of children: 

```tsx
<Options set={...baseOptions}>
  <box>
  <Options assign={focusableOptions}><textarea></textarea<</Options>
  <box>el asdlkk selfajkejf kjlka ef
  l ksdjf s d<Options union={only the union of scope options and these}>something/ioptoins>

  akls jdlkajs kdkksjd aljk <Options remove={fpcisable}>I dont want focus</Options>
  </box>
</Options>
´´´