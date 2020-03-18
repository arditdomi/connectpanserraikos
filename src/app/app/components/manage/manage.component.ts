import { Component, Inject, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { MatDialog } from '@angular/material';
import { PlayerDialogComponent } from './player-dialog/player-dialog.component';

@Component({
  selector: 'app-manage',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.scss']
})
export class ManageComponent implements OnInit{

  teams;

  constructor(
    public dialog: MatDialog,
    private appService: AppService){}

  ngOnInit() {
    this.teams = this.appService.getTeams();
  }

  onAddPlayer() {
    const dialogRef = this.dialog.open(PlayerDialogComponent, {
      width: '250px',
      data: {teams: this.teams}
    });

    dialogRef.afterClosed().subscribe(playerData => {
      this.appService.createPlayer(playerData);
    });
  }
}
