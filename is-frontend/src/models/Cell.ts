import { Item } from './Item';

export interface Cell {
  id: string;
  items: Item[];
  code: string;
}

export type CellResponse = Cell[];
