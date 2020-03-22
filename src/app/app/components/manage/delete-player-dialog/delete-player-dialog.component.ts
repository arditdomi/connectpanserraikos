import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TeamModel } from '../../../models/team.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'team-dialog',
  templateUrl: 'delete-player-dialog.component.html',
  styleUrls: ['delete-player-dialog.component.scss']
})
export class DeletePlayerDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeletePlayerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
}
