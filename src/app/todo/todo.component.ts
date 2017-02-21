import { animate, Component, ChangeDetectionStrategy, EventEmitter, Input, OnInit, Output, state, style, transition, trigger } from '@angular/core';
import { FirebaseDataService } from '../firebase-data.service';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';

import { TodoItem } from '../models/todo-item';
import * as fromRoot from '../reducers';
import * as fromTodo from '../reducers/todos';
import * as todos from '../actions/todos';

@Component({
  selector: 'todo',
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
  @Input() todo: TodoItem;
  @Output() removeTodo =  new EventEmitter<TodoItem>();
  newTodo: string;
  currentItem = {};
  constructor() {
  }

  remove(todoItem: TodoItem) {
    this.removeTodo.emit(this.todo);
  }
  
  ngOnInit() {
  }
}
