import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import {Button, Card, Tooltip} from 'antd';
import React from 'react';

const Metahuman: React.FC<{
  id: number;
  name: string;
  description: string;
  avatarid: string;
  status: string;
}> = ({ id, name, description, avatarid, status }) => {
  const { initialState } = useModel('@@initialState');

  const currentUserDetails = initialState?.currentUser;

  const is_active = status === 'online';

  const goToCardConfigPage = () => {
    history.push(`/metahuman/${id}`, {
      id: id,
      name: name,
      description: description,
      avatarid: avatarid,
    });
  };

  const handleDelete = () => {};

  const handleActivateOrDeactivate = () => {};

  return (
      <Card
          title={name}
          bordered={false}
          hoverable
          // style={{ width: 340 }}
          cover={<img alt="example" src={`https://models.readyplayer.me/${avatarid}.png`} />}
          onClick={goToCardConfigPage} 
          actions={
              currentUserDetails?.access === 'admin'
                  ? [
                      <SettingOutlined key="setting" />,
                      <DeleteOutlined key="delete" onClick={handleDelete} />,
                      <Tooltip title={is_active ? "Deactivate" : "Activate"} key="activate-deactivate">
                          <Button
                              onClick={handleActivateOrDeactivate}
                              style={{ backgroundColor: is_active ? 'green' : 'red' }}
                          >
                              {is_active ? <CheckCircleOutlined style={{ color: 'white' }}/> : <CloseCircleOutlined style={{ color: 'white' }}/>}
                          </Button>
                      </Tooltip>,
                  ]
                  : []
          }
      >
          {description}
      </Card>

  );
};

export default Metahuman;
