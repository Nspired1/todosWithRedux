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

export default todo;
