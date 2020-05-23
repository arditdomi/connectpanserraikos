import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { LogService } from '../../app/services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  emailFormControl = new FormControl('', [
    Validators.email, Validators.required
  ]);

  mode: string = 'login';

  constructor(private authService: AuthService,
              private logService: LogService,
              private router: Router) {
  }

  onSuccess(user) {
    const navigationExtras: NavigationExtras = {
      queryParams: { 'photoURL': user.photoURL, 'displayName': user.displayName, 'email': user.email },
      fragment: 'anchor'
    };
      this.router.navigate(['/profile'], navigationExtras);
      this.logService.showMessage('You are now logged in');
  }

  async onForgotPasswordSubmit($event) {
    let snackBarMessage = '';

    await this.authService.forgotPassword(this.emailFormControl.value).then(() => {
      snackBarMessage = 'Reset email has been sent';
    }).catch(error => {
      snackBarMessage = 'An error occured';
    });
    this.handleError(snackBarMessage);
  }

  handleError($event) {
    this.logService.handleError($event);
  }

  onRegisterMode() {
    this.mode = 'register';
  }

  onResetPassword() {
    this.router.navigate(['/reset-account']);
  }

  onLoginMode() {
    this.mode = 'login';
  }
}
