export const reducer = (state = { todoItems: [] }, action) => {
  switch (action.type) {
    case 'NEW_TODO':
      return {
        todoItems: state.todoItems.concat(action.name)
      }
    case 'GOT_DATA':
      const posts = state.posts || []
      return {
        todoItems: state.todoItems,
        posts: posts.concat(action.data)
      }
    default:
      return state
  }
}

export default reducer