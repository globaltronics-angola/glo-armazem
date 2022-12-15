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

  getId() {
    return this.afs.createId();
  }

  create(object: any, name: string) {
    object.id = this.afs.createId();
    return this.afs.collection('/' + name).add(object)
  }

  createdForceGenerateId(object: any, name: string) {
    return this.afs.collection('/' + name).doc(object.id).set(object)
  }

  createForceMyId(object: any, name: string) {

    return this.afs.collection('/' + name).doc(object.id).set(object)
  }

  findAll(name: string) {
    return this.afs.collection('/' + name)
      .snapshotChanges();
  }

  findAllOrderName(collectName: string){
    const dataStore = this.afs.firestore;

    return dataStore.collection('/' + collectName)
      .orderBy('name')
      .get();
  }

  findById(name: string, id: string) {
    return this.afs.collection('/' + name).doc('/' + id).valueChanges()
  }


  /**
   *
   * @param name collection Name
   * @param id
   */
  deleted(name: string, id: string) {
    return this.afs.collection('/' + name).doc('/' + id).delete()
  }
}
