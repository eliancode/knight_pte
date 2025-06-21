import { Component } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { MatChipsModule } from '@angular/material/chips';
import { GameComponent } from '../game-component/game-component';


@Component({
  selector: 'app-game-container-component',
  imports: [MatChipsModule, CountdownComponent, GameComponent],
  templateUrl: './game-container-component.html',
  styleUrl: './game-container-component.sass'
})
export class GameContainerComponent {
  timerExpired: boolean = false;

  handleEvent(event: CountdownEvent): void {
    if(event.action === "done") {
      this.timerExpired = true;
    }
  }
}