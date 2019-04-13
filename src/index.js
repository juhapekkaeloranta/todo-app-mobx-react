import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
//import PlainObservableTodoStore from "./models/PlainObservableTodoStore";
import IDBObservableTodoStore from "./store/IDBObservableTodoStore"

const store = new IDBObservableTodoStore();

store.fetchTodos()

const showStore = () => {
  console.log(store.todos)
}

render(
  <div>
    <DevTools />
    <TodoList store={store} />
    <button onClick={() => showStore()}>Print todos</button>
  </div>,
  document.getElementById("root")
);