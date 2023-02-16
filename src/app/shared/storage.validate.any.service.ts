import {Injectable} from '@angular/core';
import ServiceArticles from "../Services/ServiceArticles";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class StorageValidateAnyService {

  constructor(private store: StorageService, private pathCollection: String) {
  }


  async validateExiste(value: string, field: string, acceptEmpty: boolean = false,
                       jqueryElement: any, updated_mode: boolean = false,
                       message: string = "", consultDb: boolean = true, selectType: boolean = false, element: string = "") {

    jqueryElement.addClass('is-valid');
    jqueryElement.removeClass('is-invalid');

    if (updated_mode) {
      jqueryElement.removeClass('is-invalid');
      jqueryElement.removeClass('is-valid');
      jqueryElement.removeAttr('disabled');
      return true;
    }

    if (acceptEmpty) {
      return true;
    }

    if (!value) {
      jqueryElement.removeClass('is-valid');
      jqueryElement.addClass('is-invalid');
      if (selectType) {
        jqueryElement.addClass('is-invalid').select2().trigger("change")
      }
      if (element) {
        (<any>window).$('#' + element + ' tags').addClass('is-invalid')
      }
      throw "Não foi preenchido o campo "
    }

    if (consultDb) {
      return await this.store.findByOther(this.pathCollection.toString(), field, value).then((e: any[]) => {
        if (e.length > 0) {
          jqueryElement.removeClass('is-valid');
          jqueryElement.addClass('is-invalid');
          throw message
        } else {
          jqueryElement.removeClass('is-invalid');
          jqueryElement.addClass('is-valid');
          return true;
        }
      })
    }
    if (selectType) {
      jqueryElement.addClass('is-valid').select2().trigger("change");

    }
    if (element) {
      (<any>window).$('#' + element + ' tags').addClass('is-valid')
    }

    return true;

  }


  async numberValidate(value: number, field: string, acceptEmpty: boolean = false,
                       jqueryElement: any, updated_mode: boolean = false,
                       message: string = "", selectType: boolean = false, element: string = "", limit: number = 0) {

    if (updated_mode) {
      jqueryElement.removeClass('is-invalid');
      jqueryElement.removeClass('is-valid');
      jqueryElement.removeAttr('disabled');
      return true;
    }

    if (acceptEmpty) {
      return true;
    }

    if (value < limit) {
      jqueryElement.removeClass('is-valid');
      jqueryElement.addClass('is-invalid');
      if (selectType) {
        jqueryElement.addClass('is-invalid').select2().trigger("change")
      }
      if (element) {
        (<any>window).$('#' + element + ' tags').addClass('is-invalid')
      }
      throw message;
    }

    if (selectType) {
      jqueryElement.addClass('is-valid').select2().trigger("change");

    }
    if (element) {
      (<any>window).$('#' + element + ' tags').addClass('is-valid')
    }

    jqueryElement.addClass('is-valid');
    jqueryElement.removeClass('is-invalid');
    return true;

  }
}
