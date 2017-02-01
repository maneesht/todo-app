import { Effect, Actions, toPayload } from '@ngrx/effects';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FirebaseDataService } from '../firebase-data.service';
@Injectable()
export class MainEffects {
    todoList: FirebaseListObservable<any>;
    constructor(private action$: Actions, private af: AngularFire, private firebaseData: FirebaseDataService) {
        this.todoList = this.af.database.list('/todos');
    }
    @Effect() pullArrayFromFirebase$ = this.action$
        .ofType('PULL_ARRAY_FROM_FIREBASE')
        .switchMap(() => {
            return this.firebaseData.getList()
            .switchMap(result => Observable.of({type: "GOT_FIREBASE_ARRAY", payload: result}));
        });
    @Effect({dispatch: false}) addTodo$ = this.action$
        .ofType("ADD")
        .map(toPayload)
        .do((payload) => {
            this.firebaseData.addTodo(payload);
        })
    @Effect({dispatch: false}) updateFirebase$ = this.action$
        .ofType("FIREBASE_UPDATE")
        .do(action=> {
            this.firebaseData.updateTodo(action.payload);
        });
    @Effect() removeTodo$ = this.action$
        .ofType("FIREBASE_REMOVE_TODO")
        .map(toPayload)
        .do((payload) => {
            this.todoList.remove(payload.$key)
        })
}
