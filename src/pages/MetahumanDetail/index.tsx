import { MessageOutlined, SaveOutlined, ShareAltOutlined } from '@ant-design/icons'
import type { TabsProps } from 'antd'
import { Button, Image, Space, Tabs, Typography, message, Modal } from 'antd'
import advancedContent from './AdvancedContent'
import basicContent from './BasicContent'
import Profile from './Profile'
import { quryMetahuman, updateMetahuman } from './api'
import styles from './index.less';
import { useEffect, useState  } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { parseInt, cloneDeep } from 'lodash'
import { AvatarCreator, AvatarCreatorConfig } from '@readyplayerme/react-avatar-creator';

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

const { Link, Paragraph } = Typography;
  
// interface VoiceRecorderProps {
//     id: number // Metahuman ID
// }

function MetahumanDetail() {
  const [metahuman, setMetahuman] = useState<any>({});
  const [descs, setDescs] = useState<any>([]);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showIMG, setShowIMG] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();

  const getMetahumanDetail = async (id: string) => {
    const data:any = await quryMetahuman(parseInt(id));
    if (data.code === 200) {
      data.object.status = data.object.status == 'online' ? true : false;
      setMetahuman({
        ...data.object
      })
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
      ])
    } else {
      navigate('/404')
      console.log(data.message);
    }
  };

  const updateMetahumanDetail = async () => {
    if(!param.id) return;
    console.log(metahuman)
    const updateData = cloneDeep(metahuman)
    updateData.status = updateData.status ? 'online' : 'offline'
    setSaving(true)
    await updateMetahuman(parseInt(param.id), updateData)
    messageApi.open({
      type: 'success',
      content: 'Updates saved.',
    });
    setSaving(false)
  };


  const handleOnAvatarExported = (event: any) => {
    setIsModalOpen(false)
    console.log(event.data)
    setProperty('avatarid', event.data.avatarId)
    setShowIMG(false)
    setTimeout(() => {
      setShowIMG(true)
    }, 100);
  };

  const param = useParams<any>();
  const navigate = useNavigate();

  useEffect(() => {
    getMetahumanDetail(param.id || "");
  }, [name]);

  const setProperty = (keyName:string, value:any) => {
    const newParam = {
      ...metahuman
    }
    newParam[keyName] = value
    setMetahuman(newParam)
  }

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Basic',
      children: metahuman.name ? basicContent(metahuman, setProperty) : '',
    },
    {
      key: '2',
      label: 'Advanced',
      children: advancedContent(),
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.hostname}/conversation/${param.id}`);
      messageApi.open({
        type: 'success',
        content: 'Share link copied!',
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <div>
      <div className={styles.flexbox}>
        {/* Avatar */}
        <div style={{ marginRight: '26px' }}>
          {
            showIMG ? 
              <Image
                width={100}
                style={{ borderRadius: '5px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 2px 5px rgba(0,0,0,0.1)' }}
                src={`https://models.readyplayer.me/${metahuman.avatarid}.png`}
              />
            : ''
          }
          
        </div>
        {/* Name & Description */}
        <div>
          <Paragraph 
            className={styles.title}
            editable={{
              onChange: (value) => setProperty('name', value),
              text: metahuman.name,
            }}
          >
            { metahuman.name }
          </Paragraph>
          <Paragraph 
            className={styles.subtitle}
            editable={{
              onChange: (value) => setProperty('subname', value),
              text: metahuman.subname,
            }}
          >
            { metahuman.subname || '-' }
          </Paragraph>
          <Link
            target="_blank"
            style={{ position: 'relative', top: '5px' }}
            onClick={() => setIsModalOpen(true)}
          >
            Edit Avatar
          </Link>
          <Modal 
            centered 
            width="75%" 
            title="Edit Avatar" 
            open={isModalOpen} 
            maskClosable={false}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
          >
            <AvatarCreator 
              subdomain="aiaustin" 
              // subdomain="demo" 
              config={config} 
              style={{ width: '100%', height: '520px', border: 'none' }} 
              onAvatarExported={handleOnAvatarExported} 
            />
          </Modal>
        </div>
        {/* Action Buttons */}
        <div style={{ flex: 1, textAlign: 'right', paddingTop: '15px' }}>
          <Space>
            <Button shape="round" icon={<ShareAltOutlined />} onClick={() => copyLink()}>
              Share
            </Button>
            <Button loading={saving} type="primary" shape="round" icon={<SaveOutlined />} onClick={() => updateMetahumanDetail()}>
              Save
            </Button>
          </Space>
        </div>
      </div>

      {/* Metahuman Profile */}
      {metahuman.name ? Profile(metahuman, setProperty): ''}
      
      {/* Metahuman Personality */}
      <Tabs defaultActiveKey="1" items={tabItems} tabBarStyle={{ padding: '0 20px' }} />

      {contextHolder}
    </div>
  );
}

export default MetahumanDetail;
