import { TransactionLabel } from './transaction-label';

export class StandardTransactionLabels {
  public static readonly GROCERY = new TransactionLabel('Courses', ['Carrefour', 'Leclerc', 'Super U', 'SuperU', 'Intermarché',
    'Aldi', 'Lidl', 'Auchan', 'Géant', 'Casino']);

  public static readonly CAR = new TransactionLabel('Voiture', ['Feu Vert', 'Norauto', 'Midas', 'Oscaro', 'Euromaster',
    'Speedy', 'Autovision', 'Autosur', 'Sécuritest', 'Peugeot', 'Citroën', 'Renault', 'Audi']);

  public static readonly HOME = new TransactionLabel('Maison', ['Leroy Merlin', 'Conforama', 'Bricorama', 'Castorama', 'Brico Dépôt',
    'Bricomarché', 'Mr Bricolage', 'Bricoman', 'But', 'Mr Meuble', 'Fly', 'Ikea', 'Mobalpa', 'Cuisinella']);

  public static readonly LEISURE = new TransactionLabel('Loisirs', ['Gaumont', 'Pathé', 'Decathlon', 'Intersport']);

  public static readonly HIGHTECH = new TransactionLabel('Electronique', ['Darty', 'Materiel', 'ldlc', 'Boulanger', 'Grosbill']);

  public static readonly CLOTHING = new TransactionLabel('Mode', ['La Halle', 'Kiabi', 'Bonobo', 'Jules', 'H&M', 'Zara',
    'Orchestra', 'Celio', 'Gemo']);

  public static readonly TELECOMMUNICATION = new TransactionLabel('Télécommunication', ['Orange', 'SFR', 'Bouygues', 'free']);

  public static readonly TRANSPORT = new TransactionLabel('Transport', ['SNCF', 'Air France']);

  public static readonly ALL: TransactionLabel[] = [
    StandardTransactionLabels.GROCERY,
    StandardTransactionLabels.CAR,
    StandardTransactionLabels.HOME,
    StandardTransactionLabels.LEISURE,
    StandardTransactionLabels.HIGHTECH,
    StandardTransactionLabels.CLOTHING,
    StandardTransactionLabels.TELECOMMUNICATION,
    StandardTransactionLabels.TRANSPORT,
  ];
}
