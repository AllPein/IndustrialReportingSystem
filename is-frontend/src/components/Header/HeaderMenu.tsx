import React from 'react';
import { Menu, Button } from 'antd';

interface IHeaderMenuProps {
  role: string;
  onLogout: React.MouseEventHandler<HTMLElement>;
}

const HeaderMenu: React.FC<IHeaderMenuProps> = ({ role, onLogout }) => {
  return (
    <Menu>
      <Menu.Item disabled>
        {`Роль: ${role}`}
      </Menu.Item>
      <Button type='text' block onClick={onLogout}>
        Выйти
      </Button>
    </Menu>
  )
};

export default HeaderMenu;