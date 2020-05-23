import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../../auth/model/user.model';
import { AuthService } from '../../../auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: UserModel;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private logService: LogService,
              private angularFireAuth: AngularFireAuth) {}

  ngOnInit() {
    this.initUser();
  }

  initUser() {
    const loggedUser = this.angularFireAuth.auth.currentUser;
    if (loggedUser) {
      this.user = {
        displayName: loggedUser.displayName,
        photoURL: loggedUser.photoURL,
        email: loggedUser.email,
        uid: loggedUser.uid
      };
    }
  }

  async onProfilePictureChange($event) {
    const file = $event.target.files[0];
    const imageReference = await this.authService.uploadFile(file, this.user.uid);
    imageReference.getDownloadURL().then(url => {
      this.authService.updatePhotoUrl(url);
      this.initUser();
    });
  }
}
