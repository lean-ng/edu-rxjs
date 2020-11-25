import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';
import {Observable} from 'rxjs';
import {scan} from 'rxjs/operators';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages$: Observable<string[]>;

  constructor(private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.messages$ = this.msgSvc.lastErrMessages$.pipe(
      scan( (list, msg) => {
        list.push(msg);
        if (list.length > 5) {
            list = list.slice(1);
        }
        return list;
      }, [] )
    );
  }

}
