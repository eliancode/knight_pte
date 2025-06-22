import { Component } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { MatChipsModule } from '@angular/material/chips';
import { GameComponent } from '../game-component/game-component';
import { GameOverComponent } from '../game-over-component/game-over-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-container-component',
  imports: [
    MatChipsModule,
    CountdownComponent,
    GameComponent,
    GameOverComponent,
    CommonModule,
  ],
  templateUrl: './game-container-component.html',
  styleUrl: './game-container-component.sass',
})
export class GameContainerComponent {
  timerExpired: boolean = false;

  handleEvent(event: CountdownEvent): void {
    if (event.action === 'done') {
      this.timerExpired = true;
    }
  }
}
