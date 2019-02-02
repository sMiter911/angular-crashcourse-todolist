import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private _todoservice:TodoService) { }

  ngOnInit() {
    this._todoservice.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo) {
    //remove from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    //remove from server
    this._todoservice.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo) {
    this._todoservice.addTodo(todo).subscribe(todo => {
      this.todos.push(todo)
    })
  }

}
