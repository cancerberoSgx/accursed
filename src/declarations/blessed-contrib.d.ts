import * as Blessed from 'blessed'
export = BlessedContrib
declare namespace BlessedContrib {
  export type Optionals<T, K extends keyof T> = { [P in keyof K]?: T[K] }
  export type Picker<T, K extends keyof T> = { [P in K]: T[P] }

  export module Widgets {
    import IHasOptions = Blessed.Widgets.IHasOptions
    import BoxOptions = Blessed.Widgets.BoxOptions
    import ListOptions = Blessed.Widgets.ListOptions
    import Types = Blessed.Widgets.Types
    import ListElementStyle = Blessed.Widgets.ListElementStyle
    import BoxElement = Blessed.Widgets.BoxElement
    import ListElement = Blessed.Widgets.ListElement

    export interface GridOptions {
      top?: Types.TTopLeft
      left?: Types.TTopLeft
      right?: Types.TPosition
      bottom?: Types.TPosition
      rows?: number
      cols?: number
      screen: Blessed.Widgets.Screen
      border?: Blessed.Widgets.Types.TBorder
      hideBorder?: boolean
    }

    export type WidgetOptions =
      | BoxOptions
      | BarOptions
      | StackedBarOptions
      | CanvasOptions
      | TreeOptions
      | TableOptions
      | PictureOptions
      | MarkdownOptions
      | MapOptions
      | SparklineOptions
      | LogOptions
      | LcdOptions
      | GaugeOptions
      | GaugeListOptions
      | DonutOptions

    export type WidgetElements =
      | BoxElement
      | BarElement
      | LineElement
      | StackedBarElement
      | CanvasElement
      | TreeElement
      | TableElement
      | PictureElement
      | MarkdownElement
      | MapElement
      | SparklineElement
      | LogElement
      | LcdElement
      | GaugeElement
      | GaugeListElement
      | DonutElement

    export class GridElement extends BoxElement implements IHasOptions<GridOptions> {
      constructor(opts: GridOptions)

      set<T extends TreeNode>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: (options?: TreeOptions<N>) => TreeElement<T>,
        opt: TreeOptions<T>
      ): TreeElement<T>
      set<T extends (options?: TableOptions) => S, S extends TableElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: TableOptions
      ): TableElement
      set<T extends (options?: PictureOptions) => S, S extends PictureElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: PictureOptions
      ): PictureElement
      set<T extends (options?: MarkdownOptions) => S, S extends MarkdownElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: MarkdownOptions
      ): MarkdownElement
      set<T extends (options?: MapOptions) => S, S extends MapElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: MapOptions
      ): MapElement
      set<T extends (options?: LogOptions) => S, S extends LogElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: LogOptions
      ): LogElement
      set<T extends (options?: LcdOptions) => S, S extends LcdElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: LcdOptions
      ): LcdElement
      set<T extends (options?: GaugeOptions) => S, S extends GaugeElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: GaugeOptions
      ): GaugeElement
      set<T extends (options?: GaugeListOptions) => S, S extends GaugeListElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: GaugeListOptions
      ): GaugeListElement
      set<T extends (options?: DonutOptions) => S, S extends DonutElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: DonutOptions
      ): DonutElement

      set<T extends (options?: BarOptions) => S, S extends BarElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: BarOptions
      ): BarElement
      set<T extends (options?: LineOptions) => S, S extends LineElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: LineOptions
      ): LineElement
      set<T extends (options?: StackedBarOptions) => S, S extends StackedBarElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: StackedBarOptions
      ): StackedBarElement
      set<T extends (options?: CanvasOptions) => S, S extends CanvasElement>(
        row: number,
        col: number,
        rowSpan: number,
        colSpan: number,
        obj: T,
        opt: CanvasOptions
      ): CanvasElement

      // set<T extends (options?: WidgetOptions) => S, S extends WidgetElements>(row: number, col: number, rowSpan: number, colSpan: number, obj: T, opt: WidgetOptions): WidgetElements
      set<T, S>(...args: any[]): any

      // set<K extends keyof Factories>(row: number, col: number, rowSpan: number, colSpan: number,
      //     obj: T, opts?: P<T> ): P<T>
      // set<A =BarOptions, T=BarElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof bar
      // set<A =Line, T=LineElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof line
      // set<A =StackedBar, T=StackedBarElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof stackedBar
      // set<A =Canvas, T=CanvasElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof canvas
      // set<A =Tree, T=TreeElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof tree
      // set<A =Table, T=TableElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof table
      // set<A =Picture, T=PictureElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof picture
      // set<A =Markdown, T=MarkdownElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof markdown
      // set<A =Map, T=MapElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof map
      // set<A =Log, T=LogElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof log
      // set<A =Lcd, T=LcdElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof lcd
      // set<A =Gauge, T=GaugeElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof gauge
      // set<A =GaugeList, T=GaugeListElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof gaugeList
      // set<A =Donut, T=DonutElement>(row: number, col: number, rowSpan: number, colSpan: number, obj: A, opts?: O): T //typeof donut

      options: GridOptions
    }

    export interface BarData {
      titles?: string[]
      data?: number[]
    }

    export interface BarOptions extends CanvasOptions<BarData> {
      barWidth?: number
      barSpacing?: number
      xOffset?: number
      maxHeight?: number
      showText?: boolean
      barBgColor?: string
      barFgColor?: string
    }

    export class BarElement extends CanvasElement<BarData> implements IHasOptions<BarOptions> {
      constructor(opts: BarOptions)

      setData(data: BarData): void

      options: BarOptions
    }

    export interface LineData {
      title?: string
      x?: string[]
      y?: number[]
      style?: {
        line?: string
        text?: string
        baseline?: string
      }
    }

    export interface LineOptions extends CanvasOptions<LineData[]> {
      showNthLabel?: boolean
      style?: {
        line?: string
        text?: string
        baseline?: string
      }
      xLabelPadding?: number
      xPadding?: number
      numYLabels?: number
      legend?: { width: number }
      wholeNumbersOnly?: boolean
      minY?: number
      maxY?: number
      label?: string
    }

    export class LineElement extends CanvasElement<LineData[]> implements IHasOptions<LineOptions> {
      constructor(opts: LineOptions)

      options: LineOptions
    }

    export interface StackedBarData {
      barCategory?: string[]
      stackedCategory?: string[]
      data?: Array<number[]>
    }

    export interface StackedBarOptions extends CanvasOptions<StackedBarData[]> {
      barWidth?: number
      barSpacing?: number
      xOffset?: number
      maxValue?: number
      barBgColor?: string
      showLegend?: boolean
      legend?: any
      showText?: boolean
    }

    export class StackedBarElement extends CanvasElement<StackedBarData[]> implements IHasOptions<StackedBarOptions> {
      constructor(opts: StackedBarOptions)

      options: StackedBarOptions

      addLegend(bars: any, x: number): void
    }

    export interface CanvasOptions<D extends any = string> extends BoxOptions {
      canvasSize?: {
        width?: number
        height?: number
      }
      data?: TableData<D>
    }

    export class CanvasElement<D extends any = string> extends BoxElement implements IHasOptions<CanvasOptions<D>> {
      constructor(opts: CanvasOptions<D>)

      options: CanvasOptions<D>

      calcSize(): void

      setData(data: TableData<D>): void

      canvasSize: { width: number; height: number }
    }

    export interface DonutData {
      percent?: string
      label?: string
      color?: string
    }

    export interface DonutOptions extends CanvasOptions<DonutData[]> {
      stroke?: string
      fill?: string
      label?: string
      radius?: number
      arcWidth?: number
      spacing?: number
      remainColor?: string
      yPadding?: number
    }

    export class DonutElement extends CanvasElement<DonutData[]> implements IHasOptions<DonutOptions> {
      constructor(opts: DonutOptions)

      options: DonutOptions
    }

    export interface GaugeListOptions extends CanvasOptions {}

    export class GaugeListElement extends CanvasElement implements IHasOptions<GaugeListOptions> {
      constructor(opts: GaugeListOptions)

      options: GaugeListOptions
    }

    export interface GaugeOptions extends CanvasOptions {
      percent: number[]
      stroke?: string
      fill?: string
      label?: string
      stack?: any
      showLabel?: boolean
    }

    export class GaugeElement extends CanvasElement implements IHasOptions<GaugeOptions> {
      constructor(opts: GaugeOptions)

      options: GaugeOptions

      setPercent(number: number): void

      setStack(stack: Array<{ percent: number; stroke: string }>): void

      setData(percent: number[]): void
      setData(percent: number): void
    }

    export interface LcdOptions extends CanvasOptions {
      segmentWidth?: number // how wide are the segments in % so 50% = 0.5
      segmentInterval?: number // spacing between the segments in % so 50% = 0.550% = 0.5
      strokeWidth?: number // spacing between the segments in % so 50% = 0.5
      elements?: number // how many elements in the display. or how many characters can be displayed.
      display?: number // what should be displayed before first call to setDisplay
      elementSpacing?: number // spacing between each element
      elementPadding?: number // how far away from the edges to put the elements
      color?: 'white' // color for the segments
      label?: 'Storage Remaining'
    }

    export class LcdElement extends CanvasElement implements IHasOptions<LcdOptions> {
      constructor(opts: LcdOptions)

      options: LcdOptions

      increaseWidth(): void

      decreaseWidth(): void

      increaseInterval(): void

      decreaseInterval(): void

      increaseStroke(): void

      decreaseStroke(): void

      setOptions(options: any): void

      setDisplay(display: any): void
    }

    export interface LogOptions extends ListOptions<ListElementStyle> {
      border: Blessed.Widgets.Border
      bufferLength?: number
      logLines?: string[]
      interactive?: boolean
    }

    export class LogElement extends ListElement implements IHasOptions<LogOptions> {
      constructor(opts: LogOptions)

      options: LogOptions

      log(str: string): boolean

      emit(str: any): boolean
    }

    export interface MapOptions extends CanvasOptions {}

    export class MapElement extends CanvasElement implements IHasOptions<MapOptions> {
      constructor(opts: MapOptions)

      options: MapOptions
    }

    export interface SparklineOptions extends CanvasOptions<string[]> {}

    export class SparklineElement extends CanvasElement<string[]> implements IHasOptions<SparklineOptions> {
      constructor(opts: CanvasOptions)

      options: SparklineOptions

      setData(...str: any[]): void
    }

    export interface MarkdownOptions extends CanvasOptions {
      /**
       * Markdown text to render
       */
      markdown?: string

      /**
       * Custom Markdown renderer implementation, by default, marked and MarkedTerminal is used.
       */
      renderer?: (src: string) => string
    }

    export class MarkdownElement extends CanvasElement implements IHasOptions<MarkdownOptions> {
      constructor(opts: MarkdownOptions)

      options: MarkdownOptions

      setOptions(options: any): void

      setMarkdown(markdown: string): void
    }

    export interface PictureOptions extends CanvasOptions {}

    export class PictureElement extends CanvasElement implements IHasOptions<PictureOptions> {
      constructor(opts: PictureOptions)

      options: PictureOptions
    }

    export interface TableData<T extends any = string> {
      headers?: string[]
      data?: T[][]
    }

    export interface TableOptions<T extends any = string> extends CanvasOptions<T> {
      bold?: string
      columnSpacing?: number
      columnWidth?: number[]
      rows?: ListOptions<ListElementStyle>
      selectedFg?: string
      selectedBg?: string
      fg?: string
      bg?: string
      interactive?: boolean
    }

    export class TableElement extends CanvasElement<TableData> implements IHasOptions<TableOptions> {
      constructor(opts: TableOptions)

      options: TableOptions
      rows: Blessed.Widgets.ListElement & { selected?: number }
    }

    export interface TreeOptions<Node extends TreeElementNode = TreeElementNode> extends BoxOptions {
      data?: Node
      extended?: boolean
      keys?: string[]
      template?: {
        extend?: string
        retract?: string
        lines?: boolean
      }
    }

    export interface TreeElementNode {
      /**
       * Type : boolean
Desc : Determine if this node is extended
No effect when the node have no child
Default value for each node will be treeInstance.options.extended if the node extended option is not set
Example : {'Fruit':{ name: 'Fruit', extended: true, children:{ 'Banana': {}, 'Cherry': {}}}}
       */
      extended?: boolean
      /** Type : string
Desc : Node name
If the node isn't the root and you don't specify the name, will be set to hash key
Example : { name: 'Fruit'} */
      name?: string
      /**
       * Type : hash or function(node){ return children }
Desc : Node children.
The function must return a hash that could have been used as children property
If you use a function, the result will be stored in node.childrenContent and children
Example :
Hash : {'Fruit':{ name: 'Fruit', children:{ 'Banana': {}, 'Cherry': {}}}}
Function : see examples/explorer.js
       */
      children: { [name: string]: TreeNodeElement } | ((name: string) => TreeNodeElement)
      /**
 * Type : hash
Desc : Children content for internal usage DO NOT MODIFY
If node.children is a hash, node.children===node.childrenContent
If node.children is a function, it's used to store the node.children() result
You can read this property, but you should never write it.
Usually this will be used to check if(node.childrenContent) in your node.children function to generate children only once
 */
      childrenContent?: { [name: string]: any }
    }
    export class TreeElement<Node extends TreeElementNode = TreeElementNode> extends BoxElement
      implements IHasOptions<TreeOptions> {
      constructor(opts: TreeOptions)

      rows: Blessed.Widgets.ListElement & { selected?: Blessed.Widgets.BlessedElement }
      nodeLines?: Node[]
      lineNbr?: number
      data: Data

      options: TreeOptions

      /** set new data in the Tree, i.e dynamic data. call screen.render() after so UI is updated. */
      setData(data: Data): void
    }
  }

  export module widget {
    export class Grid extends Widgets.GridElement {}

    export class Bar extends Widgets.BarElement {}

    export class Line extends Widgets.LineElement {}

    export class StackedBar extends Widgets.StackedBarElement {}

    export class Canvas extends Widgets.CanvasElement {}

    export class Tree extends Widgets.TreeElement {}

    export class Table extends Widgets.TableElement {}

    export class Picture extends Widgets.PictureElement {}

    export class Markdown extends Widgets.MarkdownElement {}

    export class Map extends Widgets.MapElement {}

    export class Log extends Widgets.LogElement {}

    export class Lcd extends Widgets.LcdElement {}

    export class Gauge extends Widgets.GaugeElement {}

    export class GaugeList extends Widgets.GaugeListElement {}

    export class Donut extends Widgets.DonutElement {}

    export class Sparkline extends Widgets.SparklineElement {}
  }

  export class grid extends Widgets.GridElement {}

  export function line(options?: Widgets.LineOptions): Widgets.LineElement

  export function bar(options?: Widgets.BarOptions): Widgets.BarElement

  export function stackedBar(options?: Widgets.StackedBarOptions): Widgets.StackedBarElement

  export function canvas(options?: Widgets.CanvasOptions): Widgets.CanvasElement

  export function tree<T extends TreeNode = TreeNode>(options?: Widgets.TreeOptions<T>): Widgets.TreeElement<T>

  export function table<T extends any = string>(options?: Widgets.TableOptions<T>): Widgets.TableElement<T>

  export function picture(options?: Widgets.PictureOptions): Widgets.PictureElement

  export function markdown(options?: Widgets.MarkdownOptions): Widgets.MarkdownElement

  export function sparkline(options?: Widgets.SparklineOptions): Widgets.SparklineElement

  export function map(options?: Widgets.MapOptions): Widgets.MapElement

  export function log(options?: Widgets.LogOptions): Widgets.LogElement

  export function lcd(options?: Widgets.LcdOptions): Widgets.LcdElement

  export function gauge(options?: Widgets.GaugeOptions): Widgets.GaugeElement

  export function gaugeList(options?: Widgets.GaugeListOptions): Widgets.GaugeListElement

  export function donut(options?: Widgets.DonutOptions): Widgets.DonutElement
}
