import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit{
  ngOnInit(): void {

    this.initFunctionJQuery()
  }

  initFunctionJQuery(){
    (<any>window).InstanceAplication.init()
  }

}
