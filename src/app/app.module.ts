import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionService } from './service/transaction.service';
import { RouterModule, Routes } from '@angular/router';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule, MatDatepickerModule, MatInputModule,
  MatListModule, MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { NgSerializerModule } from '@kaiu/ng-serializer';
import { UserService } from './service/user.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { BudgetComponent } from './components/budget/budget.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/transactions'
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'budget',
    component: BudgetComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    RouterModule.forRoot(routes),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    NgSerializerModule.forRoot(),

    MatListModule,
    MatToolbarModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,

    NgxChartsModule,
  ],
  declarations: [
    AppComponent,

    TransactionsComponent,

    AdminComponent,

    BudgetComponent
  ],
  providers: [
    TransactionService,
    UserService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
