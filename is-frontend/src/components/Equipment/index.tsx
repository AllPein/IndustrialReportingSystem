import React, { useMemo, useState } from 'react';
import * as UI from './styles';
import moment from 'moment';
import { Item } from '../../models/Item';
import { columns } from './columns';
import EditableTable from '../../UI/EditableTable';
import { findCountry } from '../../api/countries';
import 'moment/locale/ru';
import { Equipment as EquipmentModel } from '../../models/Equipment';
import { useSelector } from 'react-redux';
import { loadingSelector } from '../../store/modules/equipment';
import { mappedItemsByDate } from '../../helpers/items';

moment.locale('ru');

interface IEquipmentProps {
  equipment: EquipmentModel[],
}

const Equipment: React.FC<IEquipmentProps> = ({
  equipment,
}) => {

  const loading = useSelector(loadingSelector);

  const filteredEquipment = useMemo(() => {
    return equipment.map((eq: EquipmentModel) => {
      return {
        ...eq,
        items: mappedItemsByDate(eq.items)
      }
    })
  }, [equipment]);

  return (
    <UI.EquipmentWrapper>
      <EditableTable
        originData={filteredEquipment}
        loading={loading}
        recordType={!!equipment[0] && equipment[0]}
        columns={columns}
      />
    </UI.EquipmentWrapper>
  );
}

export default Equipment;
