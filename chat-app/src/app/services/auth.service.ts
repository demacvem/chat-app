import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
    this.user = this.afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        let status = 'online';
        this.setUserStatus(status);
        this.router.navigate(['chat']);
      })
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user.user;
      let status = 'online';
      this.setUserData(email, displayName, status);
    })
    .catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string) {
    let path = `users/${this.currentUserId}`;
    let data = {
      email,
      displayName,
      status
    };

    this.db.object(path).update(data)
    .catch(error => console.log(error));
  }

  setUserStatus(status: string) {
    let path = `users/${this.currentUserId}`;
    let data = {
      status
    };
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
