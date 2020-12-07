import TodoList from "./TodoList";
import { connect } from "react-redux";
import { toggleTodo, deleteTodo } from "../actions";

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
    onTodoDeleteClick: (todoItem) => dispatch(deleteTodo(todoItem)),
  };
};

const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

export default VisibleTodoList;
