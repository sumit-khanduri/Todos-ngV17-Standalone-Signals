import {Component, inject} from '@angular/core';
import {TodosService} from "../services/todos.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  text: string = '';
  constructor(public todoService: TodosService) {
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;

  }

  addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }

}
