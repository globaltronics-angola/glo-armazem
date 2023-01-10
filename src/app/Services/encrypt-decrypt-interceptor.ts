import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ServiceEncryptDecrypt } from './ServiceEncryptDecrypt';
//@ts-ignore
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class EncryptDecryptAuthInterceptor implements HttpInterceptor {
  constructor(private encryptDecryptService: ServiceEncryptDecrypt,) { }
  // If you want to some exclude api call from Encryption then add here like that.
  // environment.basUrl is your API URL
  ExcludeURLList = [
    //@ts-ignore
    environment.baseUrl + "/api/Common/commonFileuploaddata",
    //@ts-ignore
    environment.baseUrl + "/api/Users/UploadProfilePicture",
    //@ts-ignore
    environment.baseUrl + "/api/Common/downloadattachedfile"
  ];
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let exludeFound = this.ExcludeURLList.filter(element => {
      return req.url.includes(element)
    });
    // We have Encrypt the GET and POST call before pass payload to API
    if (!(exludeFound && exludeFound.length > 0)) {
      if (req.method == "GET") {
        if (req.url.indexOf("?") > 0) {
          let encriptURL = req.url.substr(0, req.url.indexOf("?") + 1) + this.encryptDecryptService.encryptUsingAES256(req.url.substr(req.url.indexOf("?") + 1, req.url.length));
          const cloneReq = req.clone({
            url: encriptURL
          });
          return next.handle(cloneReq);
        }
        return next.handle(req);
      } else if (req.method == "POST") {
        if (req.body || req.body.length > 0) {
          const cloneReq = req.clone({
            body: this.encryptDecryptService.encryptUsingAES256(req.body)
          });
          return next.handle(cloneReq);
        }
        let data = req.body as FormData;
        return next.handle(req);
      }
    }
    return next.handle(req);
  }
}
