import { SettingOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import {Button, Card} from 'antd';
import React from 'react';

const Metahuman: React.FC<{ id: number; name: string; description: string; image: string; status: string }> = ({
  id,
  name,
  description,
  image,
  status
}) => {

  const { initialState} = useModel('@@initialState');

  const currentUserDetails = initialState?.currentUser;

  const is_active = status === 'online';

  const goToCardConfigPage = () => {
    history.push('/character-details/${id}', {
      id: id,
      name: name,
      description: description,
      image: image,
    });
  };

  const handleDelete = () => {

  }

  const handleActivateOrDeactivate = () => {

  }

  return (
    <Card
      title={name}
      bordered={false}
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={image} />}
      actions={
          currentUserDetails?.access === 'admin' ? [
              <SettingOutlined key="setting" onClick={goToCardConfigPage} />,
              <DeleteOutlined key="delete" onClick={handleDelete} />,
              <Button key="activate-deactivate" onClick={handleActivateOrDeactivate}>
                  {is_active ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
                  {is_active ? 'Deactivate' : 'Activate'}
              </Button>
          ] : []
      }
    >
      {description}
    </Card>
  );
};

export default Metahuman;
