import { Injectable } from "@angular/core";




@Injectable({
  providedIn: 'root'
})
export class ServerProvider {

  //private currentPath: string = process.cwd();

  constructor() {


    // @ts-ignore
    this.createFile()
  }


  async createFile(){
   //console.log(this.currentPath);
  }

}
