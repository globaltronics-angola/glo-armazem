import {Component} from '@angular/core';
import {StorageService} from "../../../../shared/storage.service";
import {HttpClient} from "@angular/common/http";
import {FileWriteService} from "../../../../shared/file-write.service";
import ServiceStorage from "../../../../Services/ServiceStorage";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceUtil from "../../../../Services/ServiceUtil";

@Component({
  selector: 'app-json-import-and-exp',
  templateUrl: './json-import-and-exp.component.html',
  styleUrls: ['./json-import-and-exp.component.css']
})
export class JsonImportAndExpComponent {
  selectedFile: any;
  arrayData: any;
  collectoName: any;
  private window = (<any>window);

  constructor(private store: StorageService, private http: HttpClient, private filewrite: FileWriteService) {

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.readJson();
  }


  saveall() {

    this.store.createForceMyId(this.arrayData, this.collectoName).then(() => {
      this.window.sentMessageSuccess.init('enviado com sucesso')
    })

  }

  private readJson() {
    const reader = new FileReader();
    reader.onload = async () => {
      this.arrayData = await JSON.parse(reader.result as string)
    };
    reader.readAsText(this.selectedFile);
  }
}
