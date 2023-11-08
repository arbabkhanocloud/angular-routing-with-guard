import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged!: boolean;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
