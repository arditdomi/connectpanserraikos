import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Player } from '../../models/player';

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

  teams: any[] = [];
  players: Player[] = [];

  selectedRange;
  selectedTeamName;

  teamFormControl: FormControl = new FormControl();
  teamRangeFormControl: FormControl = new FormControl();

  teamRanges = [19, 17, 15, 13];

  mode = 'custom';

  displayedColumns: string[];

  selection = new SelectionModel<Player>(true, []);

  constructor(private route: ActivatedRoute,
              private appService: AppService,
              private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      subject: this.subjectFormControl,
      message: this.messageFormControl
    });
  }

  ngOnInit() {
    this.setModeToCustom();
    this.loadTeams();
  }

  isCustomMode(): boolean {
    return this.mode === 'custom';
  }

  isStandardMode(): boolean {
    return this.mode === 'standard';
  }

  isSearchDisabled(): boolean {
    if (this.isStandardMode()) {
      return !(this.selectedTeamName && this.selectedRange);
    } else {
      return !this.selectedTeamName;
    }
  }


  onChangeMode($event) {
    if ($event.checked) {
      this.setModeToCustom();
    } else {
      this.setModeToStandard();
    }
  }

  private setModeToCustom() {
    this.mode = 'custom';
    this.displayedColumns = ['select', 'photoURL', 'name', 'surname', 'age', 'email', 'team'];
  }

  private setModeToStandard() {
    this.mode = 'standard';
    this.displayedColumns = ['name', 'photoURL', 'surname', 'age', 'email', 'team'];
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.players.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.players.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Player): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }

  isFormNotFilled(): boolean {
    return (this.subjectFormControl.value === null)
      || (this.messageFormControl.value === null)
  }

  add() {
    for (let i=0; i<10; i++) {
      this.players.push(new Player('name', 'surname', new Date(), 'team', 'fakemail'));
    }
  }

  onSubmitPost() {
    let recipients: Player[];
    if (this.isStandardMode()) {
      recipients = this.players;
    } else {
      recipients = this.selection.selected;
    }
    const generateRecipientsEmails = this.generateRecipientsEmails(recipients);

    const payload = {
      subject: this.subjectFormControl.value,
      message: this.messageFormControl.value,
      recipients: generateRecipientsEmails,
      idToken: this.idToken
    };

    this.appService.submitPost(payload);
  }

  generateRecipientsEmails(players): string {
    let recipients = '';
    const totalPlayers = this.players.length -1;

    players.forEach((player, index) => {
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
    this.selection = new SelectionModel<Player>(true, []);
  }

  onSearch() {
    if (this.mode === 'standard') {
      this.appService.searchStandardMode(this.selectedRange, this.selectedTeamName).then(players => {
        this.players = players;
      });
    } else {
      this.getPlayersInTeam(this.selectedTeamName);
    }
  }
}
