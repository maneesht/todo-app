import { animate, Component, Input, state, style, transition, trigger, OnInit } from '@angular/core';

import { TodoItem } from '../../reducers/calendar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
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
export class TodoListComponent implements OnInit {
  @Input('list') todos: any;
  newItem = {};
  constructor() { }

  ngOnInit() {
  }
}
