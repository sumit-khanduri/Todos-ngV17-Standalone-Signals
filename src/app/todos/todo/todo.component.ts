import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TodosInterface} from "../types/todos.interface";
import {TodosService} from "../services/todos.service";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit, OnChanges {
  @Input({required: true}) todo!: TodosInterface;
  @Input({required: true}) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
  editingText: string = '';
  @ViewChild('textInput') textInput?: ElementRef;

  constructor(public todoService: TodosService) {
  }

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  /*
  here its basically setting the cursor on the textbox when doubleclick happens so that user
  dont have to manually click there to type.
   */
  ngOnChanges(changes: SimpleChanges) {

   if(changes['isEditing'].currentValue){
     setTimeout(()=> {
       this.textInput?.nativeElement.focus();
     },0)
   }
  }


  changeText($event: KeyboardEvent) {
    this.editingText = ($event.target as HTMLInputElement).value;
  }

  setTodoInEditMode() {
    this.setEditingId.emit(this.todo.id);
  }

  changeTodo() {
    this.todoService.changeTodo(this.todo.id, this.editingText);
    this.setEditingId.emit(null);
  }

  removeTodo() {
    this.todoService.removeTodo(this.todo.id);
  }

  toggleTodo() {
    this.todoService.toggleTodo(this.todo.id);
  }

}
