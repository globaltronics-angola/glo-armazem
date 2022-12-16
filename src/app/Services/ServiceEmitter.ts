import { EventEmitter } from '@angular/core';

export class ServiceEmitter {

  private static emitters: {
    [correntEnvent: string]: EventEmitter<any>
  } = {}

  static get (correntEnvent:string): EventEmitter<any> {
    if (!this.emitters[correntEnvent])
      this.emitters[correntEnvent] = new EventEmitter<any>();
    return this.emitters[correntEnvent];
  }

}
