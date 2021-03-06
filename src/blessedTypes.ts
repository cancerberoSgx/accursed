import * as contrib from 'blessed-contrib'
import * as blessed from './declarations/blessed'
import { BlessedProgram } from './declarations/blessedProgram'
import { RemoveProperties } from './util/misc'

export type Node = blessed.Widgets.Node
export type Box = blessed.Widgets.BoxElement
export type Line = blessed.Widgets.LineElement

export type Element<Options extends ElementOptions = ElementOptions> = blessed.Widgets.BlessedElement<Options>
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
export type Prompt = blessed.Widgets.PromptElement
export type Textbox = blessed.Widgets.TextboxElement
export type RadioSet = blessed.Widgets.RadioSetElement
export type RadioButton = blessed.Widgets.RadioButtonElement
export type Log = blessed.Widgets.Log
export type Terminal = blessed.Widgets.TerminalElement
export type Question = blessed.Widgets.QuestionElement

export type LogOptions = RemoveProperties<blessed.Widgets.LogOptions, 'children'>
export type PromptOptions = RemoveProperties<blessed.Widgets.PromptOptions, 'children'>
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
export type ScreenOptions = RemoveProperties<blessed.Widgets.IScreenOptions, 'children'>
export type TerminalOptions = RemoveProperties<blessed.Widgets.TerminalOptions, 'children'>
export type QuestionOptions = RemoveProperties<blessed.Widgets.QuestionOptions, 'children'>

export type PositionCoords = blessed.Widgets.PositionCoords

export type IMouseEventArg = blessed.Widgets.Events.IMouseEventArg
export type NodeMouseEventType = blessed.Widgets.NodeMouseEventType
export type NodeScreenEventType = blessed.Widgets.NodeScreenEventType
export type IKeyEventArg = blessed.Widgets.Events.IKeyEventArg
export type INodeGenericEventArg = blessed.Widgets.Events.INodeGenericEventArg

export type NodeEventType = blessed.Widgets.NodeEventType
export type NodeGenericEventType = blessed.Widgets.NodeGenericEventType

export type Border = blessed.Widgets.Types.TBorder
export type Style = blessed.Widgets.Types.TStyle
export type Color = blessed.Widgets.Color
export type Position = blessed.Widgets.Types.TPosition
export type TopLeft = blessed.Widgets.Types.TTopLeft
export type ListElementStyle = blessed.Widgets.ListElementStyle
export type Program = BlessedProgram

export type Markdown = contrib.Widgets.MarkdownElement
export type MarkdownOptions = contrib.Widgets.MarkdownOptions

// export const colorsTerminal = blessed.colors.colorNames
export type BlessedElementOptionsUnion = BoxOptions | TextOptions | TextareaOptions | ListTableOptions | ListOptions
export type BlessedElementOptionsIntersection = BoxOptions &
  TextOptions &
  TextareaOptions &
  ListTableOptions &
  ListOptions

/** isElement type guard without type parameters */
export function isElement(n: any): n is Element {
  return !!n && !!n.removeLabel && !!n.disableDrag && !!n.setContent && !!n.getScreenLines
}

/** isElement type guard that cast to a concrete type by without really asserting on the concrete type - use only if sure */
export function isElementUnSafe<E extends Element = Element>(n: any): n is E {
  return n && n.removeLabel && n.disableDrag && n.setContent && n.getScreenLines
}

export function isScreen(n: any): n is Screen {
  return isNode(n) && n.type === 'screen' //!!(n as Screen).setEffects
}

/** isNode type guard without type parameters */
export function isNode(n: any): n is Node {
  return n && n.insertBefore && n.forDescendants
}

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
