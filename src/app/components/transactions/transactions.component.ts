import { Component } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Transaction } from '../../model/transaction';
import { Observable } from 'rxjs/Observable';
import { TransactionLabel } from '../../core/transaction-label';
import { StandardTransactionLabels } from '../../core/standard-transaction-labels';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  public transactions$: Observable<Transaction[]> = this.transactionService.getAll()
    .map(transactions => {
      transactions.forEach(transaction => {
        transaction.labels = this.getLabels(transaction).map(label => label.name);
      });
      return transactions;
    });

  constructor(public transactionService: TransactionService) {
  }

  private getLabels(transaction: Transaction): TransactionLabel[] {
    const labels = [];
    StandardTransactionLabels.ALL.forEach(label => {
      if (label.matches(transaction)) {
        labels.push(label);
      }
    });
    return labels;
  }
}
