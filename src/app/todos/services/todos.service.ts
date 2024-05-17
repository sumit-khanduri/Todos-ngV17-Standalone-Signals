import {Injectable, signal} from '@angular/core';
import {TodosInterface} from "../types/todos.interface";
import {FilterEnum} from "../types/filter.enum";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  //our signal stores array of todos which is of type todos interface.
  todosSig = signal<TodosInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);

  addTodo(text: string): void {
    const newTodo: TodosInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16)
    }

    this.todosSig.update((todos)=>{
      console.log(...todos, newTodo)
      return [...todos, newTodo]
  });
  }

  changeFilter(filterName: FilterEnum) : void {
    this.filterSig.set(filterName);
  }

  changeTodo(id: string, text: string){
    this.todosSig.update(todos => todos.map((todo) => {
      //shadow copying the key text inside todo object
      return todo.id === id ? {...todo, text} : todo;
    }));
  }

  toggleTodo(id: string){
    this.todosSig.update(todos => todos.map((todo) => {
      //shadow copying the key text inside todo object
      return todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo;
    }));
  }

  removeTodo(id: string): void {
    this.todosSig.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  toggleAll(isCompleted: boolean): void {
    this.todosSig.update(todos => todos.map((todo) => {
      //shadow copying the key text inside todo object
      return {...todo, isCompleted: isCompleted};
    }));
  }

  constructor() {
  }

}
