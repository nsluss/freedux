import reducer from './reducer';
import { newTodo } from './actions';

describe('newTodo', () => {
  it('should add a new item to the todo list', () => {
    //given
    const initialState = { todoItems: [] }
    const action = newTodo('some todo item')
    //when
    const result = reducer(initialState, action)
    //then
    const expected = { todoItems: ["some todo item"] }
    expect(result).toEqual(expected)
  })
})

describe('gotData', () => {
  it('should add data to the store', () => {
    //given
    const initialState = { posts: [] }
    const action = { type: 'GOT_DATA', data: [{ title: 'some', body: 'data' }] }
    //when
    const result = reducer(initialState, action)
    //then
    const expected = { posts: [{ title: 'some', body: 'data' }] }
    expect(result).toEqual(expected)
  })
})
