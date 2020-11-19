import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
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

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnMount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const { store } = props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter: props.filter,
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

const Footer = ({ store }) => (
  <p>
    Show:{" "}
    <FilterLink filter="SHOW_ALL" store={store}>
      All
    </FilterLink>{" "}
    <FilterLink filter="SHOW_ACTIVE" store={store}>
      Active
    </FilterLink>{" "}
    <FilterLink filter="SHOW_COMPLETED" store={store}>
      Completed
    </FilterLink>{" "}
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

const AddTodo = ({ store }) => {
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
          store.dispatch({
            type: "ADD_TODO",
            id: nextTodoId++,
            text: input.value,
          });
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

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

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnMount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const { store } = props;
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={(id) =>
          store.dispatch({
            type: "TOGGLE_TODO",
            id,
          })
        }
      />
    );
  }
}

// todo list "app" component
let nextTodoId = 0;
const TodoApp = ({ store }) => (
  <div>
    <h1>Todo List with Redux</h1>
    <AddTodo store={store} />
    <VisibleTodoList store={store} />
    <Footer store={store} />
  </div>
);

// store is a single object that holds the data (state) for the entire application.
// takes in the root reducer and Redux dev tools
// const store = createStore(
//   todoApp,

// );

ReactDOM.render(
  <TodoApp
    store={createStore(
      todoApp,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  />,
  document.getElementById("root")
);
