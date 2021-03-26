import React, { MouseEventHandler, useMemo } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Item } from '../../models/Item';
import { PlusCircleFilled } from '@ant-design/icons';
import colors from '../../constants/colors';

interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: string;
  selectOptions?: any[];
  onSearch: Function;
  record: Item;
  cancel: any;
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
  onSearch,
  index,
  children,
  cancel,
  onButtonClick,
  ...restProps
}) => {

  const handleButtonEdit = () => {
    onButtonClick(record.id);
    cancel();
  }

  const inputNode = useMemo(() => {
    if (inputType === 'input') {
      return <Input />;
    }
    else if (inputType === 'button'){
      return <Button
              type='primary' 
              icon={<PlusCircleFilled  color={colors.white} />} 
              onClick={handleButtonEdit}
              style={{ marginLeft: 12 }}
              />

    }
    else if (inputType === 'number') {
      return <Input type='number' />;
    }
    else {
      if (dataIndex !== 'country') {
        return <Select options={selectOptions} />
      }
      else {
        return <Select onSearch={e => onSearch(e)} showSearch options={countriesOptions} />
      }
    }

  }, [dataIndex, countriesOptions, record]);


  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: dataIndex !=='items' && true,
              message: `Пожалуйста, введите ${title}!`,
            },
          ]}
        >
          {dataIndex !=='items' ? 
          inputNode : (
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