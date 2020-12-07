import todoReducer from "./todoReducer";

// todo list reducer
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todoReducer(undefined, action)];
    case "TOGGLE_TODO":
      //map function is calling the todo reducer imported above
      return state.map((todoItem) => todoReducer(todoItem, action));
    // delete needs to delegate down to todo
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    // return {
    //   todos: [...state.todos.filter((todo) => todo._id !== action.id)],
    // };

    default:
      return state;
  }
};

export default todosReducer;
