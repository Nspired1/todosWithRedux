import todo from "./todoReducer";

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

export default todos;
