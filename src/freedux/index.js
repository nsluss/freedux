import daggy from 'daggy'
import { StoreType, dispatchF, getStateF, storeToFuture } from './store'
import { interpretAsFuture, interpretAsMiddleware } from './setup'
import { TimeoutType, setTimeoutF, timeoutToFuture } from './timeout'
import { FetchType, fetchF, fetchToFuture } from './fetch'


const UnitType = daggy.taggedSum('Unit', { Unit: [] })
export const { Unit } = UnitType

export default {
  StoreType,
  TimeoutType,
  FetchType,
  fetchF,
  dispatchF,
  getStateF,
  setTimeoutF,
  fetchToFuture,
  storeToFuture,
  timeoutToFuture,
  interpretAsFuture,
  interpretAsMiddleware
}