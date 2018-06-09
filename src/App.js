import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { makeTodo } from './API'


export const newTodo = (name) => ({
  type: "NEW_TODO",
  name: name
})

const App = ({ store = {}, dispatch }) => {
  const todos = store.todoItems || []
  makeTodo("test").then((x) => console.log(x))
  return <div className="App">
    <div>
      <h2>state:</h2>
      <h3>todos:</h3>
      <button onClick={() => dispatch(newTodo('sync todo'))}>click me!</button>
      <button onClick={() => makeTodo(newTodo('async todo')).then(dispatch)}>hard to test</button>
      <ul>
        {todos.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    </div>

  </div>
}
export default connect(store => ({ store }), dispatch => ({ dispatch }))(App);
