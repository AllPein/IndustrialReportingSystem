import React from 'react';
import { Item } from '../../models/Item';
import { Popover, Tag, Typography } from 'antd';
import { randomColor } from '../../helpers/colors';
import ItemsPopover from '../Popovers/ItemsPopover';
import { Cell } from '../../models/Cell';

export const columns = (
  editingKey: string | undefined,
  isAdmin: boolean,
  cancel: React.MouseEventHandler<HTMLElement>,
  save: Function,
  edit: Function,
  isEditing: Function
) => {

  const data = [
    {
      title: 'Код ячейки',
      dataIndex: 'code',
      inputType: 'input',
      sorter: (a: any, b: any) => a.cellCode - b.cellCode,
      editable: false
    },
    {
      title: 'Товары в ячейке',
      dataIndex: 'items',
      inputType: 'button',
      editable: true,
      render: (items: Item[], record: Cell) => {
        const editable = isEditing(record);
        return (
        <>
          { !!items && items.length > 0  ?
            (
              items.map((item: Item) => (
                <Popover trigger='click' content={<ItemsPopover item={item} />}>
                  <Tag color={randomColor()} key={item.id}>{item.name}</Tag>
                </Popover>
              ))
            )
            : (
              <Typography.Text>Нет товаров</Typography.Text>
            )}
        </>

      )}
    }
  ];

  return isAdmin ? [...data, {
    title: 'Действие',
    dataIndex: 'operation',
    editable: false,
    render: (_: any, record: Cell) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <a href="javascript:;" onClick={cancel}>Отменить</a>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== '' || record.items.length >= 10} onClick={() => edit(record)}>
          Добавить товар
        </Typography.Link>
      );
    },
  }] : data;
}