import React from "react";
import Collapsible from "./Collapsible";

const Instructions = () => (
  <>
    <h2>To-do List</h2>
    <Collapsible>
      <span>Create a to-do list</span>
      <span>Click on each item to remove item from list</span>
    </Collapsible>
  </>
);

type Todo = {
  key: string;
  value: string;
};

const App = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [task, setTask] = React.useState<string>("");

  const handleAddTodo = () => {
    const uuid = crypto.randomUUID();
    setTodos([...todos, { key: uuid, value: task }]);
    setTask("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setTask(val);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleRemove = (toBeRemovedKey: string) => {
    const newTodos = todos.filter((todo) => todo.key !== toBeRemovedKey);
    setTodos(newTodos);
  };

  return (
    <>
      <input
        value={task}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      ></input>
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.key}>
              <button
                type="button"
                onClick={() => handleRemove(todo.key)}
                aria-label={`Remove ${todo.value}`}
              >
                {todo.value}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const TodoList = () => {
  return (
    <div id="todo-list" className="container">
      <Instructions />
      <App />
    </div>
  );
};

export default TodoList;
