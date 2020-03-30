import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
  styleUrls: ['confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  question = 'Are you sure you want to continue?';

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data.question) {
      this.question = this.data.question
    }
  }

  answerYes() {
    this.data.answer = 'yes';
  }

  answerNo() {
    this.data.answer = 'no';
  }
}
