import { StorableModel } from './storable-model';
import { TransactionLabel } from '../core/transaction-label';
import { DeserializeAs } from '@kaiu/serializer';

export class Transaction extends StorableModel {
  idUser: string;
  amount: number;
  wording: string;
  date: string;

  @DeserializeAs([TransactionLabel])
  labels: TransactionLabel[] = [];

  addLabels(...labels: TransactionLabel[]): void {
    labels.forEach(label => {
      if (this.labels.indexOf(label) === -1) {
        this.labels.push(label);
      }
    });
  }
}
