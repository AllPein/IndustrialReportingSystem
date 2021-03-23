import React, { useMemo, useState } from 'react';
import * as UI from './styles';
import moment from 'moment';
import { Item } from '../../models/Item';
import { columns } from './columns';
import EditableTable from '../../UI/EditableTable';
import { throttle } from '../../helpers/throttle';
import { findCountry } from '../../api/countries';
import 'moment/locale/ru'; 

moment.locale('ru');

interface IItemsProps {
  items: Item[],
  loading: boolean
}

const Items: React.FC<IItemsProps> = ({
  items,
  loading,
}) => {

  const filteredItems = useMemo(() => {
    return items.map((item) => {
      return {
        ...item,
        departureAt: moment(item.departureAt).format('llll'),
        expiresAt: moment(item.expiresAt).format('llll')
      }
    });
  }, [items]);
  const [countries, setCountries] = useState<Array<object>>([]);

  const handleCountryChange = throttle(async (value: string) => {
    if (value.length > 0) {
      const newCountries = (await findCountry(value)).map((country: { name: any; }) => {
        return { value: country.name, label: country.name }
      });
      setCountries(newCountries);
    }

  }, 500);

  return (
    <UI.ItemsWrapper>
      <EditableTable
        originData={filteredItems}
        loading={loading}
        onCountryChange={handleCountryChange}
        countriesOptions={countries}
        recordType={!!items[0] && items[0]}
        columns={columns}
      />
    </UI.ItemsWrapper>
  );
}

export default Items;
