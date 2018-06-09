import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';


export const newTodo = () => ({
  type: "NEW_TODO",
  name: "some todo item"
})

const App = ({ store = {}, dispatch }) => {
  const todos = store.todoItems || []
  return <div className="App">
    <div>
      <h2>state:</h2>
      <h3>todos:</h3>
      <button onClick={() => dispatch(newTodo())}>click me!</button>
      <ul>
        {todos.map(x => <li>{x}</li>)}
      </ul>
    </div>

  </div>
}
export default connect(store => ({ store }), dispatch => ({ dispatch }))(App);
