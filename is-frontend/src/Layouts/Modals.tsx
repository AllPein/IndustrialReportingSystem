import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { showModalSelector, modalContentSelector, modalTitleSelector, setShowModal } from '../store/modules/modal';

const ModalsLayout = () => {
  const dispatch = useDispatch();
  const content = useSelector(modalContentSelector);
  const showModal = useSelector(showModalSelector);
  const modalTitle = useSelector(modalTitleSelector);

  const handleCancel = () => {
    dispatch(setShowModal(false));
  }

  return (
    <Modal
      visible={showModal}
      title={modalTitle}
      footer={null}
      centered
      onCancel={handleCancel}
    >
      {content}
    </Modal>
  );
};

export default ModalsLayout;
