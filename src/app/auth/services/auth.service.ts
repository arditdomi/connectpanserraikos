import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserModel } from './../model/user.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private angularFireAuth: AngularFireAuth,
              private angularFirestore: AngularFirestore,
              private router: Router) {
    this.angularFireAuth.auth.onAuthStateChanged(user => {
      this.isLoggedIn = !!user;
    })
  }

  async logout() {
    await this.angularFireAuth.auth.signOut();
    return this.router.navigate(['/login']);
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<UserModel> = this.angularFirestore.doc(`users/${user.id}`);
    const data = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName
    };
    return userRef.set(data, { merge: true });
  }

  async updatePhotoUrl(url) {
    const currentUser = this.angularFireAuth.auth.currentUser;
    await currentUser.updateProfile({ displayName: currentUser.displayName, photoURL: url });
  }

  forgotPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  uploadFile(file: File, uid: string) {
    const storageRef = firebase.storage().ref();
    const mountainImagesRef = storageRef.child(uid);
    mountainImagesRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
    return mountainImagesRef;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
