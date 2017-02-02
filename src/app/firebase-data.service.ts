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
  updateTodo(todo) {
      let key = todo.$key;
      let updatedTodo = JSON.parse(JSON.stringify(todo));
      delete updatedTodo.$exists;
      delete updatedTodo.$key;
      this.todoList.update(key, updatedTodo);
  }
  getList() {
    return this.todoList;
  }

}
