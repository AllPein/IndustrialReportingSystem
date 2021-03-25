import React, { useCallback, useMemo, useState } from 'react';
import * as UI from './styles';
import moment from 'moment';
import { Item } from '../../models/Item';
import { columns } from './columns';
import EditableTable from '../../UI/EditableTable';
import { throttle } from '../../helpers/throttle';
import { useDispatch, useSelector } from 'react-redux';
import { loadingSelector, updateAllItems } from '../../store/modules/items';
import { Button } from 'antd';
import { setModalContent, setShowModal } from '../../store/modules/modal';
import AddItemModal from '../Modals/AddItemModal';
import { findCountry } from '../../helpers/countries';
import { getMappedItems } from '../../helpers/items';


interface IItemsProps {
  items: Item[],
}

const Items: React.FC<IItemsProps> = ({
  items,
}) => {

  const [countries, setCountries] = useState<object[]>([]);
  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();


  const handleCountrySearch = throttle(async (e: any) => {
    const countries = await findCountry(e);

    setCountries(countries);
  }, 500);

  const handleAddItemClick = useCallback(() => {
    dispatch(setShowModal(true));
    dispatch(setModalContent(<AddItemModal />));
  }, [items]);

  const handleUpdate = useCallback((newItems: Partial<Item>[]) => {
    dispatch(updateAllItems(newItems));
  }, [items]);

  return (
    <UI.ItemsWrapper>
      <EditableTable
        originData={items}
        loading={loading}
        onUpdate={handleUpdate}
        onSearch={handleCountrySearch}
        countriesOptions={countries}
        recordType={!!items[0] && items[0]}
        columns={columns}
      />
      <Button type='primary' onClick={handleAddItemClick}>Добавить товар</Button>
    </UI.ItemsWrapper>
  );
}

export default Items;
