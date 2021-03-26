import React, { useState, useEffect } from 'react';
import { Table, Form } from 'antd';
import { useSelector } from 'react-redux';
import { roleSelector } from '../../store/modules/auth/userInfo';
import EditableCell from './EditableCell';
import { Item } from '../../models/Item';
import { Cell } from '../../models/Cell';
import { Equipment } from '../../models/Equipment';
import { getReversedStatus } from '../../helpers/items';

interface IItemsProps {
  loading: boolean;
  columns: Function;
  originData: any[];
  recordType: Item | Cell | Equipment;
  onSearch?: Function;
  onButtonClick?: any;
  onUpdate?: Function;
  countriesOptions?: any[]
}


const EditableTable: React.FC<IItemsProps> = ({
  loading,
  columns,
  originData,
  recordType,
  onUpdate,
  onButtonClick,
  countriesOptions,
  onSearch
}) => {

  const role = useSelector(roleSelector);

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState<string | undefined>('');

  useEffect(() => {
    setData(originData);
  }, [originData]);

  const isEditing = (record: typeof recordType) => record.id === editingKey;

  const edit = (record: Partial<typeof recordType> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as typeof recordType;

      const newData = [...data];
      const index = newData.findIndex(item => key === item.id);

      if (index > -1) {
        const item = newData[index];

        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }

      const filteredData = newData.map((item: any) => {
        return {
          ...item,
          departureAt: undefined,
          expiresAt: undefined,
          cellId: !!item.cellId ? item.cellId : undefined,
          status: getReversedStatus(item.status),
          price: !!item.price ? +item.price : undefined,
          equipmentId: !!item.equipmentId ? item.equipmentId : undefined,
          pavilion: !!item.pavilion ? {
            connect: {
              code: item.pavilion.code
            }
          } : undefined,
          pavilionId: undefined,
          items: undefined
        }

      });

      (!!onUpdate) && onUpdate(filteredData);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const mergedColumns = columns(editingKey, role === 'ADMIN', cancel, save, edit, isEditing).map((col: { editable: any; dataIndex: string; title: any; inputType: string; selectOptions?: Array<object> }) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: typeof recordType) => ({
        record,
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        countriesOptions: countriesOptions,
        selectOptions: col.selectOptions,
        cancel,
        title: col.title,
        editing: isEditing(record),
        onSearch,
        onButtonClick
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        loading={loading}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
          pageSize: 10
        }}
      />
    </Form>
  );
}
export default EditableTable;