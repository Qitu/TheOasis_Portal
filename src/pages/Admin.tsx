// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Metahuman from '@/components/Metahuman';
import { Card, Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Meta } = Card;

const Admin: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const intl = useIntl();
  let [cards, setCards] = useState(
    [] as { mid: number; name: string; description: string; image: string }[],
  );

  useEffect(() => {
    // get Metahuman card data from back-end and update the status
    (async () => {
      try {
        const response = await axios.post('/sys/metahuman/list', {});
        cards = response.data.obj;
        // mock
        cards[0].image = 'https://models.readyplayer.me/651e3c55dab353c6356989fe.png';
        cards[1].image = 'https://models.readyplayer.me/64e3055495439dfcf3f0b665.png';

        setCards(cards);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
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
