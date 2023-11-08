import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-router-sample';
  loginText: string = 'login';

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isLogged) => {
      if (isLogged) {
        this.loginText = 'Log Out?';
      } else {
        this.loginText = 'Log In?';
      }
    });
  }
}
