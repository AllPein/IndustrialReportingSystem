import React from 'react';
import { Item } from '../../models/Item';
import { Popover, Tag, Typography } from 'antd';
import { randomColor } from '../../helpers/colors';
import ItemsPopover from '../Popovers/ItemsPopover';

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
      title: 'Название',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name - b.name,
      editable: true,
      inputType: 'input'
    },
    {
      title: 'Код оборудования',
      dataIndex: 'code',
      inputType: '',
      sorter: (a: any, b: any) => a.code - b.code,
      editable: false
    },
    {
      title: 'Код павильона',
      dataIndex: 'pavilionCode',
      inputType: 'select',
      sorter: (a: any, b: any) => a.pavilionCode - b.pavilionCode,
      editable: true,
      selectOptions: [
        {
          label: 'A1',
          value: 'А1'
        },
        {
          label: 'A2',
          value: 'A2'
        },
        {
          label: 'A3',
          value: 'А3'
        },
        {
          label: 'A4',
          value: 'A4'
        },
        {
          label: 'A5',
          value: 'А5'
        },
        {
          label: 'A6',
          value: 'A6'
        },
        {
          label: 'Б1',
          value: 'B1'
        },
        {
          label: 'Б2',
          value: 'B2'
        },
        {
          label: 'Б3',
          value: 'B3'
        },
        {
          label: 'Б4',
          value: 'B4'
        }
      ],
    },
    {
      title: 'Адрес павильона',
      dataIndex: 'pavilionAdress',
      inputType: '',
      sorter: (a: any, b: any) => a.pavilionAdress - b.pavilionAdress,
      editable: false
    },
    {
      title: 'Используемые товары',
      dataIndex: 'items',
      inputType: 'button',
      editable: true,
      render: (items: Item[]) => (
        <>
          { !!items && items.length > 0 ?
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

      )
    }
  ];

  return isAdmin ? [...data, {
    title: 'Действие',
    dataIndex: 'operation',
    editable: false,
    render: (_: any, record: Item) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <a href="javascript:;" onClick={() => save(record.id)} style={{ marginRight: 8 }}>
            Сохранить
          </a>
          <a href="javascript:;" onClick={cancel}>Отменить</a>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          Изменить
        </Typography.Link>
      );
    },
  }] : data;
}