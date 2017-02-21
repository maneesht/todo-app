import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { TodoItem } from '../../models/todo-item';
@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  @Output() addTodo = new EventEmitter<TodoItem>();
  newTodo: string;
  constructor() { }

  add() {
    let todo:any = { title: this.newTodo };
    this.addTodo.emit(todo);
  }

  ngOnInit() {
  }

}
