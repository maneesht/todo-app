import { animate, Component, ChangeDetectionStrategy, OnInit, state, style, transition, trigger } from '@angular/core';
import { FirebaseDataService } from '../firebase-data.service';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import * as fromRoot from '../reducers';
import * as fromTodo from '../reducers/todos';
export interface TodoListItem {
  name: string;
  done: boolean;
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
  todos: Observable<any[]>;
  firebaseTodos: FirebaseListObservable<any[]>;
  currentItem = {};
  constructor(private store: Store<fromRoot.State>, private dataService: FirebaseDataService) {
    this.todos = store.select(state => state.todos).map(state => state.todos);
    this.store.dispatch({ type: "PULL_ARRAY_FROM_FIREBASE" });
  }

  removeTodo(todoItem: any) {
    this.store.dispatch({ type: "REMOVE", payload: todoItem});
  }
  toggleDone($index: number, todoItem: any) {
    this.store.dispatch({type: "UPDATEDONE", payload: {item: todoItem, index: $index}});
    this.findUpdated(todoItem).take(1).subscribe((item) => {
      this.store.dispatch({ type: "FIREBASE_UPDATE", payload: Object.assign({}, item )})
    });
  }
  toggleCart(todoItem: any) {
    this.store.dispatch({type: "UPDATECART", payload: todoItem});
    this.findUpdated(todoItem).take(1).subscribe((item) => {
      this.store.dispatch({ type: "FIREBASE_UPDATE", payload: Object.assign({}, item) })
    });
  }
  addTodo() {
    let todo:any = { title: this.newTodo, list: [] };
    this.store.dispatch({ type: "ADD", payload: todo});
  }
  findUpdated(item:any) {
    return this.store.flatMap(store => store.todos.todos.filter(todo => {return todo && todo.title === item.title}));
  }
  removeItem($index:number, item:any) {
    this.store.dispatch({type: "REMOVEFROMLIST", payload: {item: item, index: $index}});
    this.findUpdated(item).take(1).subscribe((item)=> {
      this.store.dispatch({ type: "FIREBASE_UPDATE", payload: Object.assign({}, item )})
    });
  }
  addToList(item:any) {
    this.store.dispatch({type: "ADDTOLIST", payload: {newItem: {name: item.newItem}, addTo: item}});
    this.findUpdated(item).take(1).subscribe((todoItem) => {
      this.store.dispatch({ type: "FIREBASE_UPDATE", payload: todoItem });
    });
  }
  trackByTodo(index: number, item: any) {
    return item.$key;
  }
  trackByListItem(index: number, item: any) {
    return item.name;
  }
  ngOnInit() {
  }
}
