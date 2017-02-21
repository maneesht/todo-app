import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import * as fromRoot from '../../reducers';
import * as todos from '../../actions/todos';
import { TodoItem } from '../../models/todo-item';
import { FirebaseDataService } from '../../firebase-data.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Observable<TodoItem[]>;
  constructor(private store: Store<fromRoot.State>, private dataService: FirebaseDataService) {
    this.todos = store.select(state => state.todos).map(state => state.todos);
    this.store.dispatch(new todos.GetTodosAction());
  }

  addTodo(todo: TodoItem) {
    this.store.dispatch(new todos.AddTodoAction(todo));
  }
  removeTodo(todo: TodoItem) {
    this.store.dispatch(new todos.RemoveTodoAction(todo));
  }
  trackByTodo(index: number, item: any) {
    return item.$key;
  }
  ngOnInit() {
  }

}
