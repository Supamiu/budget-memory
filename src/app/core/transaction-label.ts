import { Transaction } from '../model/transaction';

export class TransactionLabel {

  constructor(public name: string, public matchers: string[], public custom = false) {
  }

  public matches(transaction: Transaction): boolean {
    let matches = false;
    this.matchers.forEach(matcher => {
      matches = matches || new RegExp(matcher, 'ig').test(transaction.wording);
    });
    return matches;
  }
}
