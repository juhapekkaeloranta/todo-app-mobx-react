import { observable } from "mobx";

export default class TodoModel {
  @observable title;
  @observable finished;

  constructor(title) {
    this.title = title;
    this.finished = false
  }
}