import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { apiKey } from '../../../environments/environment';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss']
})

export class PostComponent implements OnInit {

  subjectFormControl: FormControl = new FormControl();
  messageFormControl: FormControl = new FormControl();
  recipientFormControl: FormControl = new FormControl();
  coachFormControl: FormControl = new FormControl();

  postForm: FormGroup;

  constructor(private appService: AppService, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      subject: this.subjectFormControl,
      message: this.messageFormControl,
      recipient: this.recipientFormControl,
      coach: this.coachFormControl
    });
  }

  ngOnInit() {
  }

  isFormNotFilled(): boolean {
    return (this.subjectFormControl.value === null)
      || (this.messageFormControl.value === null)
      || (this.recipientFormControl.value === null)
      || (this.coachFormControl.value === null);
  }

  onSubmitPost() {
    const payload = {
      subject: this.subjectFormControl.value,
      message: this.messageFormControl.value,
      recipient: this.recipientFormControl.value,
      name: this.coachFormControl.value,
      idToken: apiKey
    };

    this.appService.submitPost(payload);
  }
}
