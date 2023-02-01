import {Component, OnInit} from '@angular/core';
import {StorageServicePaginateService} from "../../../shared/storage.service.paginate.service";
import {StorageService} from "../../../shared/storage.service";
import {AuthService} from "../../../shared/auth.service";
import ServiceUsers from "../../../Services/ServiceUsers";
import ServiceUtil from "../../../Services/ServiceUtil";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styles: []
})
export class UsersListComponent implements OnInit {

  pageTotal!: number;
  typingName: string = ""
  isSearch: string = "Nome"
  awaitingProcess: boolean = false;
  public page: StorageServicePaginateService;

  public userSer: ServiceUsers;

  constructor(private store: StorageService, private auth: AuthService) {
    this.page = new StorageServicePaginateService(this.store, this.auth, "users")
    this.userSer = new ServiceUsers(this.store);
    this.initQuery();
  }

  save() {
    this.userSer.save();
  }

  async ngOnInit() {

    this.initQuery();
    await this.page.getCounterInfo()
    this.page.pageDefault();
    this.awaitingProcess = true;

  }

  private window = (<any>window);


  initQuery() {
    const permission = this.window.$('#permission');

    permission.select2({minimumResultsForSearch: -1}).on('change', async (e: any) => {
      try {
        this.userSer.Model.type = e.target.value;
      } catch (e) {
      }
    })
    this.window.$('#permission').val("user").select2({minimumResultsForSearch: -1}).change()

  }

  edited(attr: any) {
    this.initQuery()
    this.userSer.Model = attr;
    this.window.$('#permission').val(attr.type).select2({minimumResultsForSearch: -1}).change()

    console.log(attr.type)

  }


  public deleted(attr: any) {
    this.store.deleted(ServiceUsers.STORAGE_MODEL, attr.email).then(
      () => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
      }
    )

  }
}

