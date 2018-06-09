import reducer from './reducer';
import { newTodo } from './App';

describe('newTodo', () => {
  it('should add a new item to the todo list', () => {
    //given
    const initialState = { todoItems: [] }
    const action = newTodo('some todo item');
    //when
    const result = reducer(initialState, action);
    //then
    const expected = { todoItems: ["some todo item"] }
    expect(result).toEqual(expected)
  })
})
