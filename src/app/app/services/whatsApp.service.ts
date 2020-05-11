import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiKey, serverEndpointUrl } from '../../../environments/environment';
import { Player } from '../models/player';
import { LogService } from './log.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {
  historyRef;

  constructor(private http: HttpClient,
              private logService: LogService,
              private angularFirestore: AngularFirestore,) {
    this.historyRef = this.angularFirestore.collection('whatsAppHistory').ref;
  }

  async sendWhatsAppMessages(message: string, recipients: Player[], tokenId: string) {
    const url = serverEndpointUrl + '/new-whatsapp';
    const generateWhatsAppRecipients = this.generateWhatsAppRecipients(recipients);
    let successfulRecipients = [];

    await Promise.all(generateWhatsAppRecipients.map(recipient => {
      const whatsAppPayload = {
        message: message,
        recipient: recipient,
        idToken: apiKey
      };
      return this.http.post(url, whatsAppPayload)
        .toPromise().then(response => {
          this.logService.showMessage(response);
          successfulRecipients.push(whatsAppPayload.recipient);
        }, error => {
          this.logService.handleError(error.error.message);
        });
    })).then(() => {
      this.addToHistory(message, successfulRecipients);
    });
  }

  addToHistory(message: string, successfulRecipients: string[]) {
    const historyEntry = {
      message,
      successfulRecipients,
      on: moment.now()
    };
    this.historyRef.doc().set(historyEntry).then().catch(error => {
      this.logService.handleError('Error adding whatsApp to history: ' + error);
    });
  };

  generateWhatsAppRecipients(players): string[] {
    let recipients = [];

    players.forEach((player: Player) => {
      recipients.push(player.telephoneNumber);
    });
    return recipients;
  }

  async getHistory(): Promise<any> {
    let history = [];
    await this.historyRef.get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          history.push(doc.data());
        });
      })
      .catch(error => {
        this.logService.handleError('error fetching WhatsApp history');
      });
    return history;
  }
}
