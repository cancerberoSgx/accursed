# TODO / questions / ideas / issues

JSX important: blessed elements (and custom subclasses)comply with Component (render() signature). class Custom extends blessed.widget.Box {...} ; React.render(<Custom/>)  should work out of the box.. fix createElement, ours:  render(): JSX.BlessedJsxNode - blessed:    render(): Coords

# Ideas

 *<Link>*  a special button with anchor like format that supportes an url... instea of a handler, there is a registry of paths, and a ROuter, and if the url matches the handler will show the page instead of the button havin to manipulate the nodes....!!!!
  - Like today's HTML apps nut in the console....
  * oths will match with apraemters... !!!
   * wmoji-search app : each tool and selection / option is represented with a url : `all/arabian/compact` or json like path ``{mainView: unicode, category: arabien, listType: compact, ect}`. This would simplify the app state a lot!!! that is missing in CLI apps development... 


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


# Issues

 * this is failing :   return <Div height="100%" width="100%">
      {[1,2,3,4,4,3,3,3,3].map(d=><button content="helo"/>)}
    </Div>
 * feature: jsx screen
 * feature: a provider for common props so style is propagated and mixed in childern
 * feature: refs ?   

# TODO 
 

 * IDEA: jsx render implementations are "forced" to consume the ast frmo the children to the parent (becase mostly of how the getberated fnuction call expressions are evaluated). But in gereal the mediums support first creating the parent and THEN creating and appending the children so this is the crazy idea. Instead of genrerating function expressoin calls generate a similar structure, and before rendering (React.render()) REVERSE the TREE. then render it upside down, level by level in order.  And It should be mandatory to generate an intermediate representation. The function calls can bewrapped in other function calls (instead of `h('div',{}, [h()])` generate  `(()=>h('div',{}, [()=>h())]))`  (similar how behavior JSX tahs like <If> are implemented... so they dont hget evaluated.
  * try to implement this in a second implementation or "mode" for blessed to see if this  easy the poroblem of plugins.

 * screen this.tput.bools.back_color_eraseπ - from screen - add to API?








# doubts / thoughts about JSX Text implementation,
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
