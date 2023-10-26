// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Metahuman from '@/components/Metahuman';
import { Card, Col, Form, Row, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/request';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Meta } = Card;

const { Option } = Select;

const Admin: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const intl = useIntl();
  let [cards, setCards] = useState(
    [] as { mid: number; name: string; description: string; image: string; status: string }[],
  );

  useEffect(() => {
    // get Metahuman card data from back-end and update the status
    (async () => {
      try {
        const res = await axiosInstance.post('/sys/metahuman/list', {});
        console.log(res);

        const response = await axios.post('/sys/metahuman/list', {});
        let arrayData = response.data.obj;

        // mock
        arrayData[0].image = 'https://models.readyplayer.me/651e3c55dab353c6356989fe.png';
        arrayData[1].image = 'https://models.readyplayer.me/64e3055495439dfcf3f0b665.png';

        setCards(arrayData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <PageContainer>
      {/* 选项框部分 */}
      <Form layout="vertical">
        {' '}
        {/* 使用垂直布局 */}
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item label="Gender">
              {' '}
              {/* 添加标签 */}
              <Select defaultValue="male" style={{ width: '100%' }}>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="others">others</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="标签2">
              <Select defaultValue="option1" style={{ width: '100%' }}>
                <Option value="option1">选项1</Option>
                <Option value="option2">选项2</Option>
                <Option value="option3">选项3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="标签3">
              <Select defaultValue="option1" style={{ width: '100%' }}>
                <Option value="option1">选项1</Option>
                <Option value="option2">选项2</Option>
                <Option value="option3">选项3</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {' '}
        {/* 使用 Row 和 Col 来布局卡片，gutter 设置卡片之间的间距 */}
        {cards.map((card, index) => (
          <Col span={8} key={index}>
            {' '}
            {/* 每行显示三个卡片，所以设置 Col 的 span 为 8 */}
            <Metahuman
              id={card.mid}
              name={card.name}
              description={card.description}
              image={card.image}
              status={card.status}
            />
          </Col>
        ))}
      </Row>

      {/* original content */}
      {/*<Card>*/}
      {/*  <Alert*/}
      {/*    message={intl.formatMessage({*/}
      {/*      id: 'xxx',*/}
      {/*      defaultMessage: 'Faster and stronger heavy-duty components have been released.',*/}
      {/*    })}*/}
      {/*    type="success"*/}
      {/*    showIcon*/}
      {/*    banner*/}
      {/*    style={{*/}
      {/*      margin: -12,*/}
      {/*      marginBottom: 48,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <Typography.Title level={2} style={{ textAlign: 'center' }}>*/}
      {/*    <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You*/}
      {/*  </Typography.Title>*/}
      {/*</Card>*/}
      {/*<p style={{ textAlign: 'center', marginTop: 24 }}>*/}
      {/*  Want to add more pages? Please refer to{' '}*/}
      {/*  <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">*/}
      {/*    use block*/}
      {/*  </a>*/}
      {/*  。*/}
      {/*</p>*/}
    </PageContainer>
  );
};

export default Admin;
