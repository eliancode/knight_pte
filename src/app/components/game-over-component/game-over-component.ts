import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data-service';
import { LeaderboardComponent } from '../leaderboard-component/leaderboard-component';

@Component({
  selector: 'app-game-over-component',
  imports: [MatButtonModule, LeaderboardComponent],
  templateUrl: './game-over-component.html',
  styleUrl: './game-over-component.sass',
})
export class GameOverComponent implements OnInit, OnDestroy {
  placement: number | null = null;
  userCount: number | null = null;
  router = inject(Router);
  sharedData = inject(SharedDataService);

  ngOnInit(): void {
    const currentId = this.sharedData.getCurrentId();
    if (currentId) {
      this.placement = this.sharedData.getUserLeaderboardPosition(currentId);
    }
    this.userCount = this.sharedData.getAllUsers().length;
  }

  ngOnDestroy(): void {
    this.sharedData.resetCurrentUsername();
    this.sharedData.resetCurrentUser();
  }

  restart(): void {
    this.sharedData.resetCurrentUsername();
    this.router.navigate(['']);
  }
}
