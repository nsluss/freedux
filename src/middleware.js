import freedux from './freedux'
import { Monad } from 'freeky'
import { newTodo } from './actions'

const { dispatchF, Unit, setTimeoutF, interpretAsFuture, interpretAsMiddleware } = freedux

export const effects = action => {
  switch (action.type) {
    case 'ASYNC_TODO':
      return handleAsyncTodo(action)
    default:
      return handleDefault(action)

  }
}

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
