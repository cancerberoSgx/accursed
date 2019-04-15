## TODO : move to another project

 Simple, implementation of React.createElement to render JSX to blessed elements. 
 
Small but well-tested logic based on previous acquired knowledge in project https://github.com/cancerberoSgx/jsx-alone
 
# Elements

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

 * since components are associatged to blessed elements, would it be useful to also associate elements to componetns ?
 * props.children typings
 * shuld we support also blessed-contrib ? here ? another project?
 //TODO: research: to work purely with data / options and not with the elements already instantiated, we should create an intermediary representation  n createElement() and only create the blessed elements in render() so we have the time to process the option/tree before calling blessed constructors. for exapmle propagate style plugin is costly because it manipultes the elements instead of options AFTER they are rendered.... 
  * for state / update we will have the same problem as with jsx-alone-dom ex: .we want to represetn focus, hover, etc with component state and update the state. two alternatives:. Other ex: user center text of select an optionor etc - this will require components to be updated. 

RESEARCH PROBLEM -
   * an option here that we dont ahve in dom is, because we can assume that elemeents in terminal are much kess, we can associate a Component instance to EACH native elemnt so and this take care of the update. 

   Stateless (recreating the whole thing like with virtual dom is not viable here I think.)

   * don't ise blessed effects amd implement it from scrach