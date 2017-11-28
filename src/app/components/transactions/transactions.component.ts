import { Component } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Transaction } from '../../model/transaction';
import { Observable } from 'rxjs/Observable';
import { TransactionLabel } from '../../core/transaction-label';
import { StandardTransactionLabels } from '../../core/standard-transaction-labels';
import { UserService } from '../../service/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/combineLatest';
import { MatListOption, MatOption } from '@angular/material';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  public transactions$: Observable<Transaction[]> =
    this.transactionService.getAll()
      .distinctUntilChanged()
      .switchMap(transactions => {
        const transactionsWithLabels$ = [];
      transactions.forEach(transaction => {
        transactionsWithLabels$.push(this.getLabels(transaction).map(labels => {
          transaction.labels = labels;
          return transaction;
        }));
      });
        return Observable.combineLatest(transactionsWithLabels$);
      })
      .map(transactions => {
        transactions.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return transactions;
      });

  constructor(public transactionService: TransactionService, private userService: UserService) {
  }

  private getLabels(transaction: Transaction): Observable<TransactionLabel[]> {
    return this.getAllLabels().map(possibleLabels => {
      const labels = transaction.labels;
      possibleLabels.forEach(label => {
        if (label.matches(transaction) && labels.find(l => l.name === label.name) === undefined) {
          labels.push(label);
        }
      });
      return labels;
    });
  }

  public getAllLabels(): Observable<TransactionLabel[]> {
    return this.userService.getUser().map(user => {
      return user.customLabels.concat(StandardTransactionLabels.ALL);
    });
  }

  public addLabels(selectedTransations: MatListOption[], labels: MatOption[]): void {
    selectedTransations.map(t => t.value).forEach(t => {
      t.addLabels(...labels.map(opt => opt.value));
      this.transactionService.saveTransaction(t);
    });
  }
}
