import { observable, computed, action } from "mobx";
import TodoModel from "./TodoModel";

export default class PlainObservableTodoStore {
  @observable todos = []

  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action
  async addTodo(title) {
    this.todos.push(new TodoModel(title));
  }
}