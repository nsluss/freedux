import daggy from 'daggy'
import { liftF } from 'freeky'
import Future from 'data.task'

export const TimeoutType = daggy.taggedSum('Timeout', { SetTimeout: ['interval', 'fn'] })
const { SetTimeout } = TimeoutType
export const setTimeoutF = (i, f) => liftF(SetTimeout(i, f))
export const timeoutToFuture = t => new Future((rej, res) => t.cata({ SetTimeout: (i, f) => setTimeout(() => res(f()), i) }))

export default {
  TimeoutType,
  setTimeoutF,
  timeoutToFuture
}
