import { Item } from './Item';

export interface Equipment {
  id: string;
  items: Item[];
  code: string;
  name: string;
  pavilionId: string;
}

export type EquipmentResponse = Equipment[];
