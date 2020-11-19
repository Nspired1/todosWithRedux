import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import todoApp from "./reducers/rootReducer";
//import PropTypes from "prop-types";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
//import todoApp from "./reducers/rootReducer";

//====== action creators =======//
let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: "ADD_TODO",
    id: nextTodoId++,
    text,
  };
};

const setVisibilityFilter = (filter) => {
  return {
    type: "SET_VISIBILITY_FILTER",
    filter,
  };
};

const toggleTodo = (id) => {
  return {
    type: "TOGGLE_TODO",
    id,
  };
};

//======= React Components below ==============//

// component shows which todos are displayed based on status
const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

const mapStateToLinkProps = (state, ownProps) => {
  return { active: ownProps.filter === state.visibilityFilter };
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>{" "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{" "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>{" "}
  </p>
);

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none",
    }}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo) => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input
        ref={(node) => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

AddTodo = connect(null, null)(AddTodo);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter((t) => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter((t) => !t.completed);
  }
};

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => dispatch(toggleTodo(id)),
  };
};
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

// todo list "app" component

const TodoApp = () => (
  <div>
    <h1>Todo List with Redux</h1>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

// store is a single object that holds the data (state) for the entire application.
// takes in the root reducer and Redux dev tools
// const store = createStore(
//   todoApp,

// );

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
