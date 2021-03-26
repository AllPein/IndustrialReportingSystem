import React, { useEffect, useState } from 'react';
import * as UI from '../AddItemModal/styles';
import { Item } from '../../../models/Item';
import { Input, Typography, Button, Row, Col, DatePicker, Select } from 'antd';
import { findCountry } from '../../../helpers/countries';
import { throttle } from '../../../helpers/throttle';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU'
import { useDispatch, useSelector } from 'react-redux';
import { addNewEquipment, errorSelector } from '../../../store/modules/equipment';
import { setShowModal } from '../../../store/modules/modal';
import { openNotification } from '../../../helpers/notification';



const AddItemModal: React.FC = () => {
  const dispatch = useDispatch();

  const error = useSelector(errorSelector);

  const [nameValue, setNameValue] = useState<string | null>(null);
  const [equipmentCodeValue, setEquipmentCodeValue] = useState<string | null>(null);
  const [pavilionCodeValue, setPavilionCodeValue] = useState<string | null>(null);

  useEffect(() => {
    if (!!error) {
      openNotification('Ошибка добавления', 'Пожалуйста, проверьте правильность введенных данных');
    }
  }, [error]);

  const handleNameChange = (e: any) => {
    setNameValue(e.target.value);
  };

  const handlePavilionCodeChange = (e: any) => {
    setPavilionCodeValue(e);
  };

  const handleCodeChange = (e: any) => {
    setEquipmentCodeValue(e.target.value);
  };

  const createEquipment = async () => {
    await dispatch(addNewEquipment({
      name: nameValue!,
      pavilion: {
        code: pavilionCodeValue!
      },
      code: equipmentCodeValue!
    }));


  }


  const closeModal = () => {
    dispatch(setShowModal(false));
  }
  return (
    <UI.ItemsModal>
      <Row gutter={18}>
        <Col span={12}>
          <Typography.Text>Наименование</Typography.Text>
          <Input value={nameValue?.toString()} onChange={handleNameChange} />

        </Col>
        <Col span={12}>
          <Typography.Text>Код оборудования</Typography.Text>
          <Input value={equipmentCodeValue?.toString()} onChange={handleCodeChange} />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <UI.Wrapper>
            <Typography.Text>Код павильона</Typography.Text>
            <Select
              style={{ width: '100%' }}
              onChange={handlePavilionCodeChange}
              value={pavilionCodeValue?.toString()}
              options={[
                {
                  label: 'A1',
                  value: 'A1'
                },
                {
                  label: 'A2',
                  value: 'A2'
                },
                {
                  label: 'A3',
                  value: 'A3'
                },
                {
                  label: 'A4',
                  value: 'A4'
                },
                {
                  label: 'A5',
                  value: 'A5'
                },
                {
                  label: 'A6',
                  value: 'A6'
                },
                {
                  label: 'B1',
                  value: 'B1'
                },
                {
                  label: 'B2',
                  value: 'B2'
                },
                {
                  label: 'B3',
                  value: 'B3'
                },
                {
                  label: 'B4',
                  value: 'B4'
                }
              ]}
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
              onClick={createEquipment}
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