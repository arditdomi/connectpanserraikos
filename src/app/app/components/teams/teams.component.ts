import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.scss']
})
export class TeamsComponent implements OnInit{

  teams: any[];
  players: any[];

  selectedRange;
  selectedTeamName;

  teamFormControl: FormControl = new FormControl();
  teamRangeFormControl: FormControl = new FormControl();

  teamRanges = [19, 17, 15, 13];

  displayedColumns: string[] = ['name', 'surname', 'age', 'team'];

  constructor(private route: ActivatedRoute,
              private appService: AppService) {}

  ngOnInit() {
    this.loadTeams();
  }

  onTeamSelection($event) {
    this.selectedTeamName  = $event.target.innerText;
  }

  onAgeRangeSelection($event) {
    this.selectedRange = $event;
  }

  getPlayersInTeam(teamName: string) {
    this.appService.getPlayersInTeam(teamName).then(players => {
      this.players = players;
    });
  }

  loadTeams() {
    this.teams = this.appService.getTeams();
    this.appService.getPlayers().then(players => {
      this.players = players;
    });
  }

  onResetSearch() {
    this.loadTeams();
    this.selectedRange = null;
    this.selectedTeamName = null;
    this.teamFormControl.reset();
    this.teamRangeFormControl.reset();
  }

  onSearch() {
    this.appService.search(this.selectedRange, this.selectedTeamName).then(players => {
      this.players = players;
    });
  }
}
