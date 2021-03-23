import React from 'react';
import * as UI from './styles';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import HeaderMenu from './HeaderMenu';
import {Typography} from 'antd';
import colors from '../../constants/colors';

interface IHeaderProps {
  username: string;
  role: string;
  onLogout: React.MouseEventHandler<HTMLElement>;
}

const Header: React.FC<IHeaderProps> = ({ username, role, onLogout }) => {

  return (
    <UI.HeaderWrapper>
      <Typography.Title level={2}>Информационная система</Typography.Title>
      <Dropdown overlay={<HeaderMenu role={role} onLogout={onLogout} />} placement="bottomCenter" trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {username} <DownOutlined />
        </a>
      </Dropdown>
    </UI.HeaderWrapper>
  )
}

export default Header;