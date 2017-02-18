import { Action } from '@ngrx/store';

import { TodoItem } from '../models/todo-item';

export const ActionTypes = {
    GET_USER_CALENDAR: '[CALENDAR] Get User Calendar',
    GET_USER_TODO_DATA: '[CALENDAR] Get User Todo Data',
    ADD_CALENDAR_TODO: '[CALENDAR] Add Calendar Todo',
    REMOVE_CALENDAR_TODO: '[CALENDAR] Remove Calendar Todo',
    UPDATE_CALENDAR_TODO: '[CALENDAR] Update Calendar Todo',
    GOT_USER_TODO_DATA: '[CALENDAR] Got User Todo Data'
}

export class GetUserCalendar implements Action {
    type = ActionTypes.GET_USER_CALENDAR;
}

export class GetTodoData implements Action {
    type = ActionTypes.GET_USER_TODO_DATA;
}

export class GotTodoData implements Action {
    type = ActionTypes.GOT_USER_TODO_DATA;
    constructor(public payload: TodoItem[]) { }
}

export class AddCalendarTodo implements Action {
    type = ActionTypes.ADD_CALENDAR_TODO;
    constructor(public payload: TodoItem) { }
}

export class RemoveCalendarTodo implements Action {
    type = ActionTypes.REMOVE_CALENDAR_TODO;
    constructor(public payload: TodoItem) { }
}

export class UpdateCalendarTodo implements Action {
    type = ActionTypes.UPDATE_CALENDAR_TODO;
    constructor(public payload: TodoItem) { }
}
