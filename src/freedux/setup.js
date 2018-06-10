import { dispatch } from 'freeky/interpret'
import { StoreType, storeToFuture } from './store'
import { TimeoutType, timeoutToFuture } from './timeout'
import Future from 'data.task'

export const interpretAsFuture = (store, dispatchToStore) => dispatch([
  [StoreType, storeToFuture(dispatchToStore, () => store)],
  [TimeoutType, timeoutToFuture]
])

export const interpretAsMiddleware = interpret => effects => store => next => action => {
  const eff = effects(action)
  eff.foldMap(interpret(store, next), Future.of).fork(_ => { }, _ => { })
}
