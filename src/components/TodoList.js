import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, onTodoClick, onTodoDeleteClick }) => (
  <ul>
    {todos.map((todo) => (
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
        onDelete={() => onTodoDeleteClick(todo.id)}
      />
    ))}
  </ul>
);

export default TodoList;
