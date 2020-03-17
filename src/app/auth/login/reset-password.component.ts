import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.scss']
})
export class ResetPasswordComponent {

  emailFormControl = new FormControl('', [
    Validators.email, Validators.required
  ]);

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  async onForgotPasswordSubmit($event) {
    let snackBarMessage = '';

    await this.authService.forgotPassword(this.emailFormControl.value).then(() => {
      snackBarMessage = 'Reset email has been sent';
    }).catch(error => {
      snackBarMessage = 'An error occurred, Try again';
    });
    this._snackBar.open(snackBarMessage, '', {
      duration: 3000
    });
    await this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
