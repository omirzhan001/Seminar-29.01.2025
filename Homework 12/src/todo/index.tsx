import React, { useReducer, useState } from 'react';

const initialState = {
  todos: [],
};


function reducer(state, action) {
  switch (action.type) {
    case 'add_todo':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case 'toggle_todo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'clear_completed':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
}


function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');


  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'add_todo', payload: inputValue });
      setInputValue('');
    }
  };


  const handleToggleTodo = id => {
    dispatch({ type: 'toggle_todo', payload: id });
  };


  const handleClearCompleted = () => {
    dispatch({ type: 'clear_completed' });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Todo List</h1>
      <div className='input-group mb-3' style={{ marginBottom: '10px' }}>
        <input
       className="form-control"
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKey Press={e => e.key === 'Enter' && handleAddTodo()}
          style={{ padding: '5px', marginRight: '5px' }}
          placeholder="Enter a new task"
        />
        <button 
        className='btn btn-outline-primary mb-3 mt-2'
        onClick={handleAddTodo} style={{ padding: '5px 10px' }}>
          Add Todo
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {state.todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => handleToggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              padding: '5px',
              backgroundColor: '#f0f0f0',
              marginBottom: '5px',
              borderRadius: '3px',
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <button
        className='btn btn-outline-danger'
        onClick={handleClearCompleted}
        style={{ padding: '5px 10px', marginTop: '10px' }}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default TodoList;