export type ItemsResponse = Items;

type Items = Item[];

export interface Item {
  name: string;
  group: string;
  country: string;
  supplyCode: string;
  departureAt: string;
  expiresAt: string;
  id: string;
  price: number;
  status: Statuses;
    
}

enum Statuses {
  'SENT',
  'INSTOCK'
}