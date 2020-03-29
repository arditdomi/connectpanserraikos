import { Component, Inject, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { MatDialog } from '@angular/material';
import { PlayerDialogComponent } from './player-dialog/player-dialog.component';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';
import { LogService } from '../../services/log.service';
import { DeleteTeamDialogComponent } from './delete-team-dialog/delete-team-dialog.component';
import { DeletePlayerDialogComponent } from './delete-player-dialog/delete-player-dialog.component';
import { Player } from '../../models/player';

@Component({
  selector: 'app-manage',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.scss']
})
export class ManageComponent implements OnInit {

  teams;

  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private logService: LogService) {
  }

  ngOnInit() {
    this.reloadTeams();
  }

  onAddPlayer() {
    this.reloadTeams();
    const dialogRef = this.dialog.open(PlayerDialogComponent, {
      width: '550px',
      data: { teams: this.teams }
    });

    dialogRef.afterClosed().subscribe((player) => {
      if (player) {
        if (this.appService.isPlayerValid(player)) {
          this.appService.createPlayer(player);
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
      data: { teams: this.teams }
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

  addFakeEntities() {
    const teams = ['football', 'basketball', 'volley', 'hockey'];
    teams.forEach(team => {
      this.appService.createTeam({ name: team });
    });

    const fakeAge = 'Wed Mar 18 2020 00:00:00 GMT+0000 (Greenwich Mean Time)';
    const player1: Player = new Player('fake1', 'fake1', new Date(2002, 10), teams[0], 'connectpanserraikos@gmail.com');
    const player2: Player = new Player('fake2', 'fake2', new Date(2004, 10), teams[0], 'connectpanserraikos2@gmail.com');
    const player3: Player = new Player('fake3', 'fake3', new Date(2005, 10), teams[1], 'connectpanserraikos3@gmail.com');
    const player4: Player = new Player('fake4', 'fake4', new Date(2006, 12), teams[2], 'connectpanserraikos@gmail.com');
    const player5: Player = new Player('fake5', 'fake5', new Date(2009, 10), teams[3], 'domiardit96@gmail.com');

    const players: Player[] = [player1, player2, player3, player4, player5];

    players.forEach((player: Player) => {
      this.appService.createPlayer(player);
    });
  }
}
