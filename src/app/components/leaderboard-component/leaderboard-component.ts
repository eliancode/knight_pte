import { Component, Input } from '@angular/core';
import {
  SharedDataService,
  LeaderboardEntry,
  StoredUser,
} from '../../services/shared-data-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard-component',
  imports: [CommonModule],
  templateUrl: './leaderboard-component.html',
  styleUrl: './leaderboard-component.sass',
  standalone: true,
})
export class LeaderboardComponent {
  @Input() includeCurrentUser = false;

  users: LeaderboardEntry[] = [];
  currentUser: StoredUser | null = null;

  constructor(private sharedData: SharedDataService) {}

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
