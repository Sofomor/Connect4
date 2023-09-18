import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { NightModeService } from '../night-mode.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  @ViewChild(BoardComponent) boardComponent!: BoardComponent;

  isSunIcon = true;

  constructor(private nightModeService: NightModeService, private el: ElementRef) {}

  toggleNightMode(): void {
    this.nightModeService.isNightMode = !this.nightModeService.isNightMode;
    console.log('Night mode activated:', this.nightModeService.isNightMode);
  
    const body = document.body;
    const button = this.el.nativeElement.querySelector('button');
    const h1 = this.el.nativeElement.querySelector('h1');
    const h2 = this.el.nativeElement.querySelector('h2');
    const span = this.el.nativeElement.querySelector('span');
  
    if (this.nightModeService.isNightMode) {
      // Mode nuit
      body.style.backgroundColor = '#231304';
      button.style.backgroundColor = '#87C1B2';
      h1.style.color = 'white';
      h2.style.color ='#231304';
      span.style.color = 'white';

    } else {
      // Mode jour
      body.style.backgroundColor = 'white'; 
      button.style.backgroundColor = '#231304'; 
      h1.style.color = '#231304';
      h2.style.color ='white';
      span.style.color = '#231304';
    }
  }

  toggleDayNightIcon(): void {
    this.isSunIcon = !this.isSunIcon;
  }

  onResetGame(): void {
    this.boardComponent.resetGame();
  }
}
