import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  emailFormControl = new FormControl('', [
    Validators.email, Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  isFormInvalid(): boolean {
    return this.usernameFormControl.invalid || this.passwordFormControl.invalid || this.emailFormControl.invalid;
  }

  onLogin() {
    console.log('Login actions');
  }
}
