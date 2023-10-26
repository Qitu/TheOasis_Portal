// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Metahuman from '@/components/Metahuman';
import {Card, Col, Form, Input, Row, Select} from 'antd';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/request';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Meta } = Card;

const { Option } = Select;

const Admin: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const intl = useIntl();
  let [cards, setCards] = useState(
    [] as { mid: number; name: string; gender: string; category: string; description: string; image: string; status: string }[],
  );

  const [nameFilter, setNameFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleGenderChange = (value: string) => {
    setGenderFilter(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  useEffect(() => {
    // get Metahuman card data from back-end and update the status
    (async () => {
      try {
        const res = await axiosInstance.post('/sys/metahuman/list', {});
        console.log(res)

        // let arrayData = res.data.obj;

        // mock
        // this is fake data
        let arrayData = [
          {
            mid: 1,
            name: 'Card 1',
            description: 'Content for card 1',
            image: 'https://models.readyplayer.me/651e3c55dab353c6356989fe.png',
            status: "online",
            gender: "male",
            category: "Superhuman"
          },
          {
            mid: 2,
            name: 'Card 2',
            description: 'Content for card 2',
            image: 'https://models.readyplayer.me/64e3055495439dfcf3f0b665.png',
            status: "online",
            gender: "male",
            category: "Human"
          },
          {
            mid: 3,
            name: 'Card 3',
            description: 'Content for card 3',
            image: 'https://models.readyplayer.me/651e3c55dab353c6356989fe.png',
            status: "offline",
            gender: "female",
            category: "Superhuman"
          },
          {
            mid: 4,
            name: 'Card 5',
            description: 'Content for card 4',
            image: 'https://models.readyplayer.me/651e3c55dab353c6356989fe.png',
            status: "offline",
            gender: "others",
            category: "Freak"
          },
        ];
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
      <Card title="Filter the characters you want">
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item label="Name">
                <Input defaultValue="" style={{ width: '100%' }} onChange={handleNameChange} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Gender">
                <Select defaultValue="" style={{ width: '100%' }} onChange={handleGenderChange}>
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="others">others</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Category">
                <Select defaultValue="" style={{ width: '100%' }} onChange={handleCategoryChange}>
                  <Option value="Superhuman">Superhuman</Option>
                  <Option value="Human">Human</Option>
                  <Option value="Freak">Freak</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {cards.filter(card =>
            card.name.includes(nameFilter) &&
            (genderFilter ? card.gender === genderFilter : true) &&
            (categoryFilter ? card.category === categoryFilter : true)
        ).map((card, index) => (
            <Col span={8} key={index}>
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
