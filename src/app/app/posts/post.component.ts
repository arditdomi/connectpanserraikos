import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss']
})

export class PostComponent implements OnInit {

  idToken: string = 'Fg5I7SNo5kZZ67nmJAXG8JuMmXW3vEHx&VER=8&RID=rpc&SID=fSj_tI6LLqpHjgQ9YwRjyg&CI=0&AID=0&TYPE=xmlhttp&zx=8vrj22o047o7&t=1';

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
      idToken: this.idToken
    };

    this.appService.submitPost(payload);
  }
}
