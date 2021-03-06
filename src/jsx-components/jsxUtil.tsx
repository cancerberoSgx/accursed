import { asArray } from 'misc-utils-of-mine-generic'
import { renderer } from '../blessed/layoutRenderer'
import { Layout, LayoutOptions } from '../blessedTypes'
import { React } from '../jsx/createElement'
import { EventOptions } from '../jsx/types'

/** to be used inside layout renderer like [[Div]] */
export function Br(props: {}) {
  return (
    <text
      style={{
        //@ts-ignore
        display: 'block'
      }}
      content=""
    />
  )
}

export function NbrSpc(props: {}) {
  return <text content=" " />
}

export function Strong(props: { children?: string | string[]; color?: string }) {
  return <text tags={true} content={`{bold}${asArray(props.children || []).join(' ')}{/bold}`} />
}

/** will use layout with [[renderer]] */
export function Div(
  props: {
    children?: any
  } & Partial<LayoutOptions> &
    Partial<EventOptions<Layout>>
) {
  return (
    <layout
      {...{
        ...props,
        children: undefined,
        height: props.height || '100%',
        width: props.width || '100%',
        renderer: props.renderer || renderer
      }}>
      {props.children}
    </layout>
  )
}
