import { observable, computed, action } from "mobx";
import TodoModel from "../models/TodoModel";
import { task } from 'mobx-task'

/*

This is a MobX store that takes an indexedDB store as a parameter

(Dependency injection)

indexedDB store must have following functions:
- getTable('tablename': string): Array 
- insertIntoTable('tablename': string, 'newitem': Omit<id, Item>): Item

*/

export default class PersistentObservableTodoStore {
  @observable todos = []

  constructor(store) {
    this.persistentStore = store
    this.fetchTodos()
    this.persistentStore.setCreateCallback(() => this.handleStoreNewItem())
    this.persistentStore.setUpdateCallback(() => this.handleStoreUpdate())
    this.persistentStore.setDeleteCallback(() => this.handleStoreDelete())
  }

  handleStoreNewItem() {
    console.log('new item detected!')
    this.fetchTodos()
  }

  handleStoreUpdate() {
    console.log('update detected!')
    this.fetchTodos()
  }

  handleStoreDelete() {
    console.log('delete detected!')
    this.fetchTodos()
  }

  @task async fetchTodos() {
    console.log(this.persistentStore)
    await this.persistentStore.getTable('todos')
      .then(action(todos => this.todos.replace(todos)))
    }

  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action
  async addTodo(title) {
    const newTodo = await this.persistentStore.insertIntoTable('todos', new TodoModel(title))
    console.log('newTodo: ', newTodo)
    this.todos.push(newTodo);
  }
}