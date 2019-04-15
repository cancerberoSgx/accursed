import { format } from 'ansi-escape-sequences'
import { asArray } from 'misc-utils-of-mine-generic'
import { notUndefined } from '../../util/misc'
import { LayoutOptions } from '../blessedTypes'
import { React } from '../jsx/createElement'
import { renderer } from '../layoutRenderer'

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
  return (
    <text
      content={format(asArray(props.children || []).join(' '), ['bold', props.color].filter(notUndefined) as any)}
    />
  )
}

export function Div(
  props: {
    children?: any
  } & LayoutOptions
) {
  return (
    <layout
      {...{ ...props, children: undefined, height: props.height || '99%', width: props.width || '95%' }}
      renderer={renderer}>
      {props.children}
    </layout>
  )
}
