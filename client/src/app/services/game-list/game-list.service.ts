import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameListService {
  mine: string[] = ['Test 1', 'Test 2'];
  others: string[] = ['Test 1', 'Test 2', 'Test 3'];

  constructor() {}
}
