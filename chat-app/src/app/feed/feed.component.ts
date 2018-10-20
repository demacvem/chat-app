import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  
  feeds: any;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.getMessages();
  }

  ngOnChanges() {
    this.getMessages();
  }

  getMessages() {
    this.feeds = this.chat.getMessages();
  }
}
