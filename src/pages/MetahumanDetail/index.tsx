import { LeftOutlined, MessageOutlined, SaveOutlined, ShareAltOutlined } from '@ant-design/icons';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TabsProps } from 'antd';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Descriptions, Image, Space, Tabs, Typography } from 'antd';
import advancedContent from './AdvancedContent';
import basicContent from './BasicContent';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { parseInt } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { quryMetahuman } from './api';
import styles from './index.less';

const { Link } = Typography;

// interface VoiceRecorderProps {
//     id: number // Metahuman ID
// }

function MetahumanDetail() {
  const [metahuman, setMetahuman] = useState<any>({});
  const [descs, setDescs] = useState<any>([]);

  const getMetahumanDetail = async (id: string) => {
    const data: any = await quryMetahuman(parseInt(id));

    if (data.code === 200) {
      setMetahuman({
        ...data.object,
      });
      setDescs([
        {
          key: '1',
          label: 'Status',
          children: data.object.status,
        },
        {
          key: '2',
          label: 'Gender',
          children: data.object.gender,
        },
        {
          key: '3',
          label: 'Category',
          children: data.object.category,
        },
        {
          key: '4',
          label: 'Last update',
          children: data.object.updateTime,
        },
      ]);

      console.log(data.object);
    } else {
      console.log(data.message);
    }
  };

  const param = useParams<any>();

  useEffect(() => {
    getMetahumanDetail(param.id || '');
  }, [name]);

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Basic',
      children: basicContent(metahuman),
    },
    {
      key: '2',
      label: 'Advanced',
      children: advancedContent(),
    },
  ];

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
          <div className={styles.title}>{metahuman.name}</div>
          <div className={styles.subtitle}>{metahuman.subname || '-'}</div>
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
      <Descriptions style={{ padding: '15px 20px' }} layout="vertical" column={4} items={descs} />

      {/* Metahuman Personality */}
      <Tabs defaultActiveKey="1" items={tabItems} tabBarStyle={{ padding: '0 20px' }} />
    </div>
  );
}

export default MetahumanDetail;
