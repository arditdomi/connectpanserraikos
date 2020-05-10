import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LogService } from './log.service';
import * as moment from 'moment';
import { firestore } from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from '../models/player';
import * as firebase from 'firebase';
import { serverEndpointUrl } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  teamsReference;
  playersReference;
  usersReference;

  constructor(private angularFirestore: AngularFirestore,
              private logService: LogService,
              private http: HttpClient) {
    this.teamsReference = this.angularFirestore.collection('teams').ref;
    this.usersReference = this.angularFirestore.collection('users').ref;
    this.playersReference = this.angularFirestore.collection('players').ref;
  }

  async getTeams() {
    const teams = [];

    await this.teamsReference.get()
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

  async getPlayers(): Promise<Player[]> {
    let players: Player[] = [];
    await this.playersReference.get()
      .then(response => {
        players = this.filterUsersFromResponse(response);
      })
      .catch(error => {
        this.logService.handleError(error);
      });
    return players;
  }

  async getPlayersInTeam(teamName: string): Promise<Player[]> {
    let players: Player[] = [];
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
    const player = this.getPlayerObject(playerData);
    this.playersReference.doc(player.email).set(player).then(() => {
      this.logService.showMessage('Player was added successfully');
    }).catch(error => {
      this.logService.handleError('Error adding player: ' + error);
    });
  }

  createTeam(teamData) {
    const team = this.getTeamObject(teamData);
    this.teamsReference.doc(`${team.name}`).set(team).then(() => {
      this.logService.showMessage('Team was added successfully');
    }).catch(error => {
      this.logService.handleError('Error adding team: ' + error);
    });
  }

  editPlayer(playerData) {
    const updatedPlayer = this.getPlayerObject(playerData);

    this.playersReference.doc(updatedPlayer.email).update(updatedPlayer).then(() => {
      this.logService.showMessage('Player was updated successfully');
    }).catch(error => {
      this.logService.handleError('Error updating player: ' + error);
    });
  }

  editTeam(teamData) {
    const updatedTeam = this.getTeamObject(teamData);

    this.teamsReference.doc(updatedTeam.name).update(updatedTeam).then(() => {
      this.logService.showMessage('Team was updated successfully');
    }).catch(error => {
      this.logService.handleError('Error updating team: ' + error);
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
    let players: Player[] = [];
    await this.getPlayersInTeam(teamName).then(result => {
      players = result;
    });

    for (const player of players) {
      this.deletePlayer(player.email);
    }
  }

  isTeamValid(teamData): boolean {
    return (teamData !== undefined)
      && (teamData.name !== undefined)
      && (teamData.description !== undefined);
  }

  isPlayerValid(player): boolean {
    return (player.name !== undefined) && (player.surname !== undefined)
      && (player.age !== undefined) && (player.team !== undefined)
      && (player.email !== undefined) && (player.telephoneNumber !== undefined);
  }

  async searchStandardMode(selectedRange: number, selectedTeamName: string): Promise<Player[]> {
    const ageRangeQuery = this.generateRangeQuery(selectedRange);

    const timestampFrom = firestore.Timestamp.fromDate(ageRangeQuery.from);
    const timestampTo = firestore.Timestamp.fromDate(ageRangeQuery.to);

    if (ageRangeQuery.from !== undefined && ageRangeQuery.to !== undefined) {
      let players: Player[] = [];

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

  generateRangeQuery(selectedRange: number) {
    const defaultDateFormat = 'D MMMM YYYY';

    let rangeFrom;
    let rangeTo;

    rangeFrom = moment().subtract(selectedRange, 'years').format(defaultDateFormat);
    rangeTo = moment().subtract(selectedRange - 2, 'years').format(defaultDateFormat);
    return { from: new Date(rangeFrom), to: new Date(rangeTo) };
  }

  filterUsersFromResponse(response: any): Player[] {
    const players: Player[] = [];

    response.forEach(data => {
      const playerData = data.data();
      const player = new Player(playerData.name, playerData.surname, playerData.age.toDate(), playerData.team, playerData.email, playerData.telephoneNumber, playerData.photoURL);
      players.push(player);
    });
    return players;
  }

  sendEmails(payload) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post(serverEndpointUrl + '/new-mail', payload, httpOptions).subscribe(result => {
      this.logService.showMessage(result);
    }, error => {
      this.logService.handleError(error.error.message);
    });
  }

  private getPlayerObject(playerData) {
    return {
      name: playerData.name,
      surname: playerData.surname,
      age: playerData.age,
      team: playerData.team,
      email: playerData.email,
      photoURL: playerData.photoURL,
      telephoneNumber: playerData.telephoneNumber
    };
  }

  private getTeamObject(teamData) {
    return {
      name: teamData.name,
      description: teamData.description
    };
  }
}
