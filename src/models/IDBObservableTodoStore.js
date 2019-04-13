import { observable, action, computed } from 'mobx'
import TodoModel from './TodoModel';
import { task } from 'mobx-task'
import { getTable, insertIntoTable } from '../store/indexedb';

export default class IDBObservableTodoStore {
  @observable todos = []

  @task async fetchTodos () {
    await getTable('todos')
      .then(action(todos => this.todos.replace(todos)))
    }

  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action
  async addTodo(title) {
    const newTodo = await insertIntoTable('todos', new TodoModel(title))
    console.log("new todo:", newTodo)
    this.todos.push(newTodo)
  }
}