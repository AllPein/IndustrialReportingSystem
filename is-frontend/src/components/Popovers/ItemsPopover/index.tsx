import React from 'react';
import * as UI from './styles';
import { Item } from '../../../models/Item';
import { Typography } from 'antd';

interface IItemsPopoverProps {
  item: Item
}

const ItemsPopover: React.FC<IItemsPopoverProps> = ({ item }) => {

  return (
    <UI.ItemsPopoverWrapper>
      
      <Typography.Text>Название: { item.name }</Typography.Text>  <br/>
      <Typography.Text>Страна: { item.country }</Typography.Text><br/>
      <Typography.Text>Цена: { item.price } руб.</Typography.Text><br/>
      <Typography.Text>Номер поставки: { item.supplyCode }</Typography.Text><br/>
      <Typography.Text>Дата поставки: { item.departureAt }</Typography.Text><br/>
      <Typography.Text>Годен до: { item.expiresAt }</Typography.Text><br/>
    </UI.ItemsPopoverWrapper>
  )
};

export default ItemsPopover;