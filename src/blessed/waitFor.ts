import { Element, Screen, isScreen } from '../blessedTypes';
import { findDescendant } from '..';
import { sleep } from '../../spec/blessedTestUtil';

// tools for wait  (pooling) until a element has some state - mostly for testing... 

interface WaitForPredicateOptions {
  interval?: number;
  timeout?: number;
  timeoutError?: string;
}

const defaultOptions: WaitForPredicateOptions = { interval: 200, timeout: 3000 }
export async function waitForPredicate<T=boolean>(p: (...args: any[]) => T|undefined, options: WaitForPredicateOptions|string = { interval: 200, timeout: 3000 }): Promise<T> {
  const o = typeof options == 'string' ? {...defaultOptions, timeoutError: options} : options as WaitForPredicateOptions
  const t = setTimeout(() => {
    const msg = o.timeoutError||  p.toString().substring(0, Math.min(p.toString().length, 100))
    throw new Error(msg);
  }, o.timeout || 3000);
  let r:T|undefined
  while (!(r=p())) {
    await sleep(o.interval || 200);
  }
  t && clearTimeout(t);
  return r
}

export {waitForPredicate as waitFor}

export function isAttached(e: Element, to?: Screen) {
  const s = findDescendant<Screen>(e, isScreen);
  if (s) {
    return !s.destroyed && to ? to == s : true;
  }
  return false;
}
export async function waitForAttached(e: Element, options: WaitForPredicateOptions = { interval: 200, timeout: 3000 }) {
  return await waitForPredicate(isAttached, options);
}
export async function waitForRender(e: Element, options: WaitForPredicateOptions = { interval: 200, timeout: 3000 }) {
  const t = setTimeout(() => {
    throw new Error(options.timeoutError || 'waitForRender timeout');
  }, options.timeout || 3000);
  await waitForAttached(e);
  const listener = () => { };
  e.on('render', (a, b) => {
    e.off('render', listener);
  });
}
