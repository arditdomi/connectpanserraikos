import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.component.scss']
})

export class ProfileComponent {

  private image1 = `../../assets/montzi.jpg`;

  constructor() {}
  profileDescription = 'Head coach of football team Panserraikos';

  onProfilePictureChange() {

  }

  // async fetchProfilePicture() {
  //   const url = 'https://drive.google.com/open?id=1Enz_mugFp6b2cq4vQnV-hJN7-0JwXdKY';
  //   await this.http.get(url).toPromise().then(image => {
  //     return image;
  //   }, (error => {
  //     throwError(error);
  //   }))
  // }
}
