import { effects } from './middleware'
import { interpretAsMiddleware, StoreType, TimeoutType, Dispatch, GetState, setTimeout } from './freedux'
import daggy from 'daggy'
import { dispatch } from 'freeky/interpret'
import Future from 'data.task'

const storeToFuture = (dispatchToStore, getState) => s => Future.of(s.cata({
  GetState: () => getState(),
  Dispatch: a => dispatchToStore(a)
}))

const timeoutToFuture = t => Future.of(t.cata({
  SetTimeout: (_, f) => f()
}))

const interpretFake = (store, dispatchToStore) => dispatch([
  [StoreType, storeToFuture(dispatchToStore, () => store)],
  [TimeoutType, timeoutToFuture]
])


const middleware = interpretAsMiddleware(interpretFake)(effects)

describe('middleware', () => {
  it('should handle async todos', () => {
    //given
    const store = { actions: [] }
    const next = (x) => store.actions.push(x)
    const action = { type: 'ASYNC_TODO', name: 'some test action' }
    //when
    const expected = [{ type: 'NEW_TODO', name: 'some test action' }]
    middleware(store)(next)(action)
    //then
    expect(store.actions).toEqual(expected)
  })
  it('should pass actions along', () => {
    //given
    const store = { actions: [] }
    const next = (x) => store.actions.push(x)
    const action = { type: 'NEW_TODO', name: 'some test action' }
    //when
    const expected = [action]
    middleware(store)(next)(action)
    //then
    expect(store.actions).toEqual(expected)
  })
})

