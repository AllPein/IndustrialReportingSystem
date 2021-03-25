export enum Statuses {
  SENT = 'Отправлен',
  INSTOCK = 'На складе'
};

export interface Item {
  name: string;
  country: string;
  supplyCode: string;
  departureAt: string;
  expiresAt: string;
  equipmentId: string;
  cellId: string;
  id: string;
  price: number;
  status: Statuses;
};

export type ItemsResponse = Item[];
