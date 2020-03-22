import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.scss']
})
export class TeamsComponent implements OnInit {

  idToken: string = 'Fg5I7SNo5kZZ67nmJAXG8JuMmXW3vEHx&VER=8&RID=rpc&SID=fSj_tI6LLqpHjgQ9YwRjyg&CI=0&AID=0&TYPE=xmlhttp&zx=8vrj22o047o7&t=1';

  subjectFormControl: FormControl = new FormControl();
  messageFormControl: FormControl = new FormControl();

  postForm: FormGroup;

  teams: any[];
  players: any[];

  selectedRange;
  selectedTeamName;

  teamFormControl: FormControl = new FormControl();
  teamRangeFormControl: FormControl = new FormControl();

  teamRanges = [19, 17, 15, 13];

  displayedColumns: string[] = ['name', 'surname', 'age', 'email', 'team'];

  constructor(private route: ActivatedRoute,
              private appService: AppService,
              private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      subject: this.subjectFormControl,
      message: this.messageFormControl
    });
  }

  ngOnInit() {
    this.loadTeams();
  }

  isFormNotFilled(): boolean {
    return (this.subjectFormControl.value === null)
      || (this.messageFormControl.value === null)
  }

  onSubmitPost() {
    const recipients = this.initRecipients();

    const payload = {
      subject: this.subjectFormControl.value,
      message: this.messageFormControl.value,
      recipients,
      idToken: this.idToken
    };

    this.appService.submitPost(payload);
  }

  initRecipients(): string {
    let recipients = '';
    const totalPlayers = this.players.length -1;

    this.players.forEach((player, index) => {
      if (index ===  totalPlayers) {
        recipients += player.email;
      } else {
        recipients += `${player.email},`;
      }
    });
    return recipients;
  }

  onTeamSelection($event) {
    this.selectedTeamName = $event.target.innerText;
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
