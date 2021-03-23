import moment from "moment";
import { Item } from "../models/Item";
import 'moment/locale/ru'; 
moment.locale('ru');


export const mappedItemsByDate = (items: Item[]) => {
  return items.map((item) => {
    return {
      ...item,
      departureAt: moment(item.departureAt).format('llll'),
      expiresAt: moment(item.expiresAt).format('llll')
    }
  });
}