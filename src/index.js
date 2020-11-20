const { render } = require("react-dom");
import React, { Component } from "react";
import { store } from "redux";
import todoApp from "./reducers/rootReducer";

const presistedState = {
  todos: [
    {
      id: "0",
      text: "Welcome back!",
      completed: false,
    },
  ],
  visibilityFilter: undefined,
};

const store = createStore(
  todoApp,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log(store.getState());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
