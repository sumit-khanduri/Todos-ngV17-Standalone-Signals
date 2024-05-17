import {Component, computed} from '@angular/core';
import {TodosService} from "../services/todos.service";
import {CommonModule} from "@angular/common";
import {FilterEnum} from "../types/filter.enum";
import {TodoComponent} from "../todo/todo.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  editingId: string | null = null;

  isAllTodosSelected = computed(() => this.todoService.todosSig().every(todo => todo.isCompleted ));
  constructor(public todoService: TodosService) {
  }

  /*
  Creates a new signal that is computed based on the values of other signals.
  **/
  visibleTodos = computed(() => {
    const todos = this.todoService.todosSig();
    const filter = this.todoService.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter(todo => !todo.isCompleted)
    } else if (filter === FilterEnum.completed) {
      return todos.filter(todo => todo.isCompleted)
    }
    return todos;
  })

  setEditingId(editingId: string|null){
    this.editingId = editingId;
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked);
  }


}
