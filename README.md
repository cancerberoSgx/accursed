**Accursed: [blessed](https://github.com/chjj/blessed/)**

[blessed](https://github.com/chjj/blessed/) contributions, extensions, typings, documentation and apps of mine

Summary: I discovered blessed, an awesome library for developing command line UI, but unfortunately is a discontinued project a dn has poor documentation. 

Instead of cloning the project, here I try to develope missing parts, learn, document, type and find issues, but on top of it. 

So I'm learning, documenting prototypings and researching. The following is a summary of work done. 

<!-- toc -->
<!-- tocstop -->

# JSX

 * JSX/TSX support for all blessed components plus some of mine

 Simple, implementation of React.createElement to render JSX to blessed elements. 
 
Small but well-tested logic based on previous acquired knowledge in project https://github.com/cancerberoSgx/jsx-alone
 

## IntrinsicElements

Now supporting mostly all blessed element types

## function elements

```jsx
function Strong(props: { children?: string | string[]; color?: string }) {
  return (
    <text content={format(asArray(props.children || []).join(' '), ['bold', props.color].filter(notUndefined))}
    />
  )
}
```

## Class Elements

# Event handlers - function attributes

 * work 100%
 * are bind() to the element reference

## built-in event-related methods as attributes
built in event-related methods like like on() or key(), etc are supported via attributes. For example: 

  ```jsx
<textarea key={['f', (ch, key) => { ... }]}
  ```

Although these are typed are kind of ugly because must be arrays. this is why also there are supported nicer "artificial" event handlers:

## Hight level event handlers

already supported onClick, onChange, onRender, onKeyPressed so attributes are easy to write (just a function). 

### onRender

```jsx
 <layout onRender={e => this.installCollapsible(e.currentTarget, { collapsedHeight: 4 })}
```

### onChange

(currently only supported for Checkbox and subclasses)  -WIP define chance semantic and support it on all input elements
```jsx
 <checkbox content="Collapsed" checked={false}
   onChange={e => toggleCollapsed(e.currentTarget.parent as any, true)}
```

## Expressions

JSX expressions like `{condition && <box...}` or `{arr.map(a=><box...)} `or `{condition?<box... : <box...}` are supported. Basically falsy values are not printed.

## children

children can be printed using `{props.children}` expression . For non intrinsic elements children and attributes are responsibility of implementation

## JSXText

By default, for each JSXText node found, a new blessed.text is created. This is isolated in [[createTextNode]]. 

TODO: performance? use another thing ? use content? join several JSXText in one ?  right now it behaves well with layouts.. perhaps content='' is better. or text?

 * styles could be adapted from blessed like its options and modeled with classhierarchies, but also try to create a new feature and see how it plays there. For example a new option in ComponentWithOptions called cursor (since all elements should support it and don't)


# TODO / questions / ideas / issues

JSX important: blessed elements (and custom subclasses)comply with Component (render() signature). class Custom extends blessed.widget.Box {...} ; React.render(<Custom/>)  should work out of the box.. fix createElement, ours:  render(): JSX.BlessedJsxNode - blessed:    render(): Coords
## Ideas

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

