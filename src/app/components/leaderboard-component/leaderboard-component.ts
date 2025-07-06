import { Component, inject, Input, OnInit } from '@angular/core';
import {
  SharedDataService,
  LeaderboardEntry,
  StoredUser,
} from '../../services/shared-data-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-leaderboard-component',
  imports: [CommonModule, MatCardModule],
  templateUrl: './leaderboard-component.html',
  styleUrl: './leaderboard-component.sass',
  standalone: true,
})
export class LeaderboardComponent implements OnInit {
  @Input() includeCurrentUser = false;

  users: LeaderboardEntry[] = [];
  currentUser: StoredUser | null = null;
  sharedData = inject(SharedDataService);

  ngOnInit() {
    this.currentUser = this.sharedData.getCurrentUser();

    this.users = this.includeCurrentUser
      ? this.sharedData.getLeaderboardWithCurrentUser()
      : this.sharedData.getLeaderboard();
  }

  isCurrentUser(user: StoredUser): boolean {
    return this.currentUser !== null && user.id === this.currentUser.id;
  }
}
