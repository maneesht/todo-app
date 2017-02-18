import { ActionReducer, combineReducers } from '@ngrx/store';
import * as fromCalendar from './calendar';
import * as fromTodos from './todos';
export interface State {
    calendar: fromCalendar.CalendarState;
    todos: fromTodos.State;
}
export const reducers = {
    calendar: fromCalendar.calendarReducer,
    todos: fromTodos.todoReducer
}
const reduction: ActionReducer<State> = combineReducers(reducers);
export function reducer(state: any, action: any) {
    return reduction(state, action);
}