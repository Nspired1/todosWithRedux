import { combineReducers } from "redux";
import todos from "./todosReducer";
import visibilityFilter from "./visibilityFilterReducer";

//todoApp is the root reducer, not a todo list app
const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

export default todoApp;
