export const reducer = (state = { todoItems: [] }, action) => {
  switch (action.type) {
    case 'NEW_TODO':
      return {
        todoItems: state.todoItems.concat(action.name)
      }
  }
}

export default reducer