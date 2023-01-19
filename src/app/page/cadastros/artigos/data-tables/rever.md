````ts
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userCollection: AngularFirestoreCollection<any>;
  collection: any;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.userCollection = this.afs.collection<any>('valuation');
    this.collection = this.userCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data()))
      );
  }
}
````
