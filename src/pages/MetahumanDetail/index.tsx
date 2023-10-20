import { LeftOutlined, MessageOutlined, SaveOutlined, ShareAltOutlined } from '@ant-design/icons';
import type { DescriptionsProps, TabsProps } from 'antd';
import { Button, Descriptions, Image, Space, Tabs, Typography } from 'antd';
import advancedContent from './AdvancedContent';
import basicContent from './BasicContent';
import styles from './index.less';

const { Link } = Typography;

const tabItems: TabsProps['items'] = [
  {
    key: '1',
    label: 'Basic',
    children: basicContent(),
  },
  {
    key: '2',
    label: 'Advanced',
    children: advancedContent(),
  },
];

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Status',
    children: 'Draft',
  },
  {
    key: '2',
    label: 'Gender',
    children: 'Female',
  },
  {
    key: '3',
    label: 'Category',
    children: 'NUS-ISS',
  },
  {
    key: '4',
    label: 'Last update',
    children: '10.20.2023',
  },
];

// interface VoiceRecorderProps {
//     id: number // Metahuman ID
// }

function MetahumanDetail() {
  return (
    <div>
      <div style={{ margin: '10px 10px 0' }}>
        <Button
          type="link"
          style={{ background: 'none' }}
          size={'large'}
          shape="circle"
          icon={<LeftOutlined />}
        />
      </div>
      <div className={styles.flexbox}>
        {/* Avatar */}
        <div style={{ margin: '0 20px' }}>
          <Image
            width={100}
            style={{ borderRadius: '5px' }}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          {/* <Avatar shape="square" size={80} icon={<RedoOutlined />} /> */}
        </div>
        {/* Name & Description */}
        <div style={{}}>
          <div className={styles.title}>Galadriel</div>
          <div className={styles.subtitle}>Elf Elder</div>
          <Link
            href="https://ant.design"
            target="_blank"
            style={{ position: 'relative', top: '23px' }}
          >
            Edit image
          </Link>
        </div>
        {/* Action Buttons */}
        <div style={{ flex: 1, textAlign: 'right', paddingTop: '15px' }}>
          <Space>
            <Button shape="round" icon={<ShareAltOutlined />}>
              Share
            </Button>
            <Button shape="round" icon={<MessageOutlined />}>
              Chat
            </Button>
            <Button type="primary" shape="round" icon={<SaveOutlined />}>
              Save
            </Button>
          </Space>
        </div>
      </div>

      {/* Metahuman Profile */}
      <Descriptions style={{ padding: '15px 20px' }} layout="vertical" column={4} items={items} />

      {/* Metahuman Personality */}
      <Tabs defaultActiveKey="1" items={tabItems} tabBarStyle={{ padding: '0 20px' }} />
    </div>
  );
}

export default MetahumanDetail;
