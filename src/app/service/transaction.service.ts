import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../model/transaction';

@Injectable()
export class TransactionService {

  private basePath = 'transactions';

  constructor(private firestore: AngularFirestore) {
  }

  public getTransation(id: string): Observable<Transaction> {
    return this.firestore.doc(`${this.basePath}/${id}`).snapshotChanges()
      .map(changes => (<Transaction>{id: changes.payload.id, ...changes.payload.data()}));
  }

  public getAll(): Observable<Transaction[]> {
    return this.firestore.collection(this.basePath)
      .snapshotChanges()
      .map(snaps => snaps.map(snap => (<Transaction>{id: snap.payload.doc.id, ...snap.payload.doc.data()})));
  }
}
