import { animate, Component, OnInit, state, style, transition, trigger, ChangeDetectionStrategy } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MdDialog, MdDialogRef  } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import * as fromRoot from '../reducers';
import { TodoItem } from '../reducers/calendar';

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
  //start at beginning of the first week
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
    this.store.dispatch({type: "FIREBASE_CALENDAR_DATA"});
    this.store.dispatch({type: "GET_TODO_DATA"});
    this.calendarData = this.store.select(state => state.calendar);
    this.calendarData.subscribe(data => console.log(data));
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
    //this.selectedDay = day;
    let dialogRef = this.dialog.open(AddTodoDialogComponent, {width: "60%", height: "50%"});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let todo = Object.assign({}, result);
        this.store.dispatch({ type: "FIREBASE_ADD_CALENDAR_TODO", payload: todo });
      }
    });
  }  
  selectTodo(todo) {
    let dialogRef = this.dialog.open(AddTodoDialogComponent, {width: "60%", height: "50%"});
    
    let duplicate = Object.assign({}, todo);
    dialogRef.componentInstance.todo = duplicate;
    dialogRef.afterClosed().take(1).subscribe(result => {
      if(result) {
        if(result.remove) {
          delete todo.remove;
          this.store.dispatch({ type: "REMOVE", payload: todo});
        } else {
          let todoDuplicate = Object.assign({}, result);
          this.store.dispatch({type: "FIREBASE_UPDATE", payload: todoDuplicate});
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
    <div fxLayout="column" fxLayoutAlign="center center">
      <md-input-container>
        <input md-input placeholder="Title Title" [(ngModel)]="todo.title">
      </md-input-container>
      <md2-datepicker [(ngModel)]="todo.date"></md2-datepicker>
      <button md-raised-button (click)="removeTodo()"><md-icon>remove_circle</md-icon></button>
      <button md-raised-button color="primary" (click)="close()"> Close </button>
    </div>
  `,
})
export class AddTodoDialogComponent {
  todo: TodoItem;
  newItem: string;
  remove: Boolean;
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
    this.todo['date'] = moment(this.todo['date']).toISOString();
    this.dialogRef.close(this.todo);
  }
}
