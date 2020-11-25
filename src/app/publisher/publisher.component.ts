import {Component, EventEmitter, OnInit} from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  message = new EventEmitter<string>();

  constructor(private msgSvc: MessageService) { }

  ngOnInit(): void {
  }

  sendMessage(msg: string): void {
    this.msgSvc.publishMessage(msg);

    this.message.emit(msg);
  }
}
