import { observable } from "mobx";

export default class TodoModel {
  id = Math.random();
  @observable title;
  @observable finished;

  constructor(title) {
    this.title = title;
    this.finished = false
  }
}