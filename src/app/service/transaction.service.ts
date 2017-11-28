import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../model/transaction';
import { NgSerializerService } from '@kaiu/ng-serializer';

@Injectable()
export class TransactionService {

  private basePath = 'transactions';

  constructor(private firestore: AngularFirestore, private serializer: NgSerializerService) {
  }

  public getTransation(id: string): Observable<Transaction> {
    return this.firestore.doc(`${this.basePath}/${id}`).snapshotChanges()
      .map(changes => (<Transaction>{id: changes.payload.id, ...changes.payload.data()}))
      .map(transactions => this.serializer.deserialize<Transaction>(transactions, Transaction));
  }

  public getAll(): Observable<Transaction[]> {
    return this.firestore.collection(this.basePath)
      .snapshotChanges()
      .map(snaps => snaps.map(snap => (<Transaction>{id: snap.payload.doc.id, ...snap.payload.doc.data()})))
      .map(transactions => this.serializer.deserialize<Transaction>(transactions, [Transaction]));
  }

  public saveTransaction(transaction: Transaction): void {
    const data = JSON.parse(JSON.stringify(transaction));
    // We don't want to persist id property;
    delete data.id;
    this.firestore.doc(`${this.basePath}/${transaction.id}`).set(data);
  }

  public addTransaction(transaction: Transaction): Promise<any> {
    return this.firestore.collection(this.basePath).add(JSON.parse(JSON.stringify(transaction)));
  }
}
