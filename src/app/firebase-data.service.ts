import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FirebaseDataService {
  private todoList: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.todoList = af.database.list('/todos');
  }
  addTodo(todo) {
    return this.todoList.push(todo);
  }
  removeTodo(todo) {
    return this.todoList.remove(todo);
  }
  findTodo(todoItem) {
    return this.todoList.flatMap(todos => todos.filter(todo => todo.$key === todoItem.$key));
  }
  updateTodo(todo) {
      let key = todo.$key;
      let updatedTodo = Object.assign({}, todo);
      delete updatedTodo.$exists;
      delete updatedTodo.$key;
      this.todoList.update(key, updatedTodo);
  }
  getList() {
    return this.todoList;
  }

}
