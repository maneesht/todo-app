import { animate, Component, ChangeDetectionStrategy, OnInit, state, style, transition, trigger } from '@angular/core';
import { FirebaseDataService } from '../firebase-data.service';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
export interface TodoListItem {
  name: string;
  done: boolean;
}
export interface TodoItem {
  title: string;
  list: TodoListItem[];
}
interface AppState {
  todos: TodoItem[];
}
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
  firebaseTodos: FirebaseListObservable<any[]>;
  constructor(private store: Store<AppState>, private dataService: FirebaseDataService) {
    this.todos = store.select(state => state.todos);
    this.store.dispatch({ type: "PULL_ARRAY_FROM_FIREBASE" });
  }

  removeTodo(todoItem) {
    this.store.dispatch({ type: "FIREBASE_REMOVE_TODO", payload: todoItem});
  }
  toggleDone($index, todoItem) {
    this.store.dispatch({type: "UPDATEDONE", payload: {item: todoItem, index: $index}});
    this.findUpdated(todoItem).take(1).subscribe((item) => {
      this.store.dispatch({ type: "FIREBASE_UPDATE", payload: Object.assign({}, item )})
    });
  }
  toggleCart(todoItem) {
    this.store.dispatch({type: "UPDATECART", payload: todoItem});
    this.findUpdated(todoItem).take(1).subscribe((item) => {
      this.store.dispatch({ type: "FIREBASE_UPDATE", payload: Object.assign({}, item) })
    });
  }
  addTodo() {
    let todo = { title: this.newTodo, list: [] };
    this.store.dispatch({ type: "ADD", payload: todo});
  }
  findUpdated(item) {
    return this.store.flatMap(store => store.todos.filter(todo => {return todo && todo.title === item.title}));
  }
  removeItem($index, item) {
    this.store.dispatch({type: "REMOVEFROMLIST", payload: {item: item, index: $index}});
    this.findUpdated(item).take(1).subscribe((item)=> {
      this.store.dispatch({ type: "FIREBASE_UPDATE", payload: Object.assign({}, item )})
    });
  }
  addToList(item) {
    this.store.dispatch({type: "ADDTOLIST", payload: {newItem: {name: item.newItem}, addTo: item}});
    this.findUpdated(item).take(1).subscribe((todoItem) => {
      this.store.dispatch({ type: "FIREBASE_UPDATE", payload: todoItem });
    });
  }
  trackByTodo(index, item) {
    return index.$key;
  }
  trackByListItem(index, item) {
    return index.name;
  }
  ngOnInit() {
  }
}
