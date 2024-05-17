import {Component, computed} from '@angular/core';
import {TodosService} from "../services/todos.service";
import {FilterEnum} from "../types/filter.enum";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public todoService: TodosService) {
  }

  filterSig = this.todoService.filterSig;
  filterEnum = FilterEnum;
  noTodos = computed(() => this.todoService.todosSig().length === 0);
  activeCount = computed(()=>this.todoService.todosSig().filter((todo) => !todo.isCompleted ).length)
itemsLeft = computed(() => `item${this.activeCount() !== 1 ? 's' : ''}left`)
  changeFilter(event: Event, filterName: FilterEnum) {
    event.preventDefault();
    this.todoService.changeFilter(filterName)
    console.log(this.todoService.filterSig());

  }
}
