import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  msg: string;

  constructor(private msgSvc: MessageService) { }

  ngOnInit(): void {
    // Must unsubscribe
    this.msgSvc.message$.pipe(
      filter(msg => msg.startsWith('!'))
    )
      .subscribe(msg => {
      this.msg = msg;
    });
  }

}
