import { StorableModel } from './storable-model';
import { TransactionLabel } from '../core/transaction-label';

export interface User extends StorableModel {
  customLabels: TransactionLabel[];
}
