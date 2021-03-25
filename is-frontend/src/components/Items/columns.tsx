import React from 'react';
import { Item } from '../../models/Item';
import { Typography } from 'antd';

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
      title: 'Номер поставки',
      dataIndex: 'supplyCode',
      inputType: '',
      sorter: (a: any, b: any) => a.supplyCode - b.supplyCode,
      editable: false
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      inputType: 'number',
      sorter: (a: any, b: any) => a.price - b.price,
      editable: true
    },
    {
      title: 'Дата поставки',
      dataIndex: 'departureAt',
      inputType: '',
      sorter: (a: any, b: any) => a.expiresAt - b.expiresAt,
      editable: false
    },
    {
      title: 'Годен до',
      dataIndex: 'expiresAt',
      inputType: 'input',
      sorter: (a: any, b: any) => a.departureAt - b.departureAt,
      editable: false
    },
    {
      title: 'Страна',
      dataIndex: 'country',
      inputType: 'search',
      sorter: (a: any, b: any) => a.country - b.country,
      editable: true
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      inputType: 'select',
      selectOptions: [
        {
          label: 'На складе',
          value: 'INSTOCK'         
        },
        {
          label: 'Отправлен',
          value: 'SENT'
        }
      ],
      sorter: (a: any, b: any) => a.status - b.status,
      editable: true
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