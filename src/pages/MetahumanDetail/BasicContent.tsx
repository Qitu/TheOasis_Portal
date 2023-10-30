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
import { TestSpeech } from '../Conversation/tts'

const { TextArea } = Input;
const { Title } = Typography;

function BasicContent(data: any, setProp: any) {
  // const [voices, setVoices] = useState([]);
  return (
    <div style={{ marginTop: '-16px', padding: '20px 20px', background: 'rgba(255,255,255,0.56)' }}>
      <Row gutter={16}>
        <Col xs={24} md={15} span={15}>
          <strong style={{ lineHeight: '36px' }}>
            Core description
            <Tooltip title="Characterize the Metahuman's personality (you can use the variables provided on the right side for a detailed description).">
              <QuestionCircleOutlined style={{ marginLeft: '10px' }} />
            </Tooltip>
          </strong>

          <TextArea defaultValue={data.description} onChange={(val) => {setProp('description', val.currentTarget.value)}} placeholder="Basic usage" autoSize={{ minRows: 7, maxRows: 15 }} />
        </Col>
        <Col xs={12} md={9} span={9} style={{ marginTop: '10px' }}>
          <Typography>
            <Title level={5}>Available Variables</Title>
            <Space direction="vertical">
              <div>
                <Tag color="red">&#123;character&#125;</Tag>represents the Metahuman 
              </div>
              <div>
                <Tag color="orange">&#123;time&#125;</Tag>represents the current time 
              </div>
              <div>
                <Tag color="green">&#123;user&#125;</Tag>represents the chat user
              </div>
              <div>
                <Tag color="blue">&#123;random&#125;</Tag>represents a random number from 0 to 100
              </div>
            </Space>
          </Typography>
        </Col>
      </Row>
      
      {
        data ?
        <div style={{ marginTop: '20px' }}>
        <strong style={{ lineHeight: '36px' }}>Voice Setting</strong>
        <Card style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={24} style={{ marginBottom: '26px' }}>
                <div>Voice: </div>
                <Space>
                    <Select
                      style={{ width: '360px' }}
                      // onChange={handleChange}
                      defaultValue={data.speaker}
                      options={voiceList[data.gender]}
                      onSelect={(val) => setProp('speaker', val)}
                    />
                  <Button
                    style={{ position: 'relative', top: '2px' }}
                    shape="round"
                    icon={<SoundOutlined />}
                    onClick={() => TestSpeech(data.name, data.speaker, data.speed, data.pitch)}
                  >
                    Listen
                  </Button>
                </Space>
              </Col>
              <Col span={12}>
                Pitch: 
                <Slider disabled={false} defaultValue={data.pitch} min={-100} max={100} step={1} onAfterChange={(val) => {setProp('pitch', val)}}/>
              </Col>
              <Col span={12}>
                Speed: 
                <Slider disabled={false} defaultValue={data.speed} min={-100} max={100} step={1} onAfterChange={(val) => {setProp('speed', val)}}/>
              </Col>
            </Row>
        </Card>
      </div>
        : ''
      }
    </div>
  );
}

const voiceList:any = {
  male: [
    {label: 'Australia, Willem', value: 'en-AU-WilliamNeural'},
    {label: 'Australia, Duncan', value: 'en-AU-DuncanNeural'},
    {label: 'Australia, Ken', value: 'en-AU-KenNeural'},
    {label: 'Australia, Neil', value: 'en-AU-NeilNeural'},
    {label: 'Australia, Tim', value: 'en-AU-TimNeural'},
    {label: 'China, Yunxi', value: 'zh-CN-YunxiNeural'},
    {label: 'China, Yunze', value: 'zh-CN-YunzeNeural'},
    {label: 'Canada, Liam', value: 'en-CA-LiamNeural'},
    {label: 'UK, Ryan', value: 'en-GB-RyanNeural'},
    {label: 'UK, Alfie', value: 'en-GB-AlfieNeural'},
    {label: 'HK, Sam', value: 'en-HK-SamNeural'},
    {label: 'Singapore, Wayne', value: 'en-SG-WayneNeural'},
    {label: 'USA, Guy', value: 'en-US-GuyNeural'},
    {label: 'USA, Davis', value: 'en-US-DavisNeural'},
    {label: 'USA, Brandon', value: 'en-US-BrandonNeural'}
  ],
  female: [
    {label: 'Australia, Annette', value: 'en-AU-AnnetteNeural'},
    {label: 'Australia, Carly', value: 'en-AU-CarlyNeural'},
    {label: 'Australia, Elsie', value: 'en-AU-ElsieNeural'},
    {label: 'Australia, Joanne', value: 'en-AU-JoanneNeural'},
    {label: 'Australia, Kim', value: 'en-AU-KimNeural'},
    {label: 'China, Xiaoxiao', value: 'zh-CN-XiaoxiaoNeural'},
    {label: 'China, Xiaoyan', value: 'zh-CN-XiaoyanNeural'},
    {label: 'Canada, Clara', value: 'en-CA-ClaraNeural'},
    {label: 'UK, Sonia', value: 'en-GB-SoniaNeural'},
    {label: 'UK, Libby', value: 'en-GB-LibbyNeural'},
    {label: 'HK, Yan', value: 'en-HK-YanNeural'},
    {label: 'Singapore, Luna', value: 'en-SG-LunaNeural'},
    {label: 'USA, Jenny', value: 'en-US-JennyNeural'},
    {label: 'USA, Amber', value: 'en-US-AmberNeural'},
    {label: 'USA, Ashley', value: 'en-US-AshleyNeural'}
  ]
}


export default BasicContent;
