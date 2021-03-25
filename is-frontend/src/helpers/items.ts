import moment from "moment";
import { Item } from "../models/Item";
import 'moment/locale/ru'; 
moment.locale('ru');


export const getMappedItems = (items: Item[]): any => {
  return items.map((item) => {
    return {
      ...item,
      departureAt: moment(item.departureAt).format('llll'),
      status: getMappedStatus(item.status),
      expiresAt: moment(item.expiresAt).format('llll')
    }
  });
}

export const getMappedStatus = (status: string) => {
  return status === 'INSTOCK' ? 'На складе' : 'Отправлен';
}

export const getReversedStatus = (status: string) => {
  if (status === 'На складе') return 'INSTOCK';
  else if (status === 'Отправлен') return 'SENT';
  else return status;
}