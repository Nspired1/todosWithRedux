import React from "react";
import AddTodo from "./components/AddTodo";
import VisibleTodoList from "./components/VisibleTodoList";
import Footer from "./components/Footer";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// todo list "app" component
const TodoApp = () => (
  <div className="container">
    <h1>Todo List with Redux</h1>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default TodoApp;
