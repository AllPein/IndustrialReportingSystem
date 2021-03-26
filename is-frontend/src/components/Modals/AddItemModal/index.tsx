import React, { useEffect, useState } from 'react';
import * as UI from './styles';
import { Item } from '../../../models/Item';
import { Input, Typography, Button, Row, Col, DatePicker, Select } from 'antd';
import { findCountry } from '../../../helpers/countries';
import { throttle } from '../../../helpers/throttle';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU'
import { useDispatch, useSelector } from 'react-redux';
import { addNewItem, errorSelector } from '../../../store/modules/items';
import { setShowModal } from '../../../store/modules/modal';
import { openNotification } from '../../../helpers/notification';

interface IAddItemModalProps {
  cellId?: string;
}

const AddItemModal: React.FC<IAddItemModalProps> = ({ cellId }) => {
  const dispatch = useDispatch();

  const error = useSelector(errorSelector);
  
  const [nameValue, setNameValue] = useState<string | null>(null);
  const [priceValue, setPriceValue] = useState<number>(0);
  const [supplyCodeValue, setSupplyCodeValue] = useState<string | null>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [country, setCountry] = useState<string | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString());

  useEffect(() => {
    if (!!error) {
      openNotification('Ошибка добавления', 'Пожалуйста, проверьте правильность введенных данных');
    }
  }, [error]);

  const handleNameChange = (e: any) => {
    setNameValue(e.target.value);
  };

  const handlePriceChange = (e: any) => {
    setPriceValue(+e.target.value);
  };

  const handleSupplyCodeChange = (e: any) => {
    setSupplyCodeValue(e.target.value);
  };

  const handleCountrySearch = throttle(async (e: any) => {
    const countries = await findCountry(e);

    setCountries(countries);
  }, 500);

  const handleCountryChange = (e: any) => {
    setCountry(e);
  }

  const handleDateChange = (date: any) => {
    const d = new Date(date.valueOf());
    setDate(d.toISOString());
  }

  const addItem = async () => {
    await dispatch(addNewItem({ cellId, name: nameValue, price: priceValue, status: 'INSTOCK', country, expiresAt: date, supplyCode: supplyCodeValue }));
  }

  const closeModal = () => {
    dispatch(setShowModal(false));
  }
  
  return (
    <UI.ItemsModal>
      <Row gutter={18}>
        <Col span={12}>
          <Typography.Text>Название товара</Typography.Text>
          <Input value={nameValue?.toString()} onChange={handleNameChange} />

        </Col>
        <Col span={12}>
          <Typography.Text>Цена (руб.)</Typography.Text>
          <Input type='number' value={priceValue?.toString()} onChange={handlePriceChange} />
        </Col>
      </Row>

      <Row gutter={18}>
        <Col span={12}>
          <UI.Wrapper>
            <Typography.Text>Номер поставки</Typography.Text>
            <Input value={supplyCodeValue?.toString()} onChange={handleSupplyCodeChange} />
          </UI.Wrapper>

        </Col>
        <Col span={12}>
          <UI.Wrapper>
            <Typography.Text>Годен до</Typography.Text><br />
            <DatePicker
              onChange={handleDateChange}
              placeholder='Выберите дату'
              locale={locale}
              style={{ width: '100%' }}
            />
          </UI.Wrapper>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <UI.Wrapper>
            <Typography.Text>Страна</Typography.Text>
            <Select
              style={{ width: '100%' }}
              onChange={handleCountryChange}
              onSearch={handleCountrySearch}
              showSearch
              options={countries}
            />
          </UI.Wrapper>

        </Col>
      </Row>

      <Row gutter={18}>
        <Col span={12}>
          <UI.Wrapper>
            <Button
              onClick={closeModal}
              style={{ width: '100%', marginTop: 16 }}
            >
              Отмена
            </Button>
          </UI.Wrapper>
        </Col>
        <Col span={12}>
          <UI.Wrapper>
            <Button
              onClick={addItem}
              type='primary'
              style={{ width: '100%', marginTop: 16 }}
            >
              Добавить
            </Button>
          </UI.Wrapper>

        </Col>


      </Row>

    </UI.ItemsModal>
  )
};

export default AddItemModal;