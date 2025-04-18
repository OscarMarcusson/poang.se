import { Component, inject } from '@angular/core';
import { GameListService } from '../services/game-list/game-list.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  private games = inject(GameListService);
}
