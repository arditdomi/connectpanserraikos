import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserModel } from './../auth/model/user.model';

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

  updateProfilePicture(user, photo) {
    const userRef: AngularFirestoreDocument<UserModel> = this.angularFirestore.doc(`users/${user.id}`);
    const data = {
      uid: user.uid,
      email: user.email,
      photoURL: photo,
      displayName: user.displayName
    };
    return userRef.set(data, {merge: true});
  }
}
