import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedDataService } from '../services/shared-data-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  router = inject(Router);
  sharedData = inject(SharedDataService);

  canActivate(): boolean {
    if (!this.sharedData.getCurrentUsername()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
