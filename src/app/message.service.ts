import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {filter, shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSource = new Subject<string>();
  public message$: Observable<string> = this.messageSource.asObservable();

  private shareableSource = new ReplaySubject<string>(5);
  public lastMessages$ = this.shareableSource.asObservable();

  public lastErrMessages$: Observable<string>;

  constructor() {
    this.message$.pipe(
      tap(s => {
        console.log(s);
      })
    ).subscribe(this.shareableSource);
    // this.publishMessage('Initial Message');

    this.lastErrMessages$ = this.shareableSource.pipe(
      filter(m => m.startsWith('Err:')),
      shareReplay(5)
    );
    // this.lastErrMessages$.subscribe(m => console.log('Got errormessage'));
  }

  publishMessage(msg: string): void {
    this.messageSource.next(msg);
    // Alternative zu subscribe im Constructor, Zeile 19
    // this.shareableSource.next(msg);
  }
}
