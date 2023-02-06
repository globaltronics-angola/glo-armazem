import {Injectable} from '@angular/core';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class FileWriteService {

  constructor() {
  }

  writeToJSONFile(filename: string, data: any): void {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}


