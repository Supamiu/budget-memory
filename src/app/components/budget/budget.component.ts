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

  public histo: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public total = 0;

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
        return transactions.filter(t => {
          return new Date(t.date).getMonth() === 10;
        });
      });

  public transactionsPerLabel$: Observable<any> = this.transactions$.map(transactions => {
    const budget: { name: string, transactions: Transaction[] }[] = [];
    transactions.forEach(transaction => {
      if (transaction.labels === undefined || transaction.labels.length === 0) {
        transaction.labels = [new TransactionLabel('Autre', [])];
      }
      transaction.labels.forEach(label => {
        const budgetRow = budget.find(row => row.name === label.name);
        if (budgetRow !== undefined) {
          budgetRow.transactions.push(transaction);
        } else {
          budget.push({name: label.name, transactions: [transaction]});
        }
      });
    });
    return budget;
  });

  constructor(private transactionService: TransactionService, private userService: UserService) {
    this.transactionsPerLabel$.map(labels => {
      return labels.map(label => {
        const total = label.transactions.reduce(function (a, b) {
          return a + b.amount;
        }, 0);
        this.total += total;
        return {name: label.name, value: total};
      });
    }).subscribe(budget => {
      this.data.next(budget);
    });

    this.transactionsPerLabel$.map(labels => {
      return labels.map(label => {
        const series = [];
        label.transactions.forEach(transaction => {
          const seriesRow = series.find(s => s.name === new Date(transaction.date).getDay());
          if (seriesRow !== undefined) {
            seriesRow.value += transaction.amount;
          } else {
            series.push({name: new Date(transaction.date).getDay(), value: transaction.amount});
          }
        });
        return {name: label.name, series: series};
      });
    }).subscribe(histo => this.histo.next(histo));
  }

  private addHistoseries(histoRow: any, transaction: Transaction): any {
    const dataSeries = histoRow.series.find(s => s.name === new Date(transaction.date).getDay());
    if (dataSeries !== undefined) {
      dataSeries.value += transaction.amount;
    } else {
      dataSeries.push({name: new Date(transaction.date).getDay(), value: transaction.amount});
    }

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
