import { Component, Inject, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { MatDialog } from '@angular/material';
import { PlayerDialogComponent } from './player-dialog/player-dialog.component';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';
import { LogService } from '../../services/log.service';
import { Player } from '../../models/player';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage',
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.scss']
})
export class ManageComponent implements OnInit {

  teams: any[] = [];

  displayedColumns: string[];
  teamsDisplayedColumns: string[] = ['name', 'description', 'edit', 'delete'];

  players: Player[] = [];

  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private logService: LogService) {
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'photoURL', 'surname', 'number', 'age', 'email', 'team', 'edit', 'delete'];
    this.reload();
  }

  onAddPlayer() {
    this.reload();
    const dialogRef = this.dialog.open(PlayerDialogComponent, {
      width: '550px',
      data: {
        teams: this.teams,
        title: 'Add player',
        buttonTitle: 'Add'
      }
    });

    dialogRef.afterClosed().subscribe((player) => {
      if (player) {
        if (this.appService.isPlayerValid(player)) {
          this.appService.createPlayer(player);
          this.reload();
        } else {
          this.logService.handleError('Please provide all the player details');
        }
      }
    });
  }

  onEditPlayer(row: any) {
    const dialogRef = this.dialog.open(PlayerDialogComponent, {
      width: '550px',
      data: { teams: this.teams, player: row, disableEmail: true, title: `Edit player ${row.name} ${row.surname}`,
        buttonTitle: 'Apply'}
    });

    dialogRef.afterClosed().subscribe((player) => {
      if (player) {
        if (this.appService.isPlayerValid(player)) {
          this.appService.editPlayer(player);
          this.reload();
        } else {
          this.logService.handleError('Please provide all the player details');
        }
      }
    });
  }

  onAddTeam() {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '350px',
      data: {
        title: 'Add team',
        buttonTitle: 'Add'
      }
    });

    dialogRef.afterClosed().subscribe(teamData => {
      if (teamData) {
        if (this.appService.isTeamValid(teamData)) {
          this.appService.createTeam(teamData);
          this.reload();
        } else {
          this.logService.handleError('Please provide all team details');
        }
      }
    });
  }

  onEditTeam(row: any) {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '550px',
      data: {
        team: row,
        disableName: true,
        title: `Edit team ${row.name}`,
        buttonTitle: 'Edit'
      }
    });

    dialogRef.afterClosed().subscribe((team) => {
      if (team) {
        if (this.appService.isTeamValid(team)) {
          this.appService.editTeam(team);
          this.reload();
        } else {
          this.logService.handleError('Please provide all the player details');
        }
      }
    });
  }

  onDeleteTeam(row) {
    this.reload();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { question: `Delete team ${row.name}` }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.answer === 'yes') {
        this.appService.deleteTeam(row.name);
        this.reload();
      } else {
        this.logService.showMessage('Deletion cancelled');
      }
    });
  }

  onDeletePlayer(row) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { question: `Delete player ${row.name}` }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.answer === 'yes') {
        this.appService.deletePlayer(row.email);
        this.reload();
      } else {
       this.logService.showMessage('Deletion cancelled');
      }
    });
  }

  reload() {
    this.appService.getTeams().then(teams => {
      this.teams = teams;
    });
    this.appService.getPlayers().then(players => {
      this.players = players;
    });
  }
}
