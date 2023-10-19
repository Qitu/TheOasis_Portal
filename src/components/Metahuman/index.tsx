import { SettingOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Card } from 'antd';
import React from 'react';

const Metahuman: React.FC<{ id: number; name: string; description: string; image: string }> = ({
  id,
  name,
  description,
  image,
}) => {
  const goToCardConfigPage = () => {
    history.push('/character-details/${id}', {
      id: id,
      name: name,
      description: description,
      image: image,
    });
  };

  return (
    <Card
      title={name}
      bordered={false}
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={image} />}
      actions={[<SettingOutlined key="setting" onClick={goToCardConfigPage} />]}
    >
      {description}
    </Card>
  );
};

export default Metahuman;
