import { Component, OnInit } from '@angular/core';
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
export class GameOverComponent implements OnInit {
  placement: number | null = null;
  userCount: number | null = null;

  constructor(private router: Router, private sharedData: SharedDataService) {}

  ngOnInit(): void {
    const currentId = this.sharedData.getCurrentId();
    if (currentId) {
      this.placement = this.sharedData.getUserLeaderboardPosition(currentId);
    }
    this.userCount = this.sharedData.getAllUsers().length;
  }

  restart(): void {
    this.sharedData.resetCurrentUsername();
    this.router.navigate(['']);
  }
}
