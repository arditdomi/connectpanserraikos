import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { WhatsAppService } from '../../services/whatsApp.service';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.scss']
})

export class HistoryComponent {

  emailHistory;
  whatsAppHistory;

  fromEmail;
  toEmail;

  fromWhatsApp;
  toWhatsApp;

  constructor(private appService: AppService,
              private whatsAppService: WhatsAppService) {
  }

  searchWhatsAppHistory() {
    this.whatsAppHistory = [];
    this.whatsAppService.getHistory(this.fromWhatsApp, this.toWhatsApp).then((history: any[]) => {
      history.forEach(entry => {
        let recipients = '';
        entry.successfulRecipients.forEach(recipient => {
          recipients += `${recipient}, `;
        });
        entry.successfulRecipients = recipients;
      });
      this.whatsAppHistory = history;
    });
  }

  searchEmailHistory() {
    this.emailHistory = [];
    this.appService.getEmailHistory(this.fromEmail, this.toEmail).then(history => {
      this.emailHistory = history;
    });
  }

  fromEmailSelect(date) {
    this.fromEmail = date.value;
  }

  toEmailSelect(date) {
    this.toEmail = date.value;
  }

  fromWhatsAppSelect(date) {
    this.fromWhatsApp = date.value;
  }

  toWhatsAppSelect(date) {
    this.toWhatsApp = date.value;
  }
}
