import React, { useMemo } from 'react';
import { Form, Input, Select } from 'antd';
import { Item } from '../../models/Item';

interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: string;
  selectOptions?: Array<any>;
  onCountryChange: Function;
  record: Item;
  index: number;
  children: React.ReactNode;
  countriesOptions?: Array<any>;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  selectOptions,
  countriesOptions,
  onCountryChange,
  index,
  children,
  ...restProps
}) => {
  const inputNode = useMemo(() => {
    if (inputType === 'input') {
      return <Input />;
    } else {
      if (dataIndex !== 'country') {
        return <Select options={selectOptions} />
      }
      else {
        return <Select onSearch={e => onCountryChange(e)} showSearch options={countriesOptions} />
      }
    }
  }, [dataIndex, countriesOptions]);


  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Пожалуйста, введите ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;