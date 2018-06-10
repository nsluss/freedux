export const newTodo = name => ({
  type: "NEW_TODO",
  name
})

export const asyncTodo = name => ({
  type: 'ASYNC_TODO',
  name
})