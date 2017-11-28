import { Component } from '@angular/core';
import { Transaction } from '../../model/transaction';
import { TransactionService } from '../../service/transaction.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public newTransaction: Transaction;

  public date: Date = new Date();

  constructor(private transactionService: TransactionService, private snack: MatSnackBar) {
    this.initNewTransaction();
  }

  private initNewTransaction(): void {
    this.newTransaction = new Transaction();
    this.newTransaction.idUser = 'BPA-0001';
  }

  public save(): void {
    const transaction = this.newTransaction;
    transaction.date = this.date.toISOString();
    this.transactionService.addTransaction(transaction).then(() => {
      this.snack.open('Transaction ajoutée', '', {duration: 3000});
      this.initNewTransaction();
    });
  }

}
