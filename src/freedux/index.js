import daggy from 'daggy'
import { StoreType, dispatchF, getStateF, storeToFuture } from './store'
import { interpretAsFuture, interpretAsMiddleware } from './setup'
import { TimeoutType, setTimeoutF, timeoutToFuture } from './timeout'


const UnitType = daggy.taggedSum('Unit', { Unit: [] })
export const { Unit } = UnitType

export default {
  StoreType,
  TimeoutType,
  dispatchF,
  getStateF,
  setTimeoutF,
  storeToFuture,
  timeoutToFuture,
  interpretAsFuture,
  interpretAsMiddleware
}