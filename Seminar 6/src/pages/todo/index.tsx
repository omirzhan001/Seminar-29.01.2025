import { useReducer, useState } from "react";

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "add_todo":
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
      };
    case "toggle_todo":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "clear_completed":
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
}

export default function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() !== "") {
      dispatch({ type: "add_todo", payload: text });
      setText("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-2">Todo List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded-l"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {state.todos.map(todo => (
          <li
            key={todo.id}
            className={`p-2 cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
            onClick={() => dispatch({ type: "toggle_todo", payload: todo.id })}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <button
        className="mt-4 bg-red-500 text-white p-2 w-full rounded"
        onClick={() => dispatch({ type: "clear_completed" })}
      >
        Clear Completed
      </button>
    </div>
  );
}