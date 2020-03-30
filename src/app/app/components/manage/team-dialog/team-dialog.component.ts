import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Team } from '../../../models/team';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'team-dialog',
  templateUrl: 'team-dialog.component.html',
  styleUrls: ['team-dialog.component.scss']
})
export class TeamDialogComponent {

  descriptionErrorMessage = 'Description is required';
  title;
  buttonTitle;

  nameFormControl: FormControl = new FormControl('', Validators.required);
  descriptionFormControl: FormControl = new FormControl('',
    [Validators.required, Validators.maxLength(65)
    ]
  );

  constructor(public dialogRef: MatDialogRef<TeamDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data.team) {
      this.nameFormControl.setValue(this.data.team.name);
      if (this.data.disableName) {
        this.nameFormControl.disable();
      }
      this.descriptionFormControl.setValue(this.data.team.description);
    }
    this.title = this.data.title;
    this.buttonTitle = this.data.buttonTitle;
    this.listenToValueChanges();
  }

  private listenToValueChanges() {
    this.nameFormControl.valueChanges.subscribe(name => {
      this.data.name = name;
    });

    this.descriptionFormControl.valueChanges.subscribe(description => {
      this.data.description = description;
      if (description) {
        this.descriptionErrorMessage = 'Maximum length of description exceeded'
      } else {
        this.descriptionErrorMessage = 'Description is required';
      }
    });
  }

  disableAddButton(): boolean {
    return (this.nameFormControl.errors != null)
    || (this.descriptionFormControl.errors != null)
  }
}
