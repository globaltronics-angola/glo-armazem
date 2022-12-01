import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afs: AngularFirestore) {
  }

  /**
   * Munzambi Ntemo Miguel
   * Estamos adaptar um procedimento para armazenar informações de forma
   * simples e rapido
   *
   * @param object
   * @param name
   */
  create(object: any, name: string) {

    object.id = this.afs.createId();


    return this.afs.collection('/' + name).add(object)
  }

  findAll(name: string) {
    return this.afs.collection('/' + name).snapshotChanges();
  }

  findById(name: string, id: string) {
    return this.afs.collection('/' + name).doc('/' + id).valueChanges();
  }
}
