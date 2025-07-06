import { Injectable } from '@angular/core';

export interface StoredUser {
  id: string;
  username: string;
  score: number;
}

export interface LeaderboardEntry {
  position: number;
  user: StoredUser;
}

@Injectable({ providedIn: 'root' })
export class SharedDataService {
  private readonly USERS_KEY = 'all_users';
  private readonly CURRENT_ID_KEY = 'current_used_id';
  private readonly CURRENT_USERNAME_KEY = 'current_username';

  private generateId(): string {
    return crypto.randomUUID();
  }

  private saveAllUsers(users: StoredUser[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  getAllUsers(): StoredUser[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  addUser(username: string, score: number): string {
    const users = this.getAllUsers();

    const newUser: StoredUser = {
      id: this.generateId(),
      username: username,
      score: score,
    };

    users.push(newUser);
    this.saveAllUsers(users);
    localStorage.setItem(this.CURRENT_ID_KEY, newUser.id);

    return newUser.id;
  }

  getUserById(id: string): StoredUser | null {
    const users = this.getAllUsers();
    return users.find(user => user.id === id) ?? null;
  }

  getCurrentUser(): StoredUser | null {
    const id = localStorage.getItem(this.CURRENT_ID_KEY);
    if (!id) return null;

    const users = this.getAllUsers();
    return users.find(u => u.id === id) ?? null;
  }

  setCurrentUsername(username: string): void {
    localStorage.setItem(this.CURRENT_USERNAME_KEY, username);
  }

  getCurrentUsername(): string | null {
    const username = localStorage.getItem(this.CURRENT_USERNAME_KEY);
    return username;
  }

  resetCurrentUsername(): void {
    localStorage.removeItem(this.CURRENT_USERNAME_KEY);
  }

  getLeaderboard(): LeaderboardEntry[] {
    const users = this.getAllUsers();
    const sortedUsers = users.sort((a, b) => b.score - a.score);

    return sortedUsers.slice(0, 5).map((user, index) => ({
      position: index + 1,
      user: user,
    }));
  }

  getLeaderboardWithCurrentUser(): LeaderboardEntry[] {
    const users = this.getAllUsers();
    const currentUser = this.getCurrentUser();

    const sortedUsers = users.sort((a, b) => b.score - a.score);

    const leaderboard = sortedUsers.slice(0, 5).map((user, index) => ({
      position: index + 1,
      user: user,
    }));
    if (currentUser) {
      const currentUserPosition = sortedUsers.findIndex(user => user.id === currentUser.id);
      if (currentUserPosition >= 5) {
        leaderboard.push({
          position: currentUserPosition + 1,
          user: currentUser,
        });
      }
    }

    return leaderboard;
  }

  getCurrentId(): string | null {
    const user = this.getCurrentUser();
    if (!user) return null;
    return user.id;
  }

  getUserLeaderboardPosition(id: string): number {
    const users = this.getAllUsers();

    const sortedUsers = [...users].sort((a, b) => b.score - a.score);

    const index = sortedUsers.findIndex(user => user.id === id);

    return index !== -1 ? index + 1 : -1;
  }
}
