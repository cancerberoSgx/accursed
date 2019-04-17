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
        height: props.height || '99%',
        width: props.width || '95%',
        renderer: props.renderer || renderer
      }}>
      {props.children}
    </layout>
  )
}

interface PPP<T> {
  ffj: T
  ref: string[][]
}
type PropsWithRef<P> = P & { ref?: P extends { ref?: infer R } ? R : undefined }
let t: PropsWithRef<PPP<number>>
// t.ref

// /** Ensures that the props do not include ref at all */
// type PropsWithoutRef<P> =
//     // Just Pick would be sufficient for this, but I'm trying to avoid unnecessary mapping over union types
//     // https://github.com/Microsoft/TypeScript/issues/28339
//     'ref' extends keyof P
//     ? Pick<P, Exclude<keyof P, 'ref'>>
//     : P
// /** Ensures that the props do not include string ref, which cannot be forwarded */
// type PropsWithRef<P> =
//     // Just "P extends { ref?: infer R }" looks sufficient, but R will infer as {} if P is {}.
//     'ref' extends keyof P
//     ? P extends { ref?: infer R }
//     ? string extends R
//     ? PropsWithoutRef<P> & { ref?: Exclude<R, string> }
//     : P
//     : P
//     : P
