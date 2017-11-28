import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionService } from './service/transaction.service';
import { RouterModule, Routes } from '@angular/router';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MatChipsModule, MatListModule, MatToolbarModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/transactions'
},
  {
    path: 'transactions',
    component: TransactionsComponent
  }];

@NgModule({
  imports: [
    BrowserModule,

    RouterModule.forRoot(routes),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    MatListModule,
    MatToolbarModule,
    MatChipsModule,
  ],
  declarations: [
    AppComponent,

    TransactionsComponent
  ],
  providers: [
    TransactionService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
