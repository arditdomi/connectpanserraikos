import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  teamsReference;
  playersReference;

  constructor(private angularFirestore: AngularFirestore) {
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
        this.handleError(error);
      });
    return teams;
  }

  async getPlayers() {
    const players = [];

    await this.playersReference.get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          players.push(doc.data());
        });
      })
      .catch(error => {
        this.handleError(error);
      });
    return players;
  }

  async getPlayersInTeam(teamName: string) {
    const players = [];

    await this.playersReference.where("team", "==", teamName).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          players.push(doc.data());
        });
      })
      .catch(error => {
        this.handleError(error);
      });
    return players;
  }

  handleError(error) {
    console.log(`error: ${error}`);
  }
}
