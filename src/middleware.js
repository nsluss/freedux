import { interpretAsMiddleware, interpretAsFuture, dispatchF, setTimeoutF, Unit } from './freedux'
import { Monad } from 'freeky'
import { newTodo } from './actions'

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
  return dispatchF(newAction)
})

const middleware = interpretAsMiddleware(interpretAsFuture)(effects)

export default middleware
