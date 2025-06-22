import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedDataService } from '../services/shared-data-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private sharedData: SharedDataService, private router: Router) {}

  canActivate(): boolean {
    if (!this.sharedData.getCurrentUsername()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}