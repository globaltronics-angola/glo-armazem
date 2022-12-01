import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/auth.service";
import {StorageService} from "../../../../shared/storage.service";
import {Products} from "../../../../model/Products";

@Component({
  selector: 'app-form-geral',
  templateUrl: './form-geral.component.html',
  styleUrls: ['./form-geral.component.css']
})
export class FormGeralComponent implements OnInit {

  products: Products[] = [];
  productObj: any = {};


  constructor(private auth: AuthService, private data: StorageService) {
  }

  ngOnInit(): void {
  }

  saveProduct() {

    this.productObj.id = ""

    this.data.create(this.productObj, 'products').then(
      () => {
        alert('cadastro realizado com sucesso!')
      },
      err =>{
        alert('Ocorreu um determido erro ')
      }
    );
  }

}
