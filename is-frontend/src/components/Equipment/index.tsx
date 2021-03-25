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

  const filteredItems = useCallback((eqId: string) => {
    return items.filter((item: any) => item.cellId !== eqId)
  }, [items]);

  const handleAddItem = useCallback((eqId: string) => {
    dispatch(setShowModal(true));
    dispatch(setModalContent(<AddExactItem items={filteredItems(eqId)} eqId={eqId} />))
  }, [equipment]);

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
    </UI.EquipmentWrapper>
  );
}

export default Equipment;
