import { Component, input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-game-list',
  standalone: true,
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
  imports: [ButtonComponent],
})
export class GameListComponent {
  games = input<string[]>([]);
  title = input<string>("");
}
