import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as data from '../user.json';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Validators,
  FormBuilder,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged!: boolean;

  // loginForm = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(5),
  //   ]),
  // });

  loginForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  // loginForm = {
  //   name: '',
  //   password: '',
  // };

  constructor(private authService: AuthService, private fb: FormBuilder) {}
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

  onsubmit() {
    const enteredEmail = this.loginForm.value.email;
    const enteredPassword = this.loginForm.value.password;
    const userData: { [key: string]: string } = data;
    if (
      enteredEmail! in userData &&
      userData[enteredEmail!] === enteredPassword
    ) {
      this.authService.login();
      window.alert('successfully lgged In');
    } else {
      console.log('Invalid credentials');
      window.alert('Invalid username or passwords');
    }
    //   this.loginForm = {
    //     name: '',
    //     password: '',
    //   };
  }
}
