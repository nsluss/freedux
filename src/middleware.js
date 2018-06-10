import freedux from './freedux'
import { Monad } from 'freeky'
import { newTodo } from './actions'

const { dispatchF, Unit, setTimeoutF, interpretAsFuture, interpretAsMiddleware, fetchF } = freedux

export const effects = action => {
  switch (action.type) {
    case 'ASYNC_TODO':
      return handleAsyncTodo(action)
    case 'FETCH_POSTS':
      return handleFetchPosts()
    default:
      return handleDefault(action)

  }
}

const handleFetchPosts = action => Monad.do(function* () {
  const data = yield fetchF('https://jsonplaceholder.typicode.com/posts')
  yield dispatchF({ type: 'GOT_DATA', data: data })
  return Monad.of(Unit)
})

const handleDefault = action => Monad.do(function* () {
  yield dispatchF(action)
  return Monad.of(Unit)
})

const makeTodoAsync = (name) => setTimeoutF(5000, () => newTodo(name))

const handleAsyncTodo = action => Monad.do(function* () {
  const newAction = yield makeTodoAsync(action.name)
  yield dispatchF(newAction)
  return Monad.of(Unit)
})

const middleware = interpretAsMiddleware(interpretAsFuture)(effects)

export default middleware
