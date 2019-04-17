import { Element, Screen, isScreen } from '../blessedTypes';
import { findDescendant } from '..';
import { sleep } from '../../spec/blessedTestUtil';

// tools for wait  (pooling) until a element has some state - mostly for testing... 

interface WaitForPredicateOptions {
  interval?: number;
  timeout?: number;
  timeoutError?: string;
}
export async function waitForPredicate(p: (...args: any[]) => boolean, options: WaitForPredicateOptions = { interval: 200, timeout: 5000 }) {
  const t = setTimeout(() => {
    throw new Error(options.timeoutError || 'waitForPredicate timeout');
  }, options.timeout || 5000);
  while (!p()) {
    await sleep(options.interval || 200);
  }
  t && clearTimeout(t);
}
export function isAttached(e: Element, to?: Screen) {
  const s = findDescendant<Screen>(e, isScreen);
  if (s) {
    return !s.destroyed && to ? to == s : true;
  }
  return false;
}
export async function waitForAttached(e: Element, options: WaitForPredicateOptions = { interval: 200, timeout: 5000 }) {
  return await waitForPredicate(isAttached, options);
}
export async function waitForRender(e: Element, options: WaitForPredicateOptions = { interval: 200, timeout: 5000 }) {
  const t = setTimeout(() => {
    throw new Error(options.timeoutError || 'waitForRender timeout');
  }, options.timeout || 5000);
  await waitForAttached(e);
  const listener = () => { };
  e.on('render', (a, b) => {
    e.off('render', listener);
  });
}
