import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LogService } from './log.service';
import * as moment from 'moment';
import { firestore } from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  teamsReference;
  playersReference;

  constructor(private angularFirestore: AngularFirestore,
              private logService: LogService,
              private http: HttpClient) {
    this.teamsReference = this.angularFirestore.collection('teams').ref;
    this.playersReference = this.angularFirestore.collection('players').ref;
  }

  getTeams() {
    const teams = [];

    this.teamsReference.get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          teams.push(doc.data());
        });
      })
      .catch(error => {
        this.logService.handleError(error);
      });
    return teams;
  }

  async getPlayers() {
    let players = [];
    await this.playersReference.get()
      .then(response => {
        players = this.filterUsersFromResponse(response);
      })
      .catch(error => {
        this.logService.handleError(error);
      });
    return players;
  }

  async getPlayersInTeam(teamName: string) {
    let players = [];
    await this.playersReference.where('team', '==', teamName).get()
      .then(response => {
        players = this.filterUsersFromResponse(response);
      })
      .catch(error => {
        this.logService.handleError(error);
      });
    return players;
  }

  createPlayer(playerData) {
    const player = {
      name: playerData.name,
      surname: playerData.surname,
      age: playerData.age,
      team: playerData.team,
      email: playerData.email
    };
    this.playersReference.doc(player.email).set(player).then(() => {
      this.logService.showMessage('Player was added successfully');
    })
      .catch(error => {
        this.logService.handleError('Error adding player: ' + error);
      });
  }

  createTeam(teamData) {
    const team = { name: teamData.name };
    this.teamsReference.doc(`${team.name}`).set(team).then(() => {
      this.logService.showMessage('Team was added successfully');
    })
      .catch(error => {
        this.logService.handleError('Error adding team: ' + error);
      });
  }

  deleteTeam(teamName: string) {
    this.teamsReference.doc(teamName).delete().then(() => {
        this.logService.showMessage('Team was deleted successfully');
        this.deletePlayersInTeam(teamName);
      })
      .catch(error => {
        this.logService.handleError('Error deleting team: ' + error);
      });
  }

  deletePlayer(playerEmail: string) {
    this.playersReference.doc(`${playerEmail}`).delete().then(() => {
      this.logService.showMessage('Player was deleted successfully');
    })
      .catch(error => {
        this.logService.handleError('Error deleting player: ' + error);
      });
  }

  async deletePlayersInTeam(teamName: string) {
    let players = [];
    await this.getPlayersInTeam(teamName).then(result => {
      players = result;
    });

    for (const player of players) {
      this.deletePlayer(player.email);
    }
  }

  isPlayerValid(playerData): boolean {
    return (playerData.name !== undefined) && (playerData.surname !== undefined)
      && (playerData.age !== undefined) && (playerData.team !== undefined)
      && (playerData.email !== undefined);
  }

  isTeamValid(teamData): boolean {
    return (teamData !== undefined);
  }

  async searchStandardMode(selectedRange: number, selectedTeamName: string) {
    const ageRangeQuery = this.generateRangeQuery(selectedRange);

    const timestampFrom = firestore.Timestamp.fromDate(ageRangeQuery.from);
    const timestampTo = firestore.Timestamp.fromDate(ageRangeQuery.to);

    if (ageRangeQuery.from !== undefined && ageRangeQuery.to !== undefined) {
      let players = [];

      await this.playersReference.where('age', '>', timestampFrom)
        .where('age', '<', timestampTo)
        .where('team', '==', selectedTeamName)
        .get()
        .then(response => {
          players = this.filterUsersFromResponse(response);
        })
        .catch(error => {
          this.logService.handleError(error);
        });
      return players;
    }
  }

  async searchCustomMode(selectedTeamName: string) {
    let players = [];

    await this.playersReference
      .where('team', '==', selectedTeamName)
      .get()
      .then(response => {
        players = this.filterUsersFromResponse(response);
      })
      .catch(error => {
        this.logService.handleError(error);
      });
    return players;
  }

  generateRangeQuery(selectedRange: number) {
    const defaultDateFormat = 'D MMMM YYYY';

    let rangeFrom;
    let rangeTo;

    rangeFrom = moment().subtract(selectedRange, 'years').format(defaultDateFormat);
    rangeTo = moment().subtract(selectedRange - 2, 'years').format(defaultDateFormat);
    return { from: new Date(rangeFrom), to: new Date(rangeTo) };
  }

  filterUsersFromResponse(response: any) {
    const players = [];

    response.forEach(player => {
      const playerData = player.data();
      players.push({
        name: playerData.name,
        surname: playerData.surname,
        age: playerData.age.toDate(),
        team: playerData.team,
        email: playerData.email
      });
    });
    return players;
  }

  submitPost(payload) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post('http://83.212.103.26:8080/new-mail', payload, httpOptions).subscribe(result => {
      console.log(result);
    });
  }
}
