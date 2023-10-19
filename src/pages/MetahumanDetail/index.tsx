import React, { useEffect, useState } from "react";
import { Avatar, Tooltip, Button, Space, Form, Descriptions, Tabs, Input, List } from 'antd';
import type { DescriptionsProps, TabsProps } from 'antd';
import { RedoOutlined, QuestionCircleOutlined, SaveOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';
import styles from './index.less';


const { TextArea } = Input;

const tabItems: TabsProps['items'] = [
  {
    key: '1',
    label: 'Basic',
    children: BasicContent(),
  },
  {
    key: '2',
    label: 'Advanced',
    children: 'Content of Tab Pane 2',
  }
];

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Live',
    children: 'Hangzhou, Zhejiang',
  },
];

function BasicContent() {
  const listdata = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  return <div style={{ marginTop: '-16px', minHeight: '90vh', padding: '20px 20px', background: 'rgb(250, 248, 245)' }}>
      <div>
        <strong style={{ lineHeight: '36px' }}>
          Core description
          <Tooltip title="prompt text">
            <QuestionCircleOutlined style={{ marginLeft: '10px' }} />
          </Tooltip>
        </strong>
        <TextArea 
          placeholder="Basic usage" 
          autoSize={{ minRows: 6 }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <strong style={{ lineHeight: '36px' }}>Variable Management</strong>
        <List
          // header={<div>Variables...</div>}
          // footer={<div>Footer</div>}
          style={{ background: 'white'}}
          bordered
          dataSource={listdata}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </div>
    </div>

  
}


interface VoiceRecorderProps {
    recording: boolean
    openRecord: boolean
    resultText: string 
    recordEnable: Function
    setOpenRecordg: Function
}

function MetahumanDetail(props: VoiceRecorderProps) {
    return <div>
        <div className={styles.flexbox}>
          {/* Avatar */}
          <div style={{'width': '10%'}}>
            <Avatar shape="square" size={80} icon={<RedoOutlined />} />
          </div>
          {/* Name & Description */}
          <div style={{'width': '40%'}}>
            <div className={styles.title}>Galadriel</div>
            <div className={styles.subtitle}>Elf Elder</div>
          </div>
          {/* Action Buttons */}
          <div style={{'width': '50%', 'textAlign': 'right', 'paddingTop': '15px'}}>
            <Space>
              <Button shape="round" icon={<ShareAltOutlined />}>Share</Button>
              <Button shape="round" icon={<MessageOutlined />}>Chat</Button>
              <Button type="primary" shape="round" icon={<SaveOutlined />}>Save</Button>
            </Space>
          </div>
        </div>

        {/* Metahuman Profile */}
        <Descriptions 
          style={{'padding': '5px 20px'}}
          layout="vertical"
          items={items} 
        />

      <Tabs 
        defaultActiveKey="1" 
        items={tabItems} 
        tabBarStyle={{padding: '0 20px'}}
        // onChange={onChange}
      />
    </div>
}

export default MetahumanDetail;