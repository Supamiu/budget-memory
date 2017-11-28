import { StorableModel } from './storable-model';

export interface Transaction extends StorableModel {
  idUser: string;
  amount: number;
  wording: string;
  labels: string[];
}
