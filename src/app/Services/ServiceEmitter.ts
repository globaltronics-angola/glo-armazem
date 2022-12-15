import {Injectable} from '@angular/core';

import {BehaviorSubject} from "rxjs";

@Injectable()
export default class ServiceEmitter {

  // @ts-ignore
  private messageDateSource = new BehaviorSubject<any>();
  correntDataSource = this.messageDateSource.asObservable();

  constructor() {
  }

  changeMessage(message: any) {
    this.messageDateSource.next(message)
  }
}
