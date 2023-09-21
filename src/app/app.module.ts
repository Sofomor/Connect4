// Import des composants, des directives et des services

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { GameComponent } from './game/game.component';
import { GameStatusComponent } from './game-status/game-status.component';
import { ResetComponent } from './reset/reset.component';
import { CountdownDirective } from './countdown.directive';
import { NightModeService } from './night-mode.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    GameComponent,
    GameStatusComponent,
    ResetComponent,
    CountdownDirective, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    CommonModule
  ],
  providers: [NightModeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
 