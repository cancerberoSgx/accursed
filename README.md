Blessing contributions of mine.

Summary: I discovered blessed, an awesome library for developing command line UI, but unformtunately is a discontinued project a dn has poor documentation. 

Instead of cloning the project, here I try to develope missing parts, learn, document, type and find issues, but on top of it.

## Issues

 * jsx screen
 * a provider for common props so style is propagated and mixed in childern
 * refs ?   

## TODO 

 * jsx render implementations are "forced" to consume the ast frmo the children to the parent (becase mostly of how the getberated fnuction call expressions are evaluated). But in gereal the mediums support first creating the parent and THEN creating and appending the children so this is the crazy idea. Instead of genrerating function expressoin calls generate a similar structure, and before rendering (React.render()) REVERSE the TREE. then render it upside down, level by level in order.  And It should be mandatory to generate an intermediate representation. The function calls can bewrapped in other function calls (instead of `h('div',{}, [h()])` generate  `(()=>h('div',{}, [()=>h())]))`  (similar how behavior JSX tahs like <If> are implemented... so they dont hget evaluated.
  * try to implement this in a second implementation or "mode" for blessed to see if this  easy the poroblem of plugins.
