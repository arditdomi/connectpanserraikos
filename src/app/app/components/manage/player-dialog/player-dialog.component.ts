import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Player } from '../../../models/player.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'player-dialog',
  templateUrl: 'player-dialog.component.html',
})
export class PlayerDialogComponent {

  dateFormControl: FormControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<PlayerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onTeamSelection($event) {
    this.data.team = $event.target.innerText;
  }

  onDateSelect() {
    this.data.age = this.dateFormControl.value;
  }
}
