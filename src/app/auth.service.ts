import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated$: Observable<boolean>;
  private authenticatedSource: BehaviorSubject<boolean>;

  constructor() {
    this.authenticatedSource = new BehaviorSubject<boolean>(false);
    this.authenticated$ = this.authenticatedSource.asObservable();
  }

  logOn(): void {
    this.authenticatedSource.next(true);
  }
  logOff(): void {
    this.authenticatedSource.next(false);
  }
}
