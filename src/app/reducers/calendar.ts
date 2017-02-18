import { Action } from '@ngrx/store';

import * as calendar from '../actions/calendar';
import { TodoItem } from '../models/todo-item';
import { CalendarTodo } from '../models/calendar-todo';

export interface CalendarState {
    $key: string;
    todos: CalendarTodo;
}
let initialState: CalendarState = {
    $key: "",
    todos: {}
};
export function calendarReducer(state = initialState, action: Action) {
    switch(action.type) {
        case calendar.ActionTypes.GOT_USER_TODO_DATA:
            let copy  = Object.assign({}, state);
            let todos:any[] = action.payload;
            copy.todos = {};
            todos.forEach((todo) => {
                if(copy.todos[todo.date]) {
                    copy.todos[todo.date].push(Object.assign({}, todo));
                }
                else {
                    copy.todos[todo.date] = [];
                    copy.todos[todo.date].push(Object.assign({}, todo));
                }
            })
            return copy;
        default:
            return state;
    }
}