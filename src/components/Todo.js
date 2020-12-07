import React from "react";

const Todo = ({ onClick, completed, text, onDelete }) => (
  <li>
    <span
      onClick={onClick}
      style={{
        textDecoration: completed ? "line-through" : "none",
      }}
    >
      {" "}
      {text}
    </span>
    <span onClick={onDelete}> X</span>
  </li>
);

export default Todo;
