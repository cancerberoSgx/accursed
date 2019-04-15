import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { RemoveProperties } from '../util/misc'

export type Node = blessed.Widgets.Node
export type Box = blessed.Widgets.BoxElement
export type Line = blessed.Widgets.LineElement

export type Element = blessed.Widgets.BlessedElement
export type LayoutIterator = blessed.Widgets.LayoutIterator
export type Padding = blessed.Widgets.Padding
export type NodeWithEvents = blessed.Widgets.NodeWithEvents
export type Textarea = blessed.Widgets.TextareaElement
export type Text = blessed.Widgets.TextElement
export type Button = blessed.Widgets.ButtonElement
export type BigText = blessed.Widgets.BigTextElement
export type Layout = blessed.Widgets.LayoutElement
export type Checkbox = blessed.Widgets.CheckboxElement
export type Screen = blessed.Widgets.Screen
export type List = blessed.Widgets.ListElement
export type FileManager = blessed.Widgets.FileManagerElement
export type ListTable = blessed.Widgets.ListTableElement
export type ListBar = blessed.Widgets.ListbarElement

export type Form = blessed.Widgets.FormElement
export type Textbox = blessed.Widgets.TextboxElement
export type RadioSet = blessed.Widgets.RadioSetElement
export type RadioButton = blessed.Widgets.RadioButtonElement

// Heads up - The users need need to reference blessed element options removing children property
export type BoxOptions = RemoveProperties<blessed.Widgets.BoxOptions, 'children'>
export type ListTableOptions = RemoveProperties<blessed.Widgets.ListTableOptions, 'children'>
export type ListbarOptions = RemoveProperties<blessed.Widgets.ListbarOptions, 'children'>
export type BigTextOptions = RemoveProperties<blessed.Widgets.BigTextOptions, 'children'>
export type ListOptions = RemoveProperties<blessed.Widgets.ListOptions, 'children'>
export type FileManagerOptions = RemoveProperties<blessed.Widgets.FileManagerOptions, 'children'>
export type LineOptions = RemoveProperties<blessed.Widgets.LineOptions, 'children'>
export type TextOptions = RemoveProperties<blessed.Widgets.TextOptions, 'children'>
export type ElementOptions = RemoveProperties<blessed.Widgets.ElementOptions, 'children'>
export type LayoutOptions = RemoveProperties<blessed.Widgets.LayoutOptions, 'children'>
export type TextElementOptions = RemoveProperties<blessed.Widgets.TextOptions, 'children'>
export type TextareaOptions = RemoveProperties<blessed.Widgets.TextareaOptions, 'children'>
export type ButtonOptions = RemoveProperties<blessed.Widgets.ButtonOptions, 'children'>
export type InputOptions = RemoveProperties<blessed.Widgets.InputOptions, 'children'>
export type CheckboxOptions = RemoveProperties<blessed.Widgets.CheckboxOptions, 'children'>
export type FormOptions = RemoveProperties<blessed.Widgets.FormOptions, 'children'>
export type TextboxOptions = RemoveProperties<blessed.Widgets.TextboxOptions, 'children'>
export type RadioSetOptions = RemoveProperties<blessed.Widgets.RadioSetOptions, 'children'>
export type RadioButtonOptions = RemoveProperties<blessed.Widgets.RadioButtonOptions, 'children'>

export type PositionCoords = blessed.Widgets.PositionCoords

export type IMouseEventArg = blessed.Widgets.Events.IMouseEventArg
export type NodeMouseEventType = blessed.Widgets.NodeMouseEventType
export type NodeScreenEventType = blessed.Widgets.NodeScreenEventType
export type IKeyEventArg = blessed.Widgets.Events.IKeyEventArg
export type INodeGenericEventArg = blessed.Widgets.Events.INodeGenericEventArg

export type NodeEventType = blessed.Widgets.NodeEventType
export type NodeGenericEventType = blessed.Widgets.NodeGenericEventType

export type Border = blessed.Widgets.Types.TStyle
export type Style = blessed.Widgets.Types.TStyle
export type ListElementStyle = blessed.Widgets.ListElementStyle
export type Program = blessed.BlessedProgram

export type Markdown = contrib.Widgets.MarkdownElement
export const colors = blessed.colors.colorNames
export type BlessedElementOptionsUnion = BoxOptions | TextOptions | TextareaOptions | ListTableOptions | ListOptions
export type BlessedElementOptionsIntersection = BoxOptions &
  TextOptions &
  TextareaOptions &
  ListTableOptions &
  ListOptions

export { blessed }

/** isElement type guard without type parameters */
export function isElement(n: any): n is Element {
  return n && n.removeLabel && n.disableDrag && n.setContent && n.getScreenLines
}
/** isElement type guard that cast to a concrete type by without really asserting on the concrete type - use only if sure */
export function isElementUnSafe<E extends Element = Element>(n: any): n is E {
  return n && n.removeLabel && n.disableDrag && n.setContent && n.getScreenLines
}

/** isNode type guard by asserting on a given type name (recommended) */
export function isNodeByType<E extends Element = Element>(n: any, type: WidgetTypeNames): n is E {
  return n && n.removeLabel && n.disableDrag && n.setContent && n.getScreenLines
}
export function isScreen(n: any): n is Screen {
  return isNodeByType(n, WidgetTypesEnum.screen)
  // return n && isNode(n) && n.type === 'screen'
}
/** isNode type guard without type parameters */
export function isNode(n: any): n is Node {
  return n && n.insertBefore && n.forDescendants
}

export enum WidgetTypesEnum { // TODO: finish
  'element' = 'element',
  'node' = 'node',
  'screen' = 'screen',
  'box' = 'box',
  'text' = 'text',
  'line' = 'line',
  'textarea' = 'textarea',
  'layout' = 'layout',
  'button' = 'button',
  'checkbox' = 'checkbox',
  'bigtext' = 'bigtext',
  'list' = 'list',
  'filemanager' = 'filemanager',
  'listtable' = 'listtable',
  'listbar' = 'listbar',
  'form' = 'form',
  'textbox' = 'textbox',
  'radioset' = 'radioset',
  'radiobutton' = 'radiobutton'
}
export interface WidgetTypes {
  // TODO: finish
  [WidgetTypesEnum.element]: Element
  [WidgetTypesEnum.node]: Node
  [WidgetTypesEnum.screen]: Screen
  [WidgetTypesEnum.box]: Box
  [WidgetTypesEnum.text]: Text
  [WidgetTypesEnum.line]: Line
  [WidgetTypesEnum.textarea]: Textarea
  [WidgetTypesEnum.layout]: Layout
  [WidgetTypesEnum.button]: Button
  [WidgetTypesEnum.checkbox]: Button
  [WidgetTypesEnum.bigtext]: BigText
  [WidgetTypesEnum.list]: List
  [WidgetTypesEnum.filemanager]: FileManager
  [WidgetTypesEnum.listtable]: ListTable
  [WidgetTypesEnum.listbar]: ListBar
  [WidgetTypesEnum.form]: Form
  [WidgetTypesEnum.textbox]: Textbox
  [WidgetTypesEnum.radioset]: RadioSet
  [WidgetTypesEnum.radiobutton]: RadioButton
}
type WidgetTypeNames = keyof WidgetTypes

// quickly categorization of visual related - no-styles- options. Notes: consider text as a widget not as content. some options could be in more than one category since same names are used for different semantis. Also the separation between styles and options is kind of arbitrary.
export type MouseInputActivationOptions = 'mouse' | 'clickable' | 'draggable' | 'alwaysScroll' | 'focusable'
export type InputActivationOption = MouseInputActivationOptions | 'keys' | 'keyable' | 'vi' | 'inputOnFocus'
export type DimensionOptions = 'padding' | 'width' | 'height' | 'shrink' | 'fill'
export type PositionOptions = 'top' | 'left' | 'align' | 'valign' | 'position'
export type TextStyleOptions = 'underline' | 'bold' | 'blink' | 'inverse' | 'text'
export type DecorationOptions = 'border' | 'type' | 'label' | 'shadow' | 'content' | 'hoverText' | 'ScrollStyleOptions'
export type EventEStyleOptions = 'selected' | 'hover' | 'focus'
export type ColorOptions = 'fg' | 'fg' | 'transparent' | 'ch' | 'invisible'
export type CompositionStyleOptions = 'item'
export type ContainerOptions = 'layout' | 'children' | 'parent'
export type ScrollStyleOptions = 'track' | 'scrollbar'
export type ScrollOptions = 'baseLimit'
export type ValueOptions = 'secret' | 'checked' | 'censor' | 'text' | 'text'
export type VisualOptions = MouseInputActivationOptions | InputActivationOption | DimensionOptions | PositionOptions

//TODO: for each of these build the partials:
export type MouseInputActivationOptionNames = Pick<BlessedElementOptionsIntersection, MouseInputActivationOptions>
export type InputActivationOptionNames = Pick<BlessedElementOptionsIntersection, InputActivationOption>
export type DimensionOptionsNames = Pick<BlessedElementOptionsIntersection, DimensionOptions>
export type PositionOptionsNames = Pick<BlessedElementOptionsIntersection, PositionOptions>

// TODO: Map Options and Styles with element types

export interface ElementTypeOptions {
  [WidgetTypesEnum.box]:
    | MouseInputActivationOptions
    | DimensionOptions
    | PositionOptions
    | TextStyleOptions
    | DecorationOptions
    | ColorOptions
    | ContainerOptions
    | ScrollStyleOptions
  [WidgetTypesEnum.listbar]:
    | ElementTypeOptions[WidgetTypesEnum.box]
    | InputActivationOption
    | EventEStyleOptions
    | CompositionStyleOptions
  //TODO: the rest
}
