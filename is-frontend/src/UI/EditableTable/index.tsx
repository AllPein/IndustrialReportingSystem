import React, { useState, useEffect } from 'react';
import { Table, Form } from 'antd';
import { useSelector } from 'react-redux';
import { roleSelector } from '../../store/modules/auth/userInfo';
import EditableCell from './EditableCell';
import { Item } from '../../models/Item';
import { Cell } from '../../models/Cell';
import { Equipment } from '../../models/Equipment';

interface IItemsProps {
  loading: boolean;
  columns: Function;
  originData: Array<any>;
  recordType: Item | Cell | Equipment;
  onCountryChange?: Function;
  countriesOptions?: Array<object>
}


const EditableTable: React.FC<IItemsProps> = ({
  loading,
  columns,
  originData,
  recordType,
  countriesOptions,
  onCountryChange
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
        title: col.title,
        editing: isEditing(record),
        onCountryChange: onCountryChange
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
        }}
      />
    </Form>
  );
}
export default EditableTable;