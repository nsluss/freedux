import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';


export const newTodo = () => ({
  type: "NEW_TODO",
  name: "some todo item"
})

const App = ({ store, dispatch }) => {
  console.log(dispatch)
  return <div className="App">
    <div>{JSON.stringify(store)}</div>
    <button onClick={() => dispatch(newTodo())}>click me!</button>
  </div>
}
export default connect(store => ({ store }), dispatch => ({ dispatch }))(App);
