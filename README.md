**Accursed: [blessed](https://github.com/chjj/blessed/)**

[blessed](https://github.com/chjj/blessed/) contributions, extensions, typings, documentation and apps of mine

Summary: I discovered blessed, an awesome library for developing command line UI, but unfortunately is a discontinued project a dn has poor documentation. 

Instead of cloning the project, here I try to develope missing parts, learn, document, type and find issues, but on top of it. 

So I'm learning, documenting prototypings and researching. The following is a summary of work done.

<!-- toc -->

- [JSX](#jsx)
  * [IntrinsicElements](#intrinsicelements)
  * [function elements](#function-elements)
  * [Class Elements](#class-elements)
- [Event handlers - function attributes](#event-handlers---function-attributes)
  * [built-in event-related methods as attributes](#built-in-event-related-methods-as-attributes)
  * [Hight level event handlers](#hight-level-event-handlers)
    + [onRender](#onrender)
    + [onChange](#onchange)
  * [Expressions](#expressions)
  * [children](#children)
  * [JSXText](#jsxtext)
- [TODO / questions / ideas / issues](#todo--questions--ideas--issues)
  * [Ideas](#ideas)
- [specs](#specs)
- [My blessed contrib widgets and utilities:](#my-blessed-contrib-widgets-and-utilities)
- [Apps](#apps)
- [Typings:](#typings)
- [Documentation:](#documentation)
  * [Issues](#issues)
  * [TODO](#todo)

<!-- tocstop -->

# JSX

 * JSX/TSX support for all blessed components plus some of mine

 Simple, implementation of React.createElement to render JSX to blessed elements. 
 
Small but well-tested logic based on previous acquired knowledge in project https://github.com/cancerberoSgx/jsx-alone
 
## Attributes

Tip for JSX new commers, JSX attributes are typed. If a blessed option accept a number or a boolean then the attribute must be also. Example: the following two expressions are equivalent:

```jsx
const el = blessed.listbar({
  parent: screen, mouse: true, width: '88%',
  height: 3, style: { selected: { bg: 'magenta' }, }
})
```

```jsx
const el = React.render(<blessed parent={screen} mouse={true} width="88%" height={3} style={{bg: colors.green}}})
```
TIP for JSX newcomers: you can use object like syntax mixed with attribute syntax if more confortable and use spread expressions like this if you want:

```jsx
const commonOpts = { keys: true, mouse: true, clickable: true,  border: 'line'...
const el = React.render(<Div {...commonOpts} width="100%" border="line" 
  style={...commonStyles, {border: {...}, hover: {...}})...
```

  
## IntrinsicElements

Intrinsic elements are the building blocks os a JSX implementation and in thi case those are the blessed build in elements like button, bo, listbar, etc. Their tags **start with lower case. 

**Mostly all blessed element types are supported by this library**



## function elements

```jsx
function Strong(props={{ children}  string | string[]; color?: string }) {
  return (
    <text content={format(asArray(props.children || []).join(' '), ['bold', props.color].filter(notUndefined))}
    />
  )
}
```

## Class Elements (and function elements)

# Event handlers - function attributes

 * work 100%
 * are bind() to the element reference

## built-in event-related methods as attributes

JSX syntax, in event-related methods like like on() or key(), etc are supported via attributes. There is no syntax mapping at all, just straight forward method call, for example: 

```js
textarea.key('f',  (ch, key) => { ... }]}
```

equivalent to 

´´ç
  ```jsx
<textarea key={['f', (ch, key) => { ... }]}
  ```

If you notice some differences here, is ony because typings are insufficient, but there is no mapping/wrapping in these. 

## Hight level event handlers

Although these are typed are kind of ugly because must be arrays. this is why also there are supported nicer "artificial" event handlers:. JSX-HTML event handler syntax more practical in the markup:

onClick, onChange, onRender, onKeyPressed so attributes are easy to write (just a function). 

### **event.currentTarget**

Like with HTML - React - the event object of these hight level handlers have `currentTarget` property that references the element that triggered the event. Is particularly useful for change events in input elements: 

 ```jsx
<checkbox content="Collapsed" checked={false}
  onChange={e => toggleCollapsed(e.currentTarget.parent as any, true)}
```

### onClick Example

```jsx
<button onClick={e => this.installCollapsible(e.currentTarget, { collapsedHeight: 4 })}
```

### onRender example

```jsx
<layout onRender={e => this.installCollapsible(e.currentTarget, { collapsedHeight: 4 })}
```

### onChange

(currently only supported for Checkbox and subclasses)  -WIP define chance semantic and support it on all input elements
```jsx
<checkbox content="Collapsed" checked={false}
  onChange={e => toggleCollapsed(e.currentTarget.parent as any, true)}
```

### onSelect (for list-like elements)

```tsx
export class Categories extends Component<Props> {
  render() {
    return <Div>Choose a category, select and emoji and press [ENTER] for details.<Br />
      <list {...commonOptions()} height={'20%'}
        items={getCategoryNames()}
        onSelect={e => this.selected(e)}
        />
        ...
```

## JSX Expressions

Any expression often used to declare conditions aor iterate inside JSX Expressions are supported . 

**Falsy values won't be rendered so you can write expressions like the following**

### conditions with AND operator
```
{ condition && <box...}
```


### array render with map()
```
{ arr.map(a => <box...)}
```

### conditions with ternary condition

```
{ condition ? <box... : <box...}
```


## React-like Ref objects
https://reactjs.org/docs/refs-and-the-dom.html

```jsx
const screen = blessed.screen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
...
// create a RefObject before rendering.  use the Type parameter to declare it will reference a button
const ref1 = React.createRef<Button>()
// append some elements to the screen.has a ref iption and its value is the object we jsut cerwated.)
const app = <box><button ref={ref1} content="click" onClick={e => 
  expect(!ref1.current).isNotDefined() // before render the variable will be undefined
// after rendering the screen, we will be able to access the button using the variable without manually searching g for it.
blessed.screen.render()
// ... when the button finish rendering
ref1.current!.content = "'changed3"
ref1.current!.screen.render()
...
ref1.press()
...
```

 * it can be also used without JSX - remember is all the same... 


## JSX Text

By default, for each JSXText node found, a new `blessed.text` is created. 

THis means that JSX like

```jsx
<box> Hello here I'm writing <button onClick={this.m}>think this is invalid</button> some <box>in the middle</box> and a tail</box>
```

will be actually rendered as something like this 

```jsx
<box><text content=" Hello here I'm writing"/><button onClick={this.m}><text content="think this is invalid"/></button><text content=" some "/><box><text content="in the middle"/></box><text content=" and a tail"/></box>
```

Think on the TREE of blessed elements that will be generated). Also buttons will end up with a text inside. Below are more details, Probably a second implementaiton using parent's content attribute will be implemented and both will be available thorough configuration. 



## blessed-contrib


**blessed-contrib widgets  should be very easy to suuport, but right now I?m focusing on the framework and my own widgets tools and documentation, and hadent much time. They will be in time, probably in a separate project project. 



## Rendering Component own children

 * In custom components you dorender its childs using an expresion like `<MyComp {...this.props.hildren} other="options"/> ` as expected
 * Custom comeponents andJSX function elementss are responsible of rendering their children and attributes - unlike intrinsic elements which their children and attributes are rendering automatically

## Fragments

 Not supported yet :()


### Hooks into React.crateElement
 * WIP : api to extend the rendering process
 * React object oprovide with some addLikstener in interesting moments of the rendering tha tusers can use to modify the render process and even interrupt / modify the flow but right now only sketches... working on that... 

### Virtual Nodes

 * WIP 
 * Currently for each JSX Element a blessed elemtn is created. In many ocations I jsut want to declare information/semantics with the markup that a omponent can interpret at render time without all those blessed elemnts created ..  A special COmponent / tag exist that will provide that feature (WIP)



# doubts, thouths, TOLD


### doubts / thougths about JSX Text implementation, ç
....blessing, performance, design ...  need feedback ... 

Observations on the actual implementation

 * behaves well  with layout="inline" 
 * respect the JSX code AST structure text is a child node, not an attribtue)
 * more natural to format using tags (<H1>hello <strong>ksksks</strong>asdasd<i>ajlshd</i>
 * I think is a limiation that a button dont have children. many children  are hardcoded internally as nodes (border, hover, 
  * label. Maybe that's good for perfoamnce.. but is a limiatation... 
 
It can be easily changed, but I'n not sure since that will change the structure....

 * The implementation is isolated in React.[[createTextNode]] method so is easily customizable.  
 
* Probably will be configurable* because of performance TODO: performance? use another thing ? use content? join several JSXText in one ?  

**TO DECIDE WHILE IM PLAYING WITH IT** *right now it behaves well with layouts.. perhaps content='' is better. or text?

 * styles could be adapted from blessed like its options and modeled with classhierarchies, but also try to create a new feature and see how it plays there. For example a new option in ComponentWithOptions called cursor (since all elements should support it and don't)



# TODO / questions / ideas / issues

JSX important: blessed elements (and custom subclasses)comply with Component (render() signature). class Custom extends blessed.widget.Box {...} ; React.render(<Custom/>)  should work out of the box.. fix createElement, ours:  render(): JSX.BlessedJsxNode - blessed:    render(): Coords

# Ideas

 *<Link>*  a special button with anchor like format that supportes an url... instea of a handler, there is a registry of paths, and a ROuter, and if the url matches the handler will show the page instead of the button havin to manipulate the nodes....!!!!
  - Like today's HTML apps nut in the console....
  * oths will match with apraemters... !!!
   * wmoji-search app : each tool and selection / option is represented with a url : `all/arabian/compact` or json like path ``{mainView: unicode, category: arabien, listType: compact, ect}`. This would simplify the app state a lot!!! that is missing in CLI apps development... 


 * app for change font family ?  Unicode has various fonts : mathematical script, franktur, double struc, sans serif, italic, monospace, and other strange : lisu letter  ... and we can use similars from cherokee. mathematical alphanumeric symbols
     * similar to previous : vertical text ? vertical forms, compatibilty forms
     * phonetic extensions  , also has
     * latin extended aditional - adds symbols below, on top of letters - could taken as effects ?
     * number forms : has formats for numbers... romans... 
     * enclosed alphnumerics
     enclosed ideographic
     * latin extended c
     * half width and full width forms

 * the same way we plan to implement ListTab or Tab using virtual to declare data in the markup - implement Markdown so it declare the markdown content as children and not as attribute.

 * since components are associatged to blessed elements, would it be useful to also associate elements to componetns ?
 * props.children typings
 * shuld we support also blessed-contrib ? here ? another project?
 //TODO: research: to work purely with data / options and not with the elements already instantiated, we should create an intermediary representation  n createElement() and only create the blessed elements in render() so we have the time to process the option/tree before calling blessed constructors. for exapmle propagate style plugin is costly because it manipultes the elements instead of options AFTER they are rendered.... 
  * for state / update we will have the same problem as with jsx-alone-dom ex: .we want to represetn focus, hover, etc with component state and update the state. two alternatives:. Other ex: user center text of select an optionor etc - this will require components to be updated. 

RESEARCH PROBLEM -
   * an option here that we dont ahve in dom is, because we can assume that elemeents in terminal are much kess, we can associate a Component instance to EACH native elemnt so and this take care of the update. 

   Stateless (recreating the whole thing like with virtual dom is not viable here I think.)

   * don't ise blessed effects amd implement it from scrach

# specs

 * blessed has no specs - seems they (did) run them manually. I'm writing specs with my new feaytures. Some I use cli-driver to test the tire flow from the real command line automation, and other, I just render the widgets and assert against the screen content. 

 * testing blessing APIs alone , even create custom elements: spec/blessedSpec.tsx
  * jsx related: spec/jsxSpec.tsx
  * using cli-driver to spawn a program and automate it spec/jsxSpec.tsx

# My blessed contrib widgets and utilities: 

 * focus manager
 * collapsible element
 * node operations
 * modal
 * layout rendererand html like semantics
 * `<If>` conditions with markup - not so useful but interesting....
 * React like refs attribtues


# Apps
 
 * apps/emojis-search  : a unicode data table explorer. Test blessed performance by letting ht user interactively navigate/search, etc the FULL unicode charset . 

 * accursed gallery, spec/blessed/gallery/LayoutDemo.tsx I tried to use these tools to build a interactive playground with examplesWIP

  * https://github.com/cancerberoSgx/demos/tree/master/docs/typescript-ast-explorer - explore a TypeScripty project AST , visualliszetogether with sources code and even apply refactors. 


# Typings:

Also I think I've enhanced a lot the blessed.d.ts (TypeScript type declarations). ALthough the work from Definetely Typed  I started from was very good,  I did some refactoring so option types doesn't get too restrictive, I added lots of jsdoc comments and snippts to classes and methods and **declared lots of internal methods**. I want this types to be used by users extending the library (class MyElement extends blessing.widget.Box {}) and they need visibility to important methods, no matter if those are not meant to be published. I marked those with @internal tab. Also included typings for blessed-contrib but those I didn't modify so much.

# Documentation: 

the typings already existing in DefinitelyTypes had more or less all the descriptions in blessed README. I added a lot from program.js, snippets and make sure it all blessed/tests.js compile OK with the types (which didn't). Also using typedoc I'm truing to generate html and markdown output of this so I can share with others. TODO: links




## Issues

 * this is failing :   return <Div height="100%" width="100%">
      {[1,2,3,4,4,3,3,3,3].map(d=><button content="helo"/>)}
    </Div>
 * feature: jsx screen
 * feature: a provider for common props so style is propagated and mixed in childern
 * feature: refs ?   

## TODO 
 

 * IDEA: jsx render implementations are "forced" to consume the ast frmo the children to the parent (becase mostly of how the getberated fnuction call expressions are evaluated). But in gereal the mediums support first creating the parent and THEN creating and appending the children so this is the crazy idea. Instead of genrerating function expressoin calls generate a similar structure, and before rendering (React.render()) REVERSE the TREE. then render it upside down, level by level in order.  And It should be mandatory to generate an intermediate representation. The function calls can bewrapped in other function calls (instead of `h('div',{}, [h()])` generate  `(()=>h('div',{}, [()=>h())]))`  (similar how behavior JSX tahs like <If> are implemented... so they dont hget evaluated.
  * try to implement this in a second implementation or "mode" for blessed to see if this  easy the poroblem of plugins.

 * screen this.tput.bools.back_color_eraseπ - from screen - add to API?