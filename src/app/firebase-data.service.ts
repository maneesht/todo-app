import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseAuthService } from './auth/firebase-auth';

import { Observable } from 'rxjs/observable';

@Injectable()
export class FirebaseDataService {
  private todoList: FirebaseListObservable<any[]>;
  private userTodo: FirebaseObjectObservable<any[]>;
  constructor(private af: AngularFire, private auth: FirebaseAuthService) {
    this.todoList = af.database.list('/todos');
  }
  addTodo(todo: any): firebase.database.ThenableReference{
    return this.todoList.push(todo);
  }
  addUserTodo(key: string) {
    this.auth.getAuth().take(1).subscribe((auth) => {
      this.af.database.list(auth.uid + "/todos").push(key);
    });
  }
  lookUpTodo(key: string) {
    let observable = this.todoList.flatMap((data) => data.filter((d) => d.$key === key));
    return observable;
  }
  getUserTodoList(){
    return this.auth.getAuth().switchMap((auth) => this.af.database.list(auth.uid + "/todos"));
  }
  findUserTodo(todo) {
    return this.getUserTodoList().map(todos => todos.filter(todo => todo.$value === todo.$key));
  }
  removeTodoFromUser(todo: any) {
    delete todo['remove'];
    this.auth.getAuth().subscribe((auth) => {
      let observable = this.af.database.list(auth.uid + "/todos");
      observable.take(1).subscribe((todos) => {
        todos.forEach((todoItem) => {
          if(todoItem['$value'] === todo.$key) {
            observable.remove(todoItem.$key);
          }
        })
      });
    });
  }
  removeTodo(todo) {
    return this.todoList.remove(todo.$key);
  }
  findTodo(todoItem: any) {
    return this.todoList.flatMap(todos => todos.filter((todo: any) => {return todo.title === todoItem.title}));
  }
  update(todo: any, $key: string) {
    let key = $key;
    let updatedTodo = Object.assign({}, todo);
    delete updatedTodo.$exists;
    delete updatedTodo.$key;
    return this.todoList.update(key, updatedTodo);
  }
  updateTodo(todo: any) {
    return this.update(todo, todo.$key);
  }
  getList() {
    return this.todoList;
  }

}
