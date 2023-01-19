import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import ServiceUtil from "../Services/ServiceUtil";
import {
  getFirestore,
  collection,
  getCountFromServer,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs, getDocFromServer
} from "@angular/fire/firestore";
import {Subscription} from "rxjs";
import {get} from "@angular/fire/database";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  user: any;
  util: ServiceUtil;

  constructor(private afs: AngularFirestore) {
    console.log('nova instancia')
    this.util = new ServiceUtil();

    this.user = this.util.getSession();

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

  getFirestore() {
    return this.afs.firestore;
  }

  async getCounterInfo(collections: string) {
    const snapsHost = await getCountFromServer(collection(getFirestore(), collections));
    return snapsHost.data().count;
  }

  async nameSearching(name: string) {
    const ref = collection(getFirestore(), "global-articles");
    const q = query(ref, orderBy('name'), startAt(name), endAt(name + '\uf8ff'));
    return await getDocs(q)

  }

  create(object: any, name: string) {
    object.id = this.afs.createId();
    return this.afs.collection('/' + name).add(object)
  }

  createdForceGenerateId(attr: any, collectionName: string): Promise<void> {
    return this.afs.collection('/' + collectionName).doc(attr.id).set(attr)
  }


  createForceMyId(object: any, name: string) {
    return this.afs.collection('/' + name).doc(object.id).set(object)
  }

  findAllNotLimet(name: string) {
    return this.afs.collection('/' + name,
      ref => ref.limit(10)
        .orderBy('timestamp', 'desc')
    ).snapshotChanges();
  }

  findAll(name: string) {
    return this.afs.collection('/' + name
    ).snapshotChanges();
  }

  // @ts-ignore
  findAllNext(name: string, lastStart: any) {
    let ref: any;

    return this.afs.collection('/' + name,
      ref => ref.limit(10)
        .orderBy('timestamp', 'desc')
        .startAfter(lastStart)
    ).snapshotChanges();
  }

  findAllPrev(name: string, lastStart: any, lastEnd: any) {

    return this.afs.collection('/' + name,
      ref => ref.limit(10)
        .orderBy('timestamp', 'desc')
        .startAt(lastStart)
        .endBefore(lastEnd)
    ).snapshotChanges();
  }

  //@ts-ignore .\uf8ff
  findAllTest(name: string, offset, startKey?, operator, children) {

    const fire = this.afs;

    const col = fire.collection(`/${name}`,
      ref => ref.where(children, operator, `${startKey.trim()}`)
        .orderBy(children)
        .limit(10)
    );
    return col.snapshotChanges()

  }

  // @ts-ignore
  findText(collectName: string, name: string, startKey?, offset) {

    // @ts-ignore
    return list(`${collectName}`, {
      query: {
        orderByKey: true,
        startAt: startKey,
        limitToFirst: offset + 1
      }
    })

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
      .where('deleted_at', '==', 'NULL')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          list.push(doc.data())
          return doc.data();
        });
      });

    return list;
  }


  async findByStart(collect: string, nameField: string = "", context: string = "") {
    const dataStore = this.afs.firestore;
    let list: any[] = []
    await dataStore.collection('/' + collect)
      .orderBy(nameField, 'asc')
      .startAt(context)
      .endAt([context + "\uf8ff"])
      .get()
      .then(snap => {
        snap.forEach(doc => {
          list.push(doc.data())
          return doc.data();
        });
      });

    return list;
  }


  findByDifferenceName(collect: string, nameField: string = "", context: string = "") {
    const dataStore = this.afs.firestore;
    let list: any[] = []


    dataStore.collection('/' + collect)
      .where(nameField, "!=", context)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          list.push(doc.data())
          return doc.data();
        });
      });

    return list;

  }

  findByDifferenceNameOperator(collect: string, nameField: string = "",
                               context: string = "", myOpertor: any = "!=") {
    const dataStore = this.afs.firestore;
    let list: any[] = []


    dataStore.collection('/' + collect)
      .where(nameField, myOpertor, context)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          list.push(doc.data())
          return doc.data();
        });
      });

    return list;

  }


  findAllAlternative(collect: string) {
    const dataStore = this.afs.firestore;
    let list: any[] = []

    dataStore.collection('/' + collect)

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


  findByDifferenceNameTo(
    collect: string, nameField: string = "",
    context: string = "", nameFieldTo: string = "", contextTo: string = ""
  ) {
    const dataStore = this.afs.firestore;
    let list: any[] = []


    dataStore.collection('/' + collect)
      .where(nameField, "==", context)
      .where(nameFieldTo, "==", contextTo)
      .where('userEmail', '==', this.user.email)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          list.push(doc.data())
          return doc.data();
        });
      });

    return list;

  }


}
