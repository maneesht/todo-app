import { TodoItem } from '../models/todo-item';
export interface CalendarTodo {
    [date: string]: TodoItem[];
}