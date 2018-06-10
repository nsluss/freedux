import daggy from 'daggy'
import { liftF } from 'freeky'
import { dispatch } from 'freeky/interpret'
import Future from 'data.task'

export const interpretAsMiddleware = interpret => effects => store => next => action => {
  const eff = effects(action)
  eff.foldMap(interpret(store, next), Future.of).fork(_ => { }, _ => { })
}

export const interpretAsFuture = (store, dispatchToStore) => dispatch([
  [StoreType, storeToFuture(dispatchToStore, () => store)],
  [TimeoutType, timeoutToFuture]
])

export const StoreType = daggy.taggedSum('Store', { GetState: [], Dispatch: ['action'] })
export const { GetState, Dispatch } = StoreType
export const dispatchF = a => liftF(Dispatch(a))
export const getStateF = liftF(GetState)

const storeToFuture = (dispatchToStore, getState) => s => Future.of(s.cata({
  GetState: () => getState(),
  Dispatch: (a) => dispatchToStore(a)
}))

const UnitType = daggy.taggedSum('Unit', { Unit: [] })
export const { Unit } = UnitType
export const TimeoutType = daggy.taggedSum('Timeout', { SetTimeout: ['interval', 'fn'] })
const { SetTimeout } = TimeoutType
export const setTimeoutF = (i, f) => liftF(SetTimeout(i, f))
const timeoutToFuture = t => new Future((rej, res) => t.cata({ SetTimeout: (i, f) => setTimeout(() => res(f()), i) }))
