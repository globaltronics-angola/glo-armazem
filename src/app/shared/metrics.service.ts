import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private firestore: AngularFirestore) {
  }

  getDocumentReads(documentId: string) {
    return this.firestore.doc(`documents/${documentId}`).valueChanges().pipe(
      map((data: any) => {

        console.log(data)
        return data['reads'];
      })
    );
  }
}
