import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
})

export class AdminComponent implements OnInit {

  users = [];
  currentUserId: string;

  constructor(private appService: AppService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.uid;
    this.load();
  }

  load() {
    this.users = [];
    this.appService.getUsers().then(( users: any[]) => {
      users.forEach(user => {
        if (this.currentUserId !== user.uid) {
          this.users.push(user);
        }
      });
    });
  }

  async onToggleUser(user, change) {
    if (change.checked && !user.enabled) {
      await this.appService.enableUser(user);
      this.load();
    } else if (!change.checked && user.enabled) {
      await this.appService.disableUser(user);
      this.load();
    }
  }

}
