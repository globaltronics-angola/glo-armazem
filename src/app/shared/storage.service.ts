import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afs: AngularFirestore) {
    console.log('nova instancia')
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

  /**
   * ***Munzambi Ntemo Miguel***
   *
   * @param attr
   * @param collectionName
   *
   * Esta função tem como objectivo guardar as informações
   * de um objecto no firebase, sendo assim com os parametros
   * Objeto a ser inserido em seguida o nome da coleção
   *
   * ```ts
   *
   * const firebase = require('firebase');
   * createdForceGenerateId(attr: any, collectionName: string) {
   *    return this.afs.collection('/' + collectionName).doc(attr.id).set(attr)
   * }
   * ```
   *
   */
  createdForceGenerateId(attr: any, collectionName: string): Promise<void> {
    return this.afs.collection('/' + collectionName).doc(attr.id).set(attr)
  }


  createForceMyId(object: any, name: string) {

    return this.afs.collection('/' + name).doc(object.id).set(object)
  }

  findAll(name: string) {
    console.log('finnd all')
    return this.afs.collection('/' + name)
      .snapshotChanges();
  }

  findAllOrderName(collectName: string) {
    const dataStore = this.afs.firestore;

    return dataStore.collection('/' + collectName)
      .orderBy('name')
      .get();
  }

  /**
   *
   * @param nameCollection
   * @param id
   * @returns
   */
  findById(nameCollection: string, id: string) {
    return this.afs.collection('/' + nameCollection).doc('/' + id).valueChanges()
  }


  /**
   .collection("global-prateleiras")
   .where("armario", "==", "A0001-GCX07VTJWRXHJIVC4IC4")

   */

  getForeStore() {
    return this.afs.firestore;
  }

  async findByOther(collect: string, nameField: string = "", context: string = "") {
    const dataStore = this.afs.firestore;
    let list: any[] = []
    await dataStore.collection('/' + collect)
      .where(nameField, "==", context)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          list.push(doc.data())
          return doc.data();
        });
      });

    return list;
  }


  /**
   *
   * @param nameCollection collection Name
   * @param id
   */
  deleted(nameCollection: string, id: string) {
    return this.afs.collection('/' + nameCollection).doc('/' + id).delete()
  }
}
