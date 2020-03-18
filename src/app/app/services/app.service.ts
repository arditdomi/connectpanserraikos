import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LogService } from './log.service';
import * as moment from 'moment';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  teamsReference;
  playersReference;

  constructor(private angularFirestore: AngularFirestore,
              private logService: LogService) {
    this.teamsReference = this.angularFirestore.collection('teams').ref;
    this.playersReference = this.angularFirestore.collection('players').ref;
  }

  getTeams() {
    const teams = [];

    this.teamsReference.get()
      .then(querySnapshot => {
        querySnapshot.forEach( doc => {
          teams.push(doc.data());
        });
      })
      .catch( error => {
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
    await this.playersReference.where("team", "==", teamName).get()
      .then(response => {
        players = this.filterUsersFromResponse(response);
      })
      .catch(error => {
        this.logService.handleError(error);
      });
    return players;
  }

  createPlayer(playerData) {
    if (this.isPlayerValid(playerData)) {
      const player = { name: playerData.name, surname: playerData.surname, age: playerData.age, team: playerData.team };
      this.playersReference.add(player);
    } else {
      this.logService.handleError('Please provide all the player details');
    }
  }

  isPlayerValid(playerData): boolean {
    return (playerData.name !== undefined) && (playerData.surname !== undefined)
      && (playerData.age !== undefined) && (playerData.team !== undefined);
  }

  async search(selectedRange: number, selectedTeamName: string) {
    const ageRangeQuery = this.generateRangeQuery(selectedRange);

    const timestampFrom = firestore.Timestamp.fromDate(ageRangeQuery.from);
    const timestampTo = firestore.Timestamp.fromDate(ageRangeQuery.to);

    if (ageRangeQuery.from !== undefined && ageRangeQuery.to !== undefined) {
      let players = [];

      await this.playersReference.where("age", ">", timestampFrom)
        .where("age", "<", timestampTo)
        .where("team", "==", selectedTeamName)
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

  filterUsersFromResponse(response: any) {
    const players = [];

    response.forEach(player => {
      const playerData = player.data();
      players.push({
        name: playerData.name,
        surname: playerData.surname,
        age: playerData.age.toDate(),
        team: playerData.team
      });
    });
    return players;
  }
}
