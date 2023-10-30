// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Button, Card, Col, Form, Row, Select, Space} from 'antd';
import Metahuman from '@/components/Metahuman';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/request';
import { categories } from './MetahumanDetail/Profile';
import CreateMetahuman from './CreateMetahuman/';
import { useModel } from '@umijs/max';

const { Option } = Select;

const Admin: React.FC = () => {
  let [cards, setCards] = useState(
    [] as { mid: number; name: string; subname: string; avatarid: string; status: string }[],
  );

  let [condition, setCondition] = useState({});
  const { initialState, setInitialState } = useModel('@@initialState');
  
  
  const IsAdmin = () => {
    return initialState?.currentUser?.access == 'admin'
  }

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
            <Col span={12}>
              <Form.Item label="Gender">
                <Select defaultValue="" style={{ width: '100%' }} onSelect={(value: string) => {
                  setConditionVal('gender', value);
                }}>
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Category">
                <Select style={{ width: '100%' }} onSelect={(value: string) => {
                  setConditionVal('category', value);
                }} options={categories} />
              </Form.Item>
            </Col>
          </Row>
          <Space style={{ float: 'right'}}>
            { IsAdmin() && CreateMetahuman(queryList) }
            <Button type="primary" onClick={() => queryList()}>
              Search
            </Button>
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
              description={card.subname}
              avatarid={card.avatarid}
              status={card.status}
              deleteCallback={queryList}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Admin;
