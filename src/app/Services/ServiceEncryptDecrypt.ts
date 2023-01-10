import { Injectable } from '@angular/core';
//@ts-ignore
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceEncryptDecrypt {

  //@ts-ignore
  private key = CryptoJS.enc.Utf8.parse(environment.EncryptKey);
  //@ts-ignore
  private iv = CryptoJS.enc.Utf8.parse(environment.EncryptIV);
  constructor() { }
  // Methods for the encrypt and decrypt Using AES
  //@ts-ignore
  encryptUsingAES256(text): any {
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
  //@ts-ignore
  decryptUsingAES256(decString) {
    var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
