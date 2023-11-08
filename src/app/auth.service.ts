import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;
  obs$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  login() {
    this.loggedIn = true;
    this.obs$.next(this.loggedIn);
    this.router.navigate(['/admin']);
  }

  logout() {
    this.loggedIn = false;
    this.obs$.next(this.loggedIn);
  }

  isAuthenticated(): Observable<boolean> {
    return this.obs$;
  }

  canActivate() {
    if (this.loggedIn === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return true;
    }
  }

  canActivateChild() {
    if (this.loggedIn === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return true;
    }
  }
}
