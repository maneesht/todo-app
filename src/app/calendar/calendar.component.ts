import { animate, Component, OnInit, state, style, transition, trigger, ChangeDetectionStrategy } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MdDialog, MdDialogRef  } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import * as fromRoot from '../reducers';
import * as calendar from '../actions/calendar';
import { TodoItem } from '../models/todo-item';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent implements OnInit {
  events: any;
  days = [];
  weekDays: string[];
  currentDate: Moment;
  currentMonth: string;
  currentYear: string;
  original: Moment;
  selectedDay: Moment;
  calendarData:Observable<any>;
  constructor(private dialog: MdDialog, private store: Store<fromRoot.State>) { 
    this.original = moment();
    this.currentMonth = moment().format('MMMM');
    this.currentYear = this.original.format('YYYY');
    this.currentDate = moment().startOf('month').startOf('week');
    this.weekDays = moment.weekdays();
    for(let i = 0; i < 35; i++) {
      let info = moment(this.currentDate).day(i);
      this.days.push(info);
    }
    this.store.dispatch(new calendar.GetTodoData());
    this.calendarData = this.store.select(state => state.calendar);
  }
  
  addMonth() {
    let newDays = [];
    this.original = moment(this.original).add(1, 'month');
    this.currentYear = this.original.format('YYYY');
    let momentAdd = moment(this.original).startOf('month').startOf('week');
    for (let i = 0; i < 35; i++) {
      let info = moment(momentAdd).day(i);
      newDays.push(info);
    }
    this.days = newDays;
    this.currentDate = momentAdd.clone();
    this.currentMonth = this.original.format('MMMM');
  }
  ngOnInit() {
  }

  select() {
    let dialogRef = this.dialog.open(AddTodoDialogComponent, {height: "450px", width: "90%"});
    dialogRef.componentInstance.canRemove = false;
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let todo: TodoItem = Object.assign({}, result);
        this.store.dispatch(new calendar.AddCalendarTodo(todo));
      }
    });
  }  
  selectTodo(todo) {
    let dialogRef = this.dialog.open(AddTodoDialogComponent, {height: "450px", width: "90%"});
    let duplicate:TodoItem = Object.assign({}, todo);
    dialogRef.componentInstance.todo = duplicate;
    dialogRef.afterClosed().take(1).subscribe(result => {
      if(result) {
        if(result.remove) {
          delete todo.remove;
          this.store.dispatch(new calendar.RemoveCalendarTodo(todo));
        } else {
          let todoDuplicate:TodoItem = Object.assign({}, result);
          this.store.dispatch(new calendar.UpdateCalendarTodo(todoDuplicate));
        }
      }
    })
  }

  subtractMonth() {
    let newDays = [];
    this.original = moment(this.original).subtract(1, 'month');
    this.currentYear = this.original.format('YYYY');
    let momentAdd = moment(this.original).startOf('month').startOf('week');
    for (let i = 0; i < 35; i++) {
      let info = moment(momentAdd).day(i);
      newDays.push(info);
    }
    this.days = newDays;
    this.currentDate = momentAdd.clone();
    this.currentMonth = this.original.format('MMMM');
  }
}
@Component({
  selector: "add-todo-dialog",
  template: `
    <div fxLayout="column" fxLayoutAlign="center center" style="color: white; height: 100%;" fxFill>
      <md-input-container fxFill>
        <input md-input placeholder="Title Title" [(ngModel)]="todo.title">
      </md-input-container>
      <md2-datepicker fxFill style="color: black" [(ngModel)]="todo.date"></md2-datepicker>
      <div md-dialog-actions fxLayout="row" fxLayoutAlign="space-between center">
          <button md-raised-button *ngIf="canRemove" color="warn" style="color: white" (click)="removeTodo()"><md-icon>remove_circle</md-icon>Remove Todo</button>
          <button md-raised-button style="background-color: green; color: white; margin-left: 2px;" (click)="close()"><md-icon>done</md-icon> Done </button>
      </div>
      <button md-raised-button color="primary" (click)="dialogRef.close()"> Cancel </button>
    </div>
  `,
})
export class AddTodoDialogComponent {
  todo: TodoItem;
  newItem: string;
  remove: boolean;
  canRemove =  true;
  constructor(public dialogRef: MdDialogRef<AddTodoDialogComponent>) {
    this.todo = {
      title: "",
      date: ""
    }
  }
  removeTodo() {
    let todo = this.todo;
    todo['remove'] = true;
    this.dialogRef.close(todo);
  }
  close() {
    this.todo.date = moment(this.todo.date).toISOString();
    this.dialogRef.close(this.todo);
  }
}
