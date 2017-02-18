import { Effect, Actions, toPayload } from '@ngrx/effects';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FirebaseDataService } from '../firebase-data.service';
import { FirebaseAuthService } from '../auth/firebase-auth';
@Injectable()
export class MainEffects {
    todoList: FirebaseListObservable<any>;
    constructor(private action$: Actions, private af: AngularFire, private firebaseData: FirebaseDataService, private auth: FirebaseAuthService) {
        this.todoList = this.af.database.list('/todos');
    }
    @Effect() pullCalendarData = this.action$
        .ofType('FIREBASE_CALENDAR_DATA')
        .switchMap(() => {
            return this.auth.getAuth().switchMap((authState) => this.af.database.object(authState.uid))
            .switchMap(result => Observable.of({type: "GOT_CALENDAR_DATA", payload: result}));
        });
    @Effect() getCalendarData = this.action$
        .ofType('GET_TODO_DATA')
        .switchMap(() => this.firebaseData.getUserTodoList())
        .switchMap(data => Observable.combineLatest(data.map((todo) => this.firebaseData.lookUpTodo(todo.$value))))
        .switchMap((data) => Observable.of({type: "GOT_TODO_DATA", payload: data}));

    @Effect({dispatch: false}) addCalendarTodo = this.action$ //add todo key to list and create todo item
        .ofType("FIREBASE_ADD_CALENDAR_TODO")
        .map(toPayload)
        .do((payload) => {
            this.firebaseData.addTodo(payload).then((dataResolved) => this.firebaseData.addUserTodo(dataResolved.key));
        });
    @Effect() pullArrayFromFirebase$ = this.action$
        .ofType('PULL_ARRAY_FROM_FIREBASE')
        .switchMap(() => {
            return this.firebaseData.getList()
            .take(1)
            .switchMap(result => Observable.of({type: "GOT_FIREBASE_ARRAY", payload: result}));
        });
    @Effect({dispatch: false}) addTodo$ = this.action$
        .ofType("ADD")
        .map(toPayload)
        .do((payload) => {
            this.firebaseData.addTodo(payload)
        })
    @Effect({dispatch: false}) updateFirebase$ = this.action$
        .ofType("FIREBASE_UPDATE")
        .do(action => {
            this.firebaseData.updateTodo(action.payload);
        });
    @Effect() removeTodo$ = this.action$
        .ofType("REMOVE")
        .map(toPayload)
        .do((payload) => {
            this.firebaseData.removeTodoFromUser(payload);
            this.firebaseData.removeTodo(payload);
        })
}
