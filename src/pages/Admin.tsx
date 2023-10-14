// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, Col, Row, Button, Modal, Space } from 'antd';
import React, { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Meta } = Card;

const Admin: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const intl = useIntl();

  const [isVisible, setIsVisible] = useState(false);
  const [modalValue, setModalValue] = useState(null);

  // configuration modal
  const showModal = ({valueToPass}: { valueToPass: any }) => {
    setModalValue(valueToPass);
    setIsVisible(true);
  };

  const handleOk = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  // operation modal
  const showOpeartionModal = ({valueToPass}: { valueToPass: any }) => {
    setModalValue(valueToPass);
    setIsVisible(true);
  };

  const handleDelete = () => {

  };

  const handleActivate = () => {

  };

  const handleDeactivate = () => {

  };

  return (
    <PageContainer>
        <Modal
            title="Edit Metahuman Information"
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}

        >
            <p>{modalValue}</p>
        </Modal>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title="Card title"
            bordered={false}
            hoverable
            style={{ width: 240 }}
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }
            actions={[<SettingOutlined key="setting"
                                       onClick={() => showOpeartionModal({valueToPass: ''})}/>,
                <EllipsisOutlined key="ellipsis" />]}
          >
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Card title"
            bordered={false}
            hoverable
            style={{ width: 240 }}
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }
            actions={[<SettingOutlined key="setting"
                                       onClick={() => showModal({valueToPass: ''})}/>,
                <EllipsisOutlined key="ellipsis" />]}
          >
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Card title"
            bordered={false}
            hoverable
            style={{ width: 240 }}
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }
            actions={[<SettingOutlined key="setting"
                                       onClick={() => showModal({valueToPass: ''})}/>,
                <EllipsisOutlined key="ellipsis" />]}
          >
            Card content
          </Card>
        </Col>
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
