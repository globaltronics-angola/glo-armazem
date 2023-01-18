import {Injectable} from '@angular/core';
import {collection, query, orderBy, startAfter, limit, getDocs} from "firebase/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageServicePaginateService {
  /*private db: FirebaseFirestore;

  constructor() {
    this.db = new FirebaseFirestore()
  }*/

  /*getDocument() {
    const first = query(collection(this.db, "cities"), orderBy("population"), limit(25));
    const documentSnapshots = await getDocs(first);
  }*/

  // @ts-ignore

}
