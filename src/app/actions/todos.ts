import { Action } from '@ngrx/store';

import { TodoItem } from '../models/todo-item';
export const ActionTypes = {
    GET_ALL_TODOS: '[TODOS] Get Todos',
    REMOVE_TODO: '[TODOS] Remove Todo',
    ADD_TODO: '[TODOS] Add Todo',
    RECEIVED_TODOS: '[TODOS] Received todos'
}

export class GetTodosAction implements Action {
    type = ActionTypes.GET_ALL_TODOS;
}

export class AddTodoAction implements Action {
    type = ActionTypes.ADD_TODO;
    constructor(public payload: TodoItem) { }
}

export class RemoveTodoAction implements Action {
    type = ActionTypes.REMOVE_TODO;
    constructor(public payload: TodoItem) { }
}

export class ReceivedTodoAction implements Action {
    type = ActionTypes.RECEIVED_TODOS;
    constructor(public payload: TodoItem[]) { }
}