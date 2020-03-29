import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Team } from '../../../models/team';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'team-dialog',
  templateUrl: 'delete-team-dialog.component.html',
  styleUrls: ['delete-team-dialog.component.scss']
})
export class DeleteTeamDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteTeamDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onTeamSelection($event) {
    this.data.team = $event.target.innerText;
  }
}
