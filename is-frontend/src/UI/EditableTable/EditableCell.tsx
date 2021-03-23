import React, { MouseEventHandler, useMemo } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Item } from '../../models/Item';
import { PlusCircleFilled } from '@ant-design/icons';

interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: string;
  selectOptions?: any[];
  onCountryChange: Function;
  record: Item;
  index: number;
  onButtonClick: any;
  children: React.ReactNode;
  countriesOptions?: any[];
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
  onButtonClick,
  ...restProps
}) => {
  const inputNode = useMemo(() => {
    if (inputType === 'input') {
      return <Input />;
    }
    else if (inputType === 'button'){
      return <Button icon={<PlusCircleFilled />} onClick={() => onButtonClick(record.id)}></Button>
    }
    else if (inputType === 'number') {
      return <Input type='number' />;
    }
    else {
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
          {dataIndex !=='items' ? inputNode : (
            <>
              {children}
              {inputNode}
            </>
          )}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;