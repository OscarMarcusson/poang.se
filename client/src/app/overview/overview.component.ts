import { Component, inject } from '@angular/core';
import { GameListService } from '../services/game-list/game-list.service';
import { GameListComponent } from "../game-list/game-list.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [GameListComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  protected games = inject(GameListService);
}
