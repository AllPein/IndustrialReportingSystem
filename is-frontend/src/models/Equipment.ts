import { Item } from './Item';
import { Pavilion } from './Pavilion';

export interface Equipment {
  id?: string;
  items: Item[];
  code: string;
  name: string;
  pavilion: Pavilion;
}

export type EquipmentResponse = Equipment[];
