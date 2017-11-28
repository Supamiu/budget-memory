import { Component, ViewEncapsulation } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Transaction } from '../../model/transaction';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../service/user.service';
import { StandardTransactionLabels } from '../../core/standard-transaction-labels';
import { TransactionLabel } from '../../core/transaction-label';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BudgetComponent {

  public data: BehaviorSubject<{ name: string, value: number }[]> = new BehaviorSubject([]);

  colorScheme = {
    domain: ['#2A7E43', '#265B6A', '#AA7239', '#AA4839']
  };

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
      })
      .map(transactions => {
        return transactions.filter(t => new Date(t.date).getMonth() === new Date().getMonth());
      });

  constructor(private transactionService: TransactionService, private userService: UserService) {
    this.transactions$.map(transactions => {
      const budget: { name: string, value: number }[] = [];
      transactions.forEach(transaction => {
        transaction.labels.forEach(label => {
          const budgetRow = budget.find(row => row.name === label.name);
          if (budgetRow !== undefined) {
            budgetRow.value += transaction.amount;
          } else {
            budget.push({name: label.name, value: transaction.amount});
          }
        });
        if (transaction.labels === undefined || transaction.labels.length === 0) {
          const budgetRow = budget.find(row => row.name === 'Autre');
          if (budgetRow !== undefined) {
            budgetRow.value += transaction.amount;
          } else {
            budget.push({name: 'Autre', value: transaction.amount});
          }
        }
      });
      return budget;
    }).subscribe(budget => {
      this.data.next(budget);
    });
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

}
