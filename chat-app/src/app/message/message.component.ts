import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../models/chat-message';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private authService: AuthService) { 
    this.authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
  }

  ngOnInit() {
    this.messageContent = this.chatMessage.message;
    this.timeStamp = this.chatMessage.timeSend;
    this.userEmail = this.chatMessage.email;
    this.userName = this.chatMessage.userName;
  }
}
