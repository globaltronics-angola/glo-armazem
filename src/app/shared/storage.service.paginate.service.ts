import {Injectable} from '@angular/core';
import {
  getFirestore,
  collection,
  getCountFromServer,
  query,
  Query,
  orderBy,
  startAt,
  FieldPath,
  WhereFilterOp,
  endAt,
  OrderByDirection,
  Timestamp,
  doc,
  docSnapshots,
  QueryConstraint,
  onSnapshot,
  CollectionReference,
  DocumentData,
  startAfter, collectionData,
  getDocs, getDocFromServer, where, limit, limitToLast,
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {StorageService} from "./storage.service";
import {QuerySnapshot} from "firebase/firestore";
import * as _ from "lodash";
import ServiceArticles from "../Services/ServiceArticles";
import firebase from "firebase/compat";
import {DocumentReference, fromDocRef} from "@angular/fire/compat/firestore";


type Options = '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';


@Injectable({
  providedIn: 'root'
})
export class StorageServicePaginateService {

  private queryArray: any = []
  public nextKey: string | undefined;
  public prevKey: string | undefined;
  private activeKey: string | undefined;

  public typeOrder: OrderByDirection = "desc";
  private fieldSearch: string | undefined;
  private fieldContextSearch: string | undefined
  private listData: Observable<any> | undefined;
  private readonly reference: CollectionReference;

  public offset: number = 10;
  public listDataArray: any[] = [];
  public prevKeys: any[] = [];
  public awaitingProcess: boolean = true;
  public countAt: number = 0;
  public fielderOrder: string = 'timestamp';
  public fielderOrder2: string = 'id';

  private typeFieldSeach: string = ""
  isSearch: string = "Nome";
  typingName: string = "";

  public listSearch: any[] = [];

  constructor(private afs: StorageService, private auth: AuthService,
              private pathCollection: String, public order: String = "timestamp",
              private filter: String = "") {

    this.reference = collection(getFirestore(), this.pathCollection.toString());

    this.fielderOrder = order.toString()
    this.pageDefault()
  }

  private getQuerysListing(keyDisplay: string = "") {


    let queryConditions: QueryConstraint[] = []

    if (!this.filter) {
      queryConditions.push(orderBy(this.fielderOrder, this.typeOrder))
    }

    if (this.filter) {
      queryConditions.push(where('moveType', '==', this.filter.toString()))
    }

    if (keyDisplay) {
      queryConditions.push(startAt(keyDisplay))
    }


    queryConditions.push(limit(this.offset + 1))

    if (this.fieldSearch && this.fieldContextSearch) {
      queryConditions.push(where(this.fieldSearch, ">=", this.fieldContextSearch))
      queryConditions.push(where(this.fieldSearch, "<=", this.fieldContextSearch + '\uf8ff'))
    }

    const q = query(this.reference, ...queryConditions);

    onSnapshot(q, (s) => {
      this.list(s.docs)
    })

  }

  findName(name: string) {
    let list: any[] = [];
    let queryConditions: QueryConstraint[] = []

    queryConditions.push(orderBy('name', 'asc'))
    queryConditions.push(where('name', ">=", name))
    queryConditions.push(where('name', "<=", name + '\uf8ff'))
    queryConditions.push(limit(this.offset))
    const q = query(this.reference, ...queryConditions);
    onSnapshot(q, (s) => {
      this.listSearch = s.docs.map(av => av.data())
    })
    return this.listSearch;
  }

  private list(eY: any[]) {

    console.log(eY)
    const data: any[] = eY.map(v => v.data())


    this.listDataArray = _.slice(data, 0, this.offset)
    const limitII: number = data.length;
    if (!data) {
      return;
    }

    this.activeKey = data[0] ? data[0][this.fieldSearch ?? this.fielderOrder] : 0;

    if (limitII < 2) {
      this.nextKey = undefined;
      return;
    }
    if (!this.typeFieldSeach)
      this.nextKey = data[this.offset] ? data[this.offset][this.fieldSearch ?? this.fielderOrder] : 0;
    else {
      this.activeKey = _.first(eY)
      this.nextKey = _.last(eY)

    }
  }

  public async nextPage() {

    this.awaitingProcess = false;
    this.prevKeys.push(this.activeKey)

    if (!this.typeFieldSeach)
      await this.getQuerysListing(this.nextKey);
    else
      await this.queryNext(this.nextKey);


    setTimeout(() => {
      this.awaitingProcess = true;
      this.countAt += 1
    }, 1000)
  }

  public async prevPage() {
    this.awaitingProcess = false;
    const prevKey = _.last(this.prevKeys)


    if (!this.typeFieldSeach)
      await this.getQuerysListing(prevKey);
    else
      await this.queryNext(prevKey);

    setTimeout(() => {
      this.awaitingProcess = true;
      this.prevKeys = _.dropRight(this.prevKeys)
      this.countAt -= 1
    }, 1000)
  }

  public pageDefault() {
    this.getQuerysListing();
  }

  public async findByFieldContext(fieldSearch: string, fieldContext: string) {
    this.prevKeys = [];
    this.countAt = 0;
    this.fieldSearch = fieldSearch;
    this.fielderOrder = this.fieldSearch;
    this.fieldContextSearch = fieldContext;
    await this.getQuerysListing();
  }


  async findArrayContains(fieldSearch: string, fieldContext: string) {
    this.prevKeys = [];
    this.countAt = 0;
    this.fieldContextSearch = fieldContext
    this.fieldSearch = fieldSearch;
    this.typeFieldSeach = 'array-contains'

    await this.queryNext();

  }

  async queryNext(nextKey: any = null) {

    if (this.fieldContextSearch == "") {
      this.typeFieldSeach = ""
      this.fieldSearch = "";
      await this.pageDefault();
    } else {

      let q = this.afs.getFirestore().collection('/' + this.pathCollection)
        //@ts-ignore
        .where(this.fieldSearch, 'array-contains', this.fieldContextSearch).limit(this.offset + 1)

      if (!nextKey) {
        await q.get().then(snap => {
          this.list(snap.docs)
        });
      } else {
        await q.startAt(nextKey).get().then(snap => {
          this.list(snap.docs)
        });
      }
    }
  }

  async changeDirection() {

    this.typeOrder == 'asc' ? this.typeOrder = "desc" : this.typeOrder = 'asc'

    console.log(this.typeOrder)

    await this.pageDefault()
  }

  async find() {
    if (this.isSearch == 'Nome') {
      await this.findByFieldContext('name', this.typingName)
    }
    if (this.isSearch == 'Ref...') {
      await this.findByFieldContext('ean', this.typingName)
    }

    if (this.isSearch == 'Cate...') {
      await this.findArrayContains('category_id', this.typingName)
    }
  }

  setSearch(attr: string) {
    this.isSearch = attr;
  }

  async getCounterInfo() {
    const snapsHost = await getCountFromServer(collection(getFirestore(), this.pathCollection.toString()));
    return snapsHost.data().count;
  }
}

