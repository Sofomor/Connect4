import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.scss']
})
export class GameStatusComponent {
  @Input() gameStatus: string = '';
  @Input() player1Moves: number = 0; 
  @Input() player2Moves: number = 0; 
}
