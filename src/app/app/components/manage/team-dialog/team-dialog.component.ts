import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TeamModel } from '../../../models/team.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'team-dialog',
  templateUrl: 'team-dialog.component.html',
  styleUrls: ['team-dialog.component.scss']
})
export class TeamDialogComponent {

  constructor(public dialogRef: MatDialogRef<TeamDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
}
