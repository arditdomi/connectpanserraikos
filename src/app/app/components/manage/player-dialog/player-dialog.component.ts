import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/services/auth.service';
import { LogService } from '../../../services/log.service';
import { Player } from '../../../models/player';

@Component({
  selector: 'player-dialog',
  templateUrl: 'player-dialog.component.html',
  styleUrls: ['player-dialog.component.scss']
})
export class PlayerDialogComponent {

  dateFormControl: FormControl = new FormControl('', Validators.required);
  emailFormControl: FormControl = new FormControl('', [
    Validators.email,
    Validators.required
    ]
  );
  nameFormControl: FormControl = new FormControl('', Validators.required);
  surnameFormControl: FormControl = new FormControl('', Validators.required);
  teamFormControl: FormControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<PlayerDialogComponent>,
              private authService: AuthService,
              private logService: LogService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onTeamSelection($event) {
    this.data.team = $event.target.innerText;
  }

  onDateSelect() {
    this.data.age = this.dateFormControl.value;
  }

  isAdditionInvalid(): boolean {
    return (this.nameFormControl.errors != null)
      || (this.surnameFormControl.errors != null)
      || (this.emailFormControl.errors != null)
      || (this.dateFormControl.errors != null)
      || (this.teamFormControl.errors != null)
  }

  async onUploadPicture($event) {
    const file = $event.target.files[0];
    const email = this.emailFormControl.value;
    if (email) {
      const imageReference = await this.authService.uploadFile(file, email);
      imageReference.getDownloadURL().then(url => {
        this.data.photoURL = url;
      });
    } else {
      this.logService.handleError('You need to provide an email before uploading a profile picture');
    }
  }
}
