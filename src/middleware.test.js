import { effects } from './middleware'
import freedux from './freedux'
import daggy from 'daggy'
import { dispatch } from 'freeky/interpret'
import Future from 'data.task'

const { interpretAsMiddleware, StoreType, TimeoutType, FetchType, Dispatch, GetState, SetTimeout } = freedux

const storeToFuture = (dispatchToStore, getState) => s => Future.of(s.cata({
  GetState: () => getState(),
  Dispatch: a => dispatchToStore(a)
}))

const timeoutToFuture = t => Future.of(t.cata({
  SetTimeout: (_, f) => f()
}))

const fetchToFuture = data => f => Future.of(f.cata({
  Fetch: (url, opts) => data[url]
}))

const interpretFake = data => (store, dispatchToStore) => dispatch([
  [StoreType, storeToFuture(dispatchToStore, () => store)],
  [TimeoutType, timeoutToFuture],
  [FetchType, fetchToFuture(data)]
])


describe('middleware', () => {
  it('should handle async todos', () => {
    //given
    const store = { actions: [] }
    const next = (x) => store.actions.push(x)
    const action = { type: 'ASYNC_TODO', name: 'some test action' }
    const middleware = interpretAsMiddleware(interpretFake({}))(effects)
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
    const middleware = interpretAsMiddleware(interpretFake({}))(effects)
    //when
    const expected = [action]
    middleware(store)(next)(action)
    //then
    expect(store.actions).toEqual(expected)
  })
  it('should fetch posts', () => {
    //given
    const store = { posts: [] }
    const next = (ps) => store.posts = store.posts.concat(ps.data)
    const action = { type: 'FETCH_POSTS' }
    const fakeResponse = [{ title: 'foo', body: 'bar' }]
    const fakeData = { 'https://jsonplaceholder.typicode.com/posts': fakeResponse }
    const middleware = interpretAsMiddleware(interpretFake(fakeData))(effects)
    //when
    const expected = { posts: fakeResponse }
    middleware(store)(next)(action)
    //then
    expect(store).toEqual(expected)
  })
})

