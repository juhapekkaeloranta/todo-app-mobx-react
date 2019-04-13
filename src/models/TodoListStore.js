import { observable, computed, action } from "mobx";
import TodoModel from "./TodoModel";
import { getTable, insertIntoTable } from "../store/indexedb";

const getInitialTodos = async () => {
  return []
}

const getStoreTodos = async () => {
  const table = await getTable("todos")
  console.log("--table:", table)
  return table
}

console.log("store:", getStoreTodos())

export default class TodoListStore {
  @observable todos = getInitialTodos();

  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action
  async addTodo(title) {
    //testload()
    
    /*insertIntoTable("todos", { title: title } ).then((todo) => {
      console.log("created:", todo)
    })*/
    const temp = await getTable("todos")
    console.log(temp)

    this.todos.push(new TodoModel(title));
  }
}