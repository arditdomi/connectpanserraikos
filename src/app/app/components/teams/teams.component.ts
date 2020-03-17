import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.scss']
})
export class TeamsComponent implements OnInit{

  teams: any[];
  players: any[];

  displayedColumns: string[] = ['name', 'surname', 'age', 'team'];

  constructor(private route: ActivatedRoute,
              private appService: AppService) {}

  ngOnInit() {
    this.loadTeams();
  }

  onTeamSelection($event) {
    const team  = $event.target.innerText;
    this.getPlayersInTeam(team);
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
}
