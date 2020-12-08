import { createStore } from "redux";
import { loadState, saveState } from "./localStorage";
import todoApp from "./reducers/rootReducer";
import throttle from "lodash/throttle";

// store is a single object that holds the data (state) for the entire application.
// takes in the root reducer, an optional previous state, and Redux dev tools

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    todoApp,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(
    throttle(() => {
      saveState({
        todos: store.getState().todos,
      });
    }, 1000)
  );

  return store;
};

export default configureStore;
