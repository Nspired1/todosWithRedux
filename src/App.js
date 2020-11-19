import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
//import PropTypes from "prop-types";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// individual todo reducer
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      //returns state, not todo, because this is component state, not app state
      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

// todo list reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      //map function is calling the todo reducer declared above
      return state.map((todoItem) => todo(todoItem, action));
    default:
      return state;
  }
};

// todo visibility filter reducer
const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

//todoApp is the root reducer, not a todo list app
const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

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
