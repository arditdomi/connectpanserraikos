import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { WhatsAppService } from '../../services/whatsApp.service';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.scss']
})

export class HistoryComponent implements OnInit {

  emailHistory;
  whatsAppHistory;

  constructor(private appService: AppService,
              private whatsAppService: WhatsAppService) {
  }

  ngOnInit(): void {
    this.appService.getEmailHistory().then(history => {
      this.emailHistory = history;
    });

    this.whatsAppService.getHistory().then((history: any[]) => {
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
}
