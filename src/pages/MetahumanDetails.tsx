import {useLocation} from "umi";
import {Tabs} from 'antd';
import type { TabsProps } from 'antd';
import React, {useState} from 'react';
import { Modal, Button, Input, Descriptions } from 'antd';
import styles from './CharacterDetail.less';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Basic',
        children: '',
    },
    {
        key: '2',
        label: 'Advanced',
        children: '',
    },
];

const MetahumanDetails: React.FC = () => {
    const location  = useLocation();
    const params = location.state

    const [id, setId] = useState(params.id);
    const [name, setName] = useState(params.name);
    const [imageUrl] = useState(params.image);

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={imageUrl} alt="Character" className={styles.characterImage} />
                </div>

                <div className={styles.infoContainer}>
                    <Descriptions title="Character Info">
                        <Descriptions.Item label="ID">{id}</Descriptions.Item>
                        <Descriptions.Item label="Name">{name}</Descriptions.Item>
                    </Descriptions>
                    <Button type="primary" onClick={showModal}>
                        Edit Details
                    </Button>

                    <Modal title="Edit Character Details" visible={visible} onOk={handleOk} onCancel={handleCancel}>

                        <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            style={{ marginBottom: '10px' }}
                        />
                    </Modal>
                </div>
            </div>

            <Tabs defaultActiveKey="1" items={items} onChange={onChange} type='card'/>
        </>
    )
}

export default MetahumanDetails;
