import { Component } from '@angular/core';
import {MainComponent} from "./main/main.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {TodosService} from "./services/todos.service";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [MainComponent, HeaderComponent, FooterComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

}
