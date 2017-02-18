import { Action } from '@ngrx/store';

import * as todos from '../actions/todos';
import { TodoItem } from '../models/todo-item';

export interface State {
    todos: TodoItem[]
}
let initialState: State = { todos: [] };
    
export function todoReducer(state = initialState, action: Action) {
    switch(action.type) {
        case todos.ActionTypes.RECEIVED_TODOS:
            let s = Object.assign({});
            s.todos = [
                ...action.payload
            ];
            return s;
        default:
            return state;
    }
}
