import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { TransactionLabel } from '../core/transaction-label';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  private userMock = {
    id: 'BPA-0001',
    customLabels: [
      new TransactionLabel('PC', [], true),
      new TransactionLabel('Fast Food', ['McDo', 'KFC', 'Burger King'], true),
    ]
  };

  constructor() {
  }

  public getUser(): Observable<User> {
    return Observable.of(this.userMock).distinctUntilChanged();
  }
}
