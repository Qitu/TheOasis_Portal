// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PageContainer } from '@ant-design/pro-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Metahuman from '@/components/Metahuman';
import {Button, Card, Col, Form, Row, Select, Space} from 'antd';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/request';
import { categories } from './MetahumanDetail/Profile';
import CreateMetahuman from './CreateMetahuman/';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Meta } = Card;

const { Option } = Select;

const Admin: React.FC = () => {
  let [cards, setCards] = useState(
    [] as { mid: number; name: string; description: string; avatarid: string; status: string }[],
  );

  let [condition, setCondition] = useState({});

  const setConditionVal = (keyName: string, value: any) => {
    let newVal:any = condition;
    newVal[keyName] = value;
    setCondition({...newVal})
  }

  const queryList = async () => {
    try {
      let searchCond:any = {}
      for (const [keyname, value] of Object.entries(condition)) {
        if(value)
          searchCond[keyname] = value;
      }
      const res = await axiosInstance.post('/sys/metahuman/list', searchCond);
      if(res.data.obj instanceof Array) {
        setCards(res.data.obj);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    // get Metahuman card data from back-end and update the status
    queryList()
  }, []);

  return (
    <div>
      {/* 选项框部分 */}
      <Card>
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            {/* <Col span={8}>
              <Form.Item label="Name">
                <Input defaultValue="" style={{ width: '100%' }} onChange={(value) => {
                  setConditionVal('name', value);
                }}/>
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item label="Gender">
                <Select defaultValue="" style={{ width: '100%' }} onSelect={(value: string) => {
                  setConditionVal('gender', value);
                }}>
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Category">
                <Select style={{ width: '100%' }} onSelect={(value: string) => {
                  setConditionVal('category', value);
                }} options={categories} />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <Button type="primary" onClick={() => queryList()}>
              Search
            </Button>
            { CreateMetahuman(queryList) }
          </Space>
        </Form>
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {' '}
        {/* 使用 Row 和 Col 来布局卡片，gutter 设置卡片之间的间距 */}
        {cards.map((card, index) => (
          <Col lg={6} xs={24} sm={12} md={8}  key={index}>
            {' '}
            {/* 每行显示三个卡片，所以设置 Col 的 span 为 8 */}
            <Metahuman
              id={card.mid}
              name={card.name}
              description={card.description}
              avatarid={card.avatarid}
              status={card.status}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Admin;
