import { Injectable } from '@angular/core';
//@ts-ignore
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class ServiceEncryptDecriptSimples {
  static key: string = '13421';

  static encript(content: string) {

    let info = CryptoJS.AES
      .encrypt(content, ServiceEncryptDecriptSimples.key)
      .toString()

    // console.log(info);

    return info;
  }

  static decript(content: string) {
    const info = CryptoJS.AES.decrypt(content, ServiceEncryptDecriptSimples.key);
    const originalText = info.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

}
