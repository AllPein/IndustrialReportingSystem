import { notification } from 'antd';

export const openNotification = (title: string, description: string) => {
  const args = {
    message: title,
    description,
    duration: 3,
  };
  notification.open(args);
};
