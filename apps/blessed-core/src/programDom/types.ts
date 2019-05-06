import { BorderStyle } from '../util/border'
import { ProgramElement } from './programElement'
import { Color } from './styleProps'

export abstract class AbstractPropsImpl implements AbstractProps {
  abstract getObject(): {
    [a: string]: any;
  }
  extend<P extends AbstractProps = AbstractProps>(p: P): void {
    Object.assign(this, p)
  }
}
export interface Padding {
  top: number
  left: number
  right: number
  bottom: number
}
export interface AbstractProps {
}
export interface StyleProps extends AbstractProps {
  bg?: Color
  fg?: Color
  ch?: string
  bold?: boolean
  underline?: boolean
  standout?: boolean
  blink?: boolean
  invisible?: boolean
}
export interface BorderProps extends StyleProps {
  type?: BorderStyle
}
export interface ElementProps extends StyleProps {
  width?: number
  height?: number
  /**
   * top coordinate (row number), relative to the parent.
   */
  top?: number
  /**
   * left coordinate (column number), relative to the parent.
   */
  left?: number
  
  /**
   * TODO not implemented yet
   */
  padding?: Padding

  /**
   * if defined, a 1-sized outer wrapper will be added in all size calculations and a border will be drawn. 
   * This means the inner (content) dimension is not affected.
   */
  border?: BorderProps
  /**
   * Called by the renderer just after rendering this element. It's children were not yet rendered and will be
   * next.
   *
   * This gives Element subclasses the chance to change some props, or it's children just before rendering.
   */
  afterRenderWithoutChildren?(): void
  /**
   * Called by the rendered just after the element all all its children were rendered.
   *
   * This gives Element subclasses the chance to change some props, or it's children just before rendering.
   */
  afterRender?(): void
  /**
   * Called by the renderer just before rendering this element. It's children will follow.
   *
   * This gives Element subclasses the chance to change some props, or it's children just before rendering.
   */
  beforeRender?(): void
  /**
   * Called by  `Flor.render()` after all children ProgramElement instances are created and appended to this
   * node.
   *
   * If truthy value is returned it will prevent the default implementation to execute. Currently the layout
   * calculation for children is done here so it can be prevented by returning true. 
   */
  childrenReady(): boolean

}

export interface FullProps extends ElementProps {
  tagName?: string
  parent?: ProgramElement
  children?: (ElementProps | ProgramElement | string)[]
}
