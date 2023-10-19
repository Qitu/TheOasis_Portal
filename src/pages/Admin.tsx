// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, Col, Row, Button, Modal, Space } from 'antd';
import React, {useEffect, useState} from 'react';
import Metahuman from "@/components/Metahuman";
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Meta } = Card;

const Admin: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const intl = useIntl();
  const [cards, setCards] = useState([] as { id: number; name: string; description: string; image: string }[]);

  useEffect(() => {

      const fetchData = async () => {
          try {
              const response = await axios.get('/sys/metahuman/list');
              console.log(response)
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();

      // get Metahuman card data from back-end and update the status
      // this is fake data
      const fakeData = [
          { id:1, name: 'Card 1', description: 'Content for card 1', image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" },
          { id:2, name: 'Card 2', description: 'Content for card 2', image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" },
          { id:3, name: 'Card 3', description: 'Content for card 3', image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" },
          { id:4, name: 'Card 4', description: 'Content for card 4', image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" },
      ];
      setCards(fakeData);
  }, []);

  return (
    <PageContainer>

        <Row gutter={[16, 16]}> {/* 使用 Row 和 Col 来布局卡片，gutter 设置卡片之间的间距 */}
            {cards.map((card, index) => (
                <Col span={8} key={index}> {/* 每行显示三个卡片，所以设置 Col 的 span 为 8 */}
                    <Metahuman
                        id={card.id}
                        name={card.name}
                        description={card.description}
                        image={card.image}
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
