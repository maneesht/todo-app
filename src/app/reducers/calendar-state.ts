import { CalendarTodo } from '../models/calendar-todo';
export interface CalendarState {
    $key: string;
    todos: CalendarTodo;
}