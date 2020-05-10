import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiKey, serverEndpointUrl } from '../../../environments/environment';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {

  constructor(private http: HttpClient) {}

  async sendWhatsAppMessages(message: string, recipients: Player[], tokenId: string) {
    const url = serverEndpointUrl + '/new-whatsapp';
    const generateWhatsAppRecipients = this.generateWhatsAppRecipients(recipients);

    generateWhatsAppRecipients.forEach(recipient => {
      const whatsAppPayload = {
        message: message,
        recipient: recipient,
        idToken: apiKey
      };
      this.http.post(url, whatsAppPayload)
        .subscribe(response => {
          console.log(response);
        });
    });
  }

  generateWhatsAppRecipients(players): string[] {
    let recipients = [];

    players.forEach((player: Player) => {
      recipients.push(player.telephoneNumber);
    });
    return recipients;
  }
}
