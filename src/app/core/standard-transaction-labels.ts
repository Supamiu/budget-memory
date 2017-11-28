import { TransactionLabel } from './transaction-label';

export class StandardTransactionLabels {
  public static readonly GROCERY = new TransactionLabel('Courses', ['Carrefour', 'Leclerc', 'Super U', 'SuperU', 'Intermarché',
    'Aldi', 'Lidl', 'Auchan', 'Géant', 'Casino']);

  public static readonly ALL: TransactionLabel[] = [
    StandardTransactionLabels.GROCERY,
  ];
}
