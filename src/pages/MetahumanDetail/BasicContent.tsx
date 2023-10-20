import { QuestionCircleOutlined, SoundOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Slider,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';

const { TextArea } = Input;
const { Title } = Typography;

function BasicContent() {
  return (
    <div style={{ marginTop: '-16px', padding: '20px 20px', background: 'rgb(250, 248, 245)' }}>
      <Row gutter={16}>
        <Col xs={24} md={15} span={15}>
          <strong style={{ lineHeight: '36px' }}>
            Core description
            <Tooltip title="prompt text">
              <QuestionCircleOutlined style={{ marginLeft: '10px' }} />
            </Tooltip>
          </strong>

          <TextArea placeholder="Basic usage" autoSize={{ minRows: 7, maxRows: 15 }} />
        </Col>
        <Col xs={12} md={9} span={9} style={{ marginTop: '10px' }}>
          <Typography>
            <Title level={5}>Available Variables</Title>
            <Space direction="vertical">
              <div>
                <Tag color="red">&#123; time &#125;</Tag>代表当前时间
              </div>
              <div>
                <Tag color="red">&#123; time &#125;</Tag>代表当前时间
              </div>
              <div>
                <Tag color="green">&#123; time &#125;</Tag>代表当前时间
              </div>
              <div>
                <Tag color="blue">&#123; time &#125;</Tag>代表当前时间
              </div>
              <div>
                <Tag color="red">&#123; time &#125;</Tag>代表当前时间
              </div>
            </Space>
          </Typography>
        </Col>
      </Row>

      <div style={{ marginTop: '20px' }}>
        <strong style={{ lineHeight: '36px' }}>Voice Setting</strong>
        <Card style={{ width: '100%' }}>
          <Form
            name="validate_other"
            layout="vertical"
            // initialValues={{
            //   'input-number': 3,
            //   'checkbox-group': ['A', 'B'],
            //   rate: 3.5,
            //   'color-picker': null,
            // }}
            // style={{ maxWidth: 600 }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Space>
                  <Form.Item label="Voice">
                    <Select
                      defaultValue="lucy"
                      style={{ width: '360px' }}
                      // onChange={handleChange}
                      options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled', disabled: true },
                      ]}
                    />
                  </Form.Item>
                  <Button
                    style={{ position: 'relative', top: '2px' }}
                    shape="round"
                    icon={<SoundOutlined />}
                  >
                    Listen
                  </Button>
                </Space>
              </Col>
              <Col span={12}>
                <Form.Item label="Pitch">
                  <Slider defaultValue={50} disabled={false} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Speed">
                  <Slider defaultValue={1} disabled={false} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default BasicContent;
