import { StorableModel } from './storable-model';
import { TransactionLabel } from '../core/transaction-label';

export class User extends StorableModel {
  customLabels: TransactionLabel[];
}
