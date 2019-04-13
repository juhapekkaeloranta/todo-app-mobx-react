import { observable, action, computed } from 'mobx'
import TodoModel from './TodoModel';
import { task } from 'mobx-task'
import { getTable } from '../store/indexedb';

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
    this.todos.push(new TodoModel(title));
  }
}