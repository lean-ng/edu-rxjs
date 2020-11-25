import {Component, OnDestroy} from '@angular/core';
import {MessageService} from './message.service';
import {map, scan} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnDestroy {
  title = 'edu-rxjs';

  listVisible = false;

  msgCount = 0;
  msgCount$: Observable<number>;
  msgList$: Observable<string[]>;

  authenticated$: Observable<boolean>;

  private msgSubscription: Subscription;

  constructor(msgSvc: MessageService, private authSvc: AuthService) {
    this.authenticated$ = authSvc.authenticated$;
    this.msgList$ = msgSvc.message$
      .pipe(scan((list, msg) => [...list, msg] , []))
    ;
    this.msgCount$ = this.msgList$.pipe(map(list => list.length));
    // Must unsubscribe
    this.msgSubscription = this.msgList$.subscribe(msgList => this.msgCount = msgList.length);

    let beatCount = 0;
    setInterval(() => { msgSvc.publishMessage('Hearbeat ' + ++beatCount ); }, 5000);
  }

  ngOnDestroy(): void {
    this.msgSubscription.unsubscribe();
  }
}
