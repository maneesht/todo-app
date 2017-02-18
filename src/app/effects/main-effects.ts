import { Effect, Actions, toPayload } from '@ngrx/effects';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoItem } from '../models/todo-item';
import * as todos from '../actions/todos';
import * as calendar from '../actions/calendar';
import { FirebaseDataService } from '../firebase-data.service';
import { FirebaseAuthService } from '../auth/firebase-auth';
@Injectable()
export class MainEffects {
    todoList: FirebaseListObservable<TodoItem[]>;
    constructor(private action$: Actions, private af: AngularFire, private firebaseData: FirebaseDataService, private auth: FirebaseAuthService) {
        this.todoList = this.af.database.list('/todos');
    }

    @Effect() getCalendarData = this.action$
        .ofType(calendar.ActionTypes.GET_USER_TODO_DATA)
        .switchMap(() => this.firebaseData.getUserTodoList())
        .switchMap(data => Observable.combineLatest(data.map((todo) => this.firebaseData.lookUpTodo(todo.$value))))
        .switchMap((data: TodoItem[]) => Observable.of(new calendar.GotTodoData(data)));

    @Effect({dispatch: false}) addCalendarTodo = this.action$ //add todo key to list and create todo item
        .ofType(calendar.ActionTypes.ADD_CALENDAR_TODO)
        .map(toPayload)
        .do((payload) => {
            this.firebaseData.addTodo(payload).then((dataResolved) => this.firebaseData.addUserTodo(dataResolved.key));
        });
    @Effect() pullArrayFromFirebase$ = this.action$
        .ofType(todos.ActionTypes.GET_ALL_TODOS)
        .switchMap(() => {
            return this.firebaseData.getList()
            .switchMap((result: TodoItem[]) => Observable.of(new todos.ReceivedTodoAction(result)));
        });
    @Effect({dispatch: false}) addTodo$ = this.action$
        .ofType(todos.ActionTypes.ADD_TODO)
        .map(toPayload)
        .do((payload) => {
            this.firebaseData.addTodo(payload)
        })
    @Effect({dispatch: false}) updateFirebase$ = this.action$
        .ofType(calendar.ActionTypes.UPDATE_CALENDAR_TODO)
        .do(action => {
            this.firebaseData.updateTodo(action.payload);
        });
    @Effect() removeTodo$ = this.action$
        .ofType(todos.ActionTypes.REMOVE_TODO)
        .map(toPayload)
        .do((payload) => {
            this.firebaseData.removeTodoFromUser(payload);
            this.firebaseData.removeTodo(payload);
        })
}
