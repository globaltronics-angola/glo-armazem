import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import {Injectable} from "@angular/core";
import {FieldValue, Timestamp} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export default class ServiceUsers {

  static STORAGE_MODEL: string = "users";

  Model: Users = {
    id: "NULL",
    email: "",
    name: "",
    timestamp: 0,
    status: "",
    type: "",
    typeId: "",
    photo: "",
    created_at: "NULL",
    provaider: "",
    user: "",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL",
    updatedAt: Timestamp.now()
  }

  private window: any = (<any>window)


  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()

    this.Model.user = user;

  }

  public findAll() {
    return this.store.findAll(ServiceUsers.STORAGE_MODEL)
      .pipe(map(this.convertToModel))
  }

  public save(): void {

    if (!this.Model.updated_mode) {
      this.Model.id = this.Model.email;
      this.Model.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }

    this.Model.updated_mode = false;
    this.Model.timestamp = new Date().getTime();

    this.store.createdForceGenerateId(this.Model, ServiceUsers.STORAGE_MODEL)
      .then(
        () => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
        },
        err => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
        }
      )

  }


  private convertToModel(resp: any) {
    return resp.map((e: any) => {

      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;

      return data;
    })
  }

  public delete() {
    this.store.deleted(ServiceUsers.STORAGE_MODEL, this.Model.id).then(
      () => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
      }
    )

  }





}

export interface Users {
  id: string,
  email: string,
  name: string,
  timestamp: number,
  status: string,
  type: string,
  typeId: string,
  photo: string,
  created_at: string,
  updated_at: string,
  updated_mode: boolean,
  provaider: any,
  user: any,
  deleted_at: string,
  email_auth: string,
  updatedAt: FieldValue
}
