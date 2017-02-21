import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Moment } from 'moment';

import { TodoItem } from '../../models/todo-item';
import { CalendarState } from '../../reducers/calendar-state';
@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent implements OnInit {
  @Input() day: any;
  @Input() dayData: TodoItem[];
  @Output() selectTodo = new EventEmitter<TodoItem>();
  constructor() { console.log(this.day);}

  select(todo: TodoItem) {
    this.selectTodo.emit(todo);
  }

  ngOnInit() {
  }

}
