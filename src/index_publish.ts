export * from 'blessed'
export { grid, map, markdown, table, tree } from 'blessed-contrib'
export * from './blessed'
export * from './blessedTypes'
export * from './blessesContrib/treeUtil'
export * from './declarations/blessedTermCap'
export * from './jsx'
export * from './jsx-components'
export * from './jsx/types'
export { createScreen2, createScreenForBrowser } from './util/browser'
export { log as debug } from './util/logger'

// import * as blessed from 'blessed'
// export {bigtext as jj} from 'blessed' 
// export * from 'declarations/blessed'

// {
// 	"resource": "/Users/sebastiangurin/git/accursed/apps/json-cat/src/manager.tsx",
// 	"owner": "typescript",
// 	"code": "2322",
// 	"severity": 8,
// 	"message": "Type '<T extends TreeElementNode = TreeElementNode>(options?: TreeOptions<T> | undefined) => TreeElement<T>' is not assignable to type 'blessedElementConstructor<Pick<ElementOptions, \"tags\" | \"fg\" | \"bg\" | \"bold\" | \"underline\" | \"style\" | \"border\" | \"content\" | \"clickable\" | \"input\" | \"keyable\" | \"focused\" | \"hidden\" | \"label\" | \"hoverText\" | ... 20 more ... | \"focusable\">, BlessedElement<...>>'.\n  Types of parameters 'options' and 'options' are incompatible.\n    Type 'Pick<ElementOptions, \"tags\" | \"fg\" | \"bg\" | \"bold\" | \"underline\" | \"style\" | \"border\" | \"content\" | \"clickable\" | \"input\" | \"keyable\" | \"focused\" | \"hidden\" | \"label\" | \"hoverText\" | ... 20 more ... | \"focusable\"> | undefined' is not assignable to type 'TreeOptions<{ [index: string]: any; }> | undefined'.\n      Type 'Pick<ElementOptions, \"tags\" | \"fg\" | \"bg\" | \"bold\" | \"underline\" | \"style\" | \"border\" | \"content\" | \"clickable\" | \"input\" | \"keyable\" | \"focused\" | \"hidden\" | \"label\" | \"hoverText\" | ... 20 more ... | \"focusable\">' is not assignable to type 'TreeOptions<{ [index: string]: any; }>'.\n        Types of property 'screen' are incompatible.\n          Type 'import(\"/Users/sebastiangurin/git/accursed/dist/src/declarations/blessed\").Widgets.Screen | undefined' is not assignable to type 'import(\"/Users/sebastiangurin/git/accursed/apps/json-cat/node_modules/accursed/dist/src/declarations/blessed\").Widgets.Screen | undefined'.\n            Type 'import(\"/Users/sebastiangurin/git/accursed/dist/src/declarations/blessed\").Widgets.Screen' is not assignable to type 'import(\"/Users/sebastiangurin/git/accursed/apps/json-cat/node_modules/accursed/dist/src/declarations/blessed\").Widgets.Screen'.",
// 	"source": "ts",
// 	"startLineNumber": 38,
// 	"startColumn": 40,
// 	"endLineNumber": 38,
// 	"endColumn": 51,
// 	"relatedInformation": [
// 		{
// 			"startLineNumber": 146,
// 			"startColumn": 9,
// 			"endLineNumber": 146,
// 			"endColumn": 51,
// 			"message": "The expected type comes from this index signature.",
// 			"resource": "/Users/sebastiangurin/git/accursed/dist/src/jsx/types.d.ts"
// 		}
// 	]
// }