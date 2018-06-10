import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { newTodo, asyncTodo } from './actions';

const App = ({ store = {}, dispatch }) => {
  console.log(store)
  const todos = store.todoItems || []
  const posts = store.posts || []
  console.log(posts)
  return <div className="App">
    <div>
      <h2>state:</h2>
      <h3>todos:</h3>
      <button onClick={() => dispatch(newTodo('sync todo'))}>click me!</button>
      <button onClick={() => dispatch(asyncTodo('async todo'))}>hard to test</button>
      <ul>
        {todos.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
      <h3>posts:</h3>
      <button onClick={() => dispatch({ type: 'FETCH_POSTS' })}>fetch data</button>
      <ul>
        {posts.map((x, i) => <li key={i}><h4>{x.title}</h4><p>{x.body}</p></li>)}
      </ul>
    </div>

  </div>
}
export default connect(store => ({ store }), dispatch => ({ dispatch }))(App);
