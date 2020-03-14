import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.component.scss']
})

export class ProfileComponent implements OnInit{

  private image1 = `../../assets/london.jpg`;

  constructor(private http: HttpClient) {}
  profileDescription: string;

  ngOnInit(): void {
    this.http.get('http://localhost:8081/messages/history/v1').toPromise().then((message: Message) => {
      this.profileDescription = message.messageText;
    });
  }

  onProfilePictureChange() {
  }
}

export class Message {
  id: string;
  day: string;
  messageText: string;
}
