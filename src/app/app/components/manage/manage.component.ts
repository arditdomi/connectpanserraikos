import { Component, Inject, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { MatDialog } from '@angular/material';
import { PlayerDialogComponent } from './player-dialog/player-dialog.component';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';
import { LogService } from '../../services/log.service';
import { DeleteTeamDialogComponent } from './delete-team-dialog/delete-team-dialog.component';
import { DeletePlayerDialogComponent } from './delete-player-dialog/delete-player-dialog.component';

@Component({
  selector: 'app-manage',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.scss']
})
export class ManageComponent implements OnInit{

  teams;

  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private logService: LogService){}

  ngOnInit() {
    this.reloadTeams();
  }

  onAddPlayer() {
    this.reloadTeams();
    const dialogRef = this.dialog.open(PlayerDialogComponent, {
      width: '550px',
      data: {teams: this.teams}
    });

    dialogRef.afterClosed().subscribe(playerData => {
      if (playerData) {
        if (this.appService.isPlayerValid(playerData)) {
          this.appService.createPlayer(playerData);
        } else {
          this.logService.handleError('Please provide all the player details');
        }
      }
    });
  }

  onAddTeam() {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(teamData => {
      if (teamData) {
        if (this.appService.isTeamValid(teamData)) {
          this.appService.createTeam(teamData);
        } else {
          this.logService.handleError('Please provide all team details');
        }
      }
    });
  }

  onDeleteTeam() {
    this.reloadTeams();
    const dialogRef = this.dialog.open(DeleteTeamDialogComponent, {
      width: '450px',
      data: {teams: this.teams}
    });

    dialogRef.afterClosed().subscribe(teamData => {
      if (teamData) {
        if (this.appService.isTeamValid(teamData.team)) {
          this.appService.deleteTeam(teamData.team);
        } else {
          this.logService.handleError('Please provide all team details');
        }
      }
    });
  }

  onDeletePlayer() {
    const dialogRef = this.dialog.open(DeletePlayerDialogComponent, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(playerData => {
      if (playerData !== null && playerData.email) {
        this.appService.deletePlayer(playerData.email);
      }
    });
  }

  private reloadTeams() {
    this.teams = this.appService.getTeams();
  }

  private addFakeEntities() {
    const teams = ['football', 'basketball', 'volley', 'hockey'];
    teams.forEach(team => {
      this.appService.createTeam({name: team})
    });

    const fakeAge = 'Wed Mar 18 2020 00:00:00 GMT+0000 (Greenwich Mean Time)';
    const players = [
      {
        name: 'fake1',
        surname: 'fake1',
        email: 'connectpanserraikos@gmail.com',
        age: new Date(2002, 10),
        team: teams[0],
      },
      {
        name: 'fake2',
        surname: 'fake2',
        email: 'connectpanserraikos2@gmail.com',
        age: new Date(2004, 10),
        team: teams[0],
      },
      {
        name: 'fake3',
        surname: 'fake3',
        email: 'connectpanserraikos3@gmail.com',
        age: new Date(2005, 10),
        team: teams[1],
      },
      {
        name: 'fake4',
        surname: 'fake4',
        email: 'domiardit10@gmail.com',
        age: new Date(2006, 12),
        team: teams[2],
      },
      {
        name: 'fake5',
        surname: 'fake5',
        email: 'domiardit96@gmail.com',
        age: new Date(2009, 2),
        team: teams[3],
      }
    ];

    players.forEach(player => {
      this.appService.createPlayer(player);
    });
  }
}
