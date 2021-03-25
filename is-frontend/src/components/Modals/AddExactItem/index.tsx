import React, { useCallback, useMemo, useState } from 'react';
import * as UI from '../AddItemModal/styles';
import { Item } from '../../../models/Item';
import { Input, Typography, Button, Row, Col, DatePicker, Select } from 'antd';
import { findCountry } from '../../../helpers/countries';
import { throttle } from '../../../helpers/throttle';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU'
import { useDispatch } from 'react-redux';
import { addNewItem } from '../../../store/modules/items';
import { setModalContent, setShowModal } from '../../../store/modules/modal';
import ItemsPopover from '../../Popovers/ItemsPopover';
import { addItemToCell } from '../../../store/modules/cells';
import { addItemToEquipment } from '../../../store/modules/equipment';

interface AddExactItemProps {
  items: any;
  cellId?: string;
  eqId?: string;
}

const AddExactItem: React.FC<AddExactItemProps> = ({ items, cellId, eqId }) => {
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);


  const addNewItemtoCell = async () => {
    const item = { id: selectedItem?.id, cellId };
    dispatch(addItemToCell(item));
    closeModal();
    dispatch(setModalContent(null));
  };

  const addNewItemToEquipment= async () => {
    const item = { id: selectedItem?.id, equipmentId: eqId };
    dispatch(addItemToEquipment(item));
    closeModal();
    dispatch(setModalContent(null));
  };

  const handleAddButtonClick = () => {
    if (!!cellId) addNewItemtoCell();
    else addNewItemToEquipment();
  }

  const handleSelectItem = (itemId: string) => {
    const item = items.filter((item: Item) => item.id === itemId)[0];
    setSelectedItem(item);
  };

  const itemsOptions = useMemo((): any => {
    return items.map((item: Item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }, [items]);

  const closeModal = () => {
    dispatch(setShowModal(false));
  }

  return (
    <UI.ItemsModal>
      <Select
        style={{ width: "100%" }}
        options={itemsOptions}
        onChange={handleSelectItem}
      />
      {!!selectedItem &&
        <ItemsPopover item={selectedItem} />
      }
      <Row style={{ marginTop: 24 }} gutter={18}>
        <Col span={12}>
          <Button style={{ width: '100%' }} onClick={closeModal}>Отмена</Button>
        </Col>
        <Col span='12'>
          <Button onClick={handleAddButtonClick} style={{ width: '100%' }} type='primary' disabled={selectedItem === null}>Добавить</Button>
        </Col>
      </Row>

    </UI.ItemsModal>
  )
};

export default AddExactItem;