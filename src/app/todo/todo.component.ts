import { animate, Component, ChangeDetectionStrategy, OnInit, state, style, transition, trigger } from '@angular/core';
import { FirebaseDataService } from '../firebase-data.service';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';

import { TodoItem } from '../models/todo-item';
import * as fromRoot from '../reducers';
import * as fromTodo from '../reducers/todos';
import * as todos from '../actions/todos';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      transition('true => false', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('false => true', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('todoState', [
      state('true', style({
        "text-decoration": "line-through"
      })),
      state('false', style({
        "text-decoration": "none"
      })),
      transition('false => true', animate('200ms ease-in')),
      transition('true => false', animate('200ms ease-out'))
    ])
  ]
})

export class TodoComponent implements OnInit {
  newTodo: string;
  todos: Observable<TodoItem[]>;
  currentItem = {};
  constructor(private store: Store<fromRoot.State>, private dataService: FirebaseDataService) {
    this.todos = store.select(state => state.todos).map(state => state.todos);
    this.store.dispatch(new todos.GetTodosAction());
  }

  removeTodo(todoItem: TodoItem) {
    this.store.dispatch(new todos.RemoveTodoAction(todoItem));
  }
  
  addTodo() {
    let todo:any = { title: this.newTodo };
    this.store.dispatch(new todos.AddTodoAction(todo));
  }

  trackByTodo(index: number, item: any) {
    return item.$key;
  }
  
  ngOnInit() {
  }
}
