import React, { useCallback, useMemo, useState } from 'react';
import * as UI from './styles';
import moment from 'moment';
import { Item } from '../../models/Item';
import { columns } from './columns';
import EditableTable from '../../UI/EditableTable';
import { findCountry } from '../../api/countries';
import 'moment/locale/ru';
import { Equipment as EquipmentModel } from '../../models/Equipment';
import { useSelector, useDispatch } from 'react-redux';
import { loadingSelector, updateAllEquipment } from '../../store/modules/equipment';
import { getMappedItems } from '../../helpers/items';
import { setModalContent, setShowModal } from '../../store/modules/modal';
import AddExactItem from '../Modals/AddExactItem';
import { Button } from 'antd';
import AddEquipmentModal from '../Modals/AddEquipmentModal';

moment.locale('ru');

interface IEquipmentProps {
  equipment: EquipmentModel[],
  items: Item[]
}

const Equipment: React.FC<IEquipmentProps> = ({
  equipment,
  items
}) => {

  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  const filteredEquipment = useMemo(() => {
    return equipment.map((eq: EquipmentModel) => {
      return {
        ...eq,
        items: getMappedItems(eq.items)
      }
    })
  }, [equipment]);

  const filterItems = (eqId: string) => {
    const newItems = items.filter((item: any) => item.equipmentId !== eqId &&  (item.status !== 'На складе'));
    return newItems;
  };

  const handleAddEquipmentClick = useCallback(() => {
    dispatch(setShowModal(true));
    dispatch(setModalContent(<AddEquipmentModal />));
  }, [items]);

  const handleAddItem = (eqId: string) => {
    const filteredItems = filterItems(eqId);
    dispatch(setShowModal(true));
    dispatch(setModalContent(<AddExactItem eqId={eqId} items={filteredItems} />))
  };

  const handleUpdate = useCallback((newEquipment: Partial<EquipmentModel>[]) => {
    dispatch(updateAllEquipment(newEquipment));
  }, [equipment]);

  return (
    <UI.EquipmentWrapper>
      <EditableTable
        onButtonClick={handleAddItem}
        originData={filteredEquipment}
        loading={loading}
        onUpdate={handleUpdate}
        recordType={!!equipment[0] && equipment[0]}
        columns={columns}
      />
      <Button type='primary' onClick={handleAddEquipmentClick}>Добавить оборудование</Button>
    </UI.EquipmentWrapper>
  );
}

export default Equipment;
