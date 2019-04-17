import { notFalsy, NotFalsy } from 'misc-utils-of-mine-typescript'

/** if as statement. children need to be in a function and the function accepts a parameter which value is given condition `c` but casted to NotFalsy<C> so there's no need of type guards in the body. Example:
```
<If c={type}>{type =>
  <select multiple={true}>{names[type].map(c =>
      <option value={c.id}>{c.label}</option>)}
  </select>
</If>
```

No error thrown on second line because parameter type is not falsy but keep the original type (excluding falsy values)

Other example:

```
export class ErrorComponent extends React.Component<ErrorOptions> {
  public render() {
    return <div>
      <If c={this.props.error}>{error =>
        <React.Fragment>
          <h2>Error</h2>
          <If c={typeof error === 'string'}>{e =>
            <h3>{e}</h3>}
          </If>
          <If c={typeof error === 'object'}>{e =>
            <React.Fragment>
              <h5>{error!.name}</h5>
              <p>{error!.message}</p>
              <If c={error.stack}>{e =>
                <ul>
                  {e.split('\n').map(e =>
                    <li>{e}</li>)}
                </ul>}
              </If>
            </React.Fragment>}
          </If>
          <If c={this.props.responseText}>{responseText =>
            <iframe css={{ border: 0, width: '100%', height: '400px' }} srcDoc={responseText}>
            </iframe>}
          </If>
        </React.Fragment>}
      </If>
    </div>
  }
}

```
*/
export function If<T extends any = any>(props: { c: any; p?: T; children: (...args: NotFalsy<T>[]) => JSX.Element }) {
  // TODO: issue in dom implementation, children is an array
  const f = Array.isArray(props.children) ? props.children[0] : props.children
  const { c, p } = props
  if (notFalsy(c)) return f.apply(null, [...(p ? [p] : []), c])
  else {
    return null
  }
}
// type NotFalsy<C= any> = Exclude<C, Falsy>
// type Falsy = null | '' | undefined | false
// function isNotFalsy<T>(a: T): a is NotFalsy<T> { return !!a }

// export function getGlobal(): any {
//   // return (typeof window === 'undefined' && typeof document === 'undefined') ? global : window
//   return (typeof self !== 'undefined' && typeof self.onmessage === 'object') ? self : global
// }
// export function installJSXAloneAsGlobal(i: typeof JSXAlone) {
//   getGlobal()['JSXAlone'] = i
// }

// export function Js(props: { children: (...args: any[]) => any }) {
//   const r = props.children()
//   console.log(r)
//   return r ? {r} : null
// }
