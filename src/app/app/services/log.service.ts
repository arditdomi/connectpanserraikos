import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private snackBar: MatSnackBar) {}

  handleError(error) {
    this.snackBar.open(`Error: ${error}`, '', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  showMessage(message) {
    this.snackBar.open( message, '', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }
}
