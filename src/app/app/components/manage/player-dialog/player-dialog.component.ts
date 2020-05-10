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
  telephoneNumberFormControl: FormControl = new FormControl('', Validators.required);

  isLoading = false;
  title;
  buttonTitle;

  constructor(public dialogRef: MatDialogRef<PlayerDialogComponent>,
              private authService: AuthService,
              private logService: LogService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data.player) {
      const player = this.data.player;
      this.nameFormControl.setValue(player.name);
      this.data.name = player.name;
      this.surnameFormControl.setValue(player.surname);
      this.data.surname = player.surname;
      if (this.data.disableEmail) {
        this.emailFormControl.disable();
      }
      this.emailFormControl.setValue(player.email);
      this.data.email = player.email;
      this.teamFormControl.setValue(player.team);
      this.data.team = player.team;
      this.dateFormControl.setValue(player.age);
      this.data.age = player.age;
      this.data.photoURL = player.photoURL;
      this.telephoneNumberFormControl.setValue(player.telephoneNumber);
      this.data.telephoneNumber = player.telephoneNumber;
    }
    this.title = this.data.title;
    this.buttonTitle = this.data.buttonTitle;
    this.listenToValueChanges();
  }

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
    this.isLoading = true;
    const file = $event.target.files[0];
    const email = this.emailFormControl.value;
    if (email) {
      const imageReference = await this.authService.uploadFile(file, email);
      imageReference.getDownloadURL().then(url => {
        this.data.photoURL = url;
        this.isLoading = false;
        this.logService.showMessage('Image was uploaded successfully');
      });
    } else {
      this.logService.handleError('You need to provide an email before uploading a profile picture');
    }
  }

  private listenToValueChanges() {
    this.nameFormControl.valueChanges.subscribe(name => {
      this.data.name = name;
    });

    this.surnameFormControl.valueChanges.subscribe(surname => {
      this.data.surname = surname;
    });

    this.emailFormControl.valueChanges.subscribe(email => {
      this.data.email = email;
    });

    this.dateFormControl.valueChanges.subscribe(date => {
      this.data.age = date;
    });

    this.teamFormControl.valueChanges.subscribe(team => {
      this.data.team = team;
    });

    this.telephoneNumberFormControl.valueChanges.subscribe((number: string) => {
      this.data.telephoneNumber = number;
    })
  }
}
