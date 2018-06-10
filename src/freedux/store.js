import Future from 'data.task'
import daggy from 'daggy'
import { liftF } from 'freeky'

export const StoreType = daggy.taggedSum('Store', { GetState: [], Dispatch: ['action'] })
export const { GetState, Dispatch } = StoreType
export const dispatchF = a => liftF(Dispatch(a))
export const getStateF = liftF(GetState)

export const storeToFuture = (dispatchToStore, getState) => s => Future.of(s.cata({
  GetState: () => getState(),
  Dispatch: (a) => dispatchToStore(a)
}))

export default {
  StoreType,
  dispatchF,
  getStateF,
  storeToFuture
}