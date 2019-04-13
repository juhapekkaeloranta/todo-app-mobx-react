import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import PersistentObservableTodoStore from './store/persistentObservableStore';
import dexieStore from "./store/dexieStore";

const pstore = new PersistentObservableTodoStore(new dexieStore())

//const store = new IDBObservableTodoStore(new fooStore());
//store.fetchTodos()

const showStore = () => {
  console.log(pstore.todos)
}

render(
  <div>
    <DevTools />
    <TodoList store={pstore} />
    <button onClick={() => showStore()}>Print todos</button>
  </div>,
  document.getElementById("root")
);