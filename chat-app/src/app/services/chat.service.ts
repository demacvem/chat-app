import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatMessage } from '../models/chat-message';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatMessageRef: AngularFireList<any>;
  chatMessages: Observable<any[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { 
    this.afAuth.authState.subscribe(auth => {
      if(auth !== undefined && auth !== null) {
        this.user = auth;
      }

      this.getUser().subscribe((a: any) => {
        this.userName = a.displayName
      });
    });

    this.chatMessageRef = this.db.list('messages');
  }

  getUser() {
    let userId = this.user.uid;
    let path = `/users/${userId}`;
    return this.db.object(path).valueChanges();
  }

  getUsers() {
    let path = `/users`;
    return this.db.list(path).valueChanges();
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessageRef.push({
      message: msg,
      timeSend: timestamp,
      userName: this.userName,
      email: email 
    });
  }

  getMessages() : Observable<any> {
    let results =  this.chatMessageRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return results;
  }

  getTimeStamp() {
    const now = new Date();
    const date = `${now.getUTCFullYear()}/${(now.getUTCMonth() + 1)}/${now.getUTCDay()}`;
    const time = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`;
    return `${date} ${time}`;
  }
}
