import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserModel } from '../auth/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<UserModel>;

  constructor(private angularFireAuth: AngularFireAuth,
              private angularFirestore: AngularFirestore) {
    this.user$ = this.angularFireAuth.authState
      .pipe(
        switchMap((user: any) => {
          if (user) {
            return this.angularFirestore.doc<UserModel>(`users/${user.id}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

}
