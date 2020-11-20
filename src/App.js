import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import todoApp from "./reducers/rootReducer";
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

// store is a single object that holds the data (state) for the entire application.
// takes in the root reducer, an optional previous state, and Redux dev tools

//for index.js
ReactDOM.render(
  <Provider
    store={createStore(
      todoApp,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
