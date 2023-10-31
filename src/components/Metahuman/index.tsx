import {
  DeleteOutlined,
  LinkOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Card, Popconfirm, Tag, message} from 'antd';
import React from 'react';
import axiosInstance from '../../utils/request';

const Metahuman: React.FC<{
  id: number;
  name: string;
  description: string;
  avatarid: string;
  status: string;
  deleteCallback: any;
}> = ({ id, name, description, avatarid, status, deleteCallback }) => {
  const { initialState } = useModel('@@initialState');

  const currentUserDetails = initialState?.currentUser;

  const is_active = status === 'online';

  const goToCardConfigPage = () => {
    const targetPath = currentUserDetails?.access === 'admin' ? `/metahuman/${id}` : `conversation/${id}`
    history.push(targetPath, {
      id: id,
      name: name,
      description: description,
      avatarid: avatarid,
    });
  };

  const startConversation = () => {
    history.push(`conversation/${id}`, {
      id: id,
      name: name,
      description: description,
      avatarid: avatarid,
    });
  }

  const handleDelete = async (id: number) => {
    const deleteRes = await axiosInstance.delete('/sys/metahuman/' + id)
    if(deleteRes.data && deleteRes.data.code === 200) {
      deleteCallback();
    } else {
      message.error(deleteRes.data ? deleteRes.data.message : 'Metahuman delete failed');
    }
  }

  return (
      <Card
          bordered={false}
          hoverable
          cover={<img alt="metahumanImg" src={`https://models.readyplayer.me/${avatarid}.png`} />}
          onClick={() => {
            currentUserDetails?.access === 'admin' ? '' : goToCardConfigPage()
          }}
          actions={
            currentUserDetails?.access === 'admin'
                ? [
                    <div onClick={startConversation} >
                      <LinkOutlined style={{ marginRight: '10px' }}/>
                    </div>
                    ,
                    <div onClick={goToCardConfigPage} >
                      <SettingOutlined style={{ marginRight: '10px' }}/>
                    </div>
                    ,
                    <Popconfirm
                      title="Delete the metahuman"
                      description="Are you sure you want to delete this metahuman?"
                      onConfirm={() => {handleDelete(id)}}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>
                ]
                : []
          }
      >
        { 
          is_active 
          ? 
            '' 
          : 
            <div style={{ position: 'absolute', top: '15px' }}>
              <Tag bordered={false}>Draft</Tag>
            </div>
        }
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px' }}>
            {name}
          </div>
          <div style={{ color: 'grey' }}>{description || '---'}</div>
        </div>
      </Card>

  );
};

export default Metahuman;
