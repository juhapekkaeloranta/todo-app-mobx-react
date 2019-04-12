import { observable, computed, action } from "mobx";
import TodoModel from "./TodoModel";
import { getTable, insertIntoTable } from "../store/indexedb";

const getInitialTodos = () => {
  return []
}

const getStoreTodos = async () => {
  return await getTable("todos")
}

console.log(getStoreTodos())

export default class TodoListStore {
  @observable todos = getInitialTodos();

  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action
  addTodo(title) {
    //testload()
    
    insertIntoTable("todos", { title: title } ).then((todo) => {
      console.log("created:", todo)
    })

    this.todos.push(new TodoModel(title));
  }
}