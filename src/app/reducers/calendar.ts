import { Action } from '@ngrx/store';
interface Todo {
    [date: string]: TodoItem[];
}
export interface TodoItem {
    $key?: string;
    date: string;
    title: string;
}
export interface CalendarState {
    $key: string;
    todos: Todo;
}
let initialState: CalendarState = {
    $key: "",
    todos: {}
};
export function calendarReducer(state = initialState, action: Action) {
    switch(action.type) {
        case 'GOT_CALENDAR_DATA':
            return Object.assign({}, action.payload);
        case 'GOT_TODO_DATA':
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
        case 'ADD_CALENDAR_TODO':
            let $key = action.payload.$key;
            return Object.assign({}, state);
        default:
            return state;
    }
}