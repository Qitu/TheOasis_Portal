import { Button, Modal, Form, Input, Select, Radio } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { categories } from '../MetahumanDetail/Profile';
import { createMetahumanAPI } from './api';


type FieldType = {
  name?: string;
  gender?: string;
  subname?: string;
  category?: string;
};


const CreateMetahuman = (successCallback: any) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    let avatarid = '653a1cc982ec257272be3760'
    let speaker = 'en-AU-WilliamNeural'
    if (values.gender == 'female') {
      avatarid = '653a1e0c0935b38c908e7bca'
      speaker = 'en-AU-AnnetteNeural'
    }
    const res = await createMetahumanAPI({
      ...values,
      avatarid,
      speaker,
      voicesource: 'Azure',
      speed: 0,
      pitch: 0
    })
    setIsModalOpen(false);
    successCallback()
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return <div style={{ display: 'inline'}}>
    <Button 
      type="dashed"
      icon={<PlusOutlined />}
      onClick={showModal}
    >
      New Metahuman
    </Button>
    <Modal 
      destroyOnClose={true}
      title="New Metahuman" 
      open={isModalOpen} 
      onOk={handleOk} 
      onCancel={handleCancel} 
      footer={null}
    >
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        style={{paddingTop: '25px'}}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Radio.Group 
            // onChange={(val) => setProp('gender', val.target.value)} 
          >
            <Radio.Button value="male">male</Radio.Button>
            <Radio.Button value="female">female</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item<FieldType>
          label="Subname"
          name="subname"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Category"
          name="category"
          rules={[{ required: false }]}
        >
          <Select
            // style={{ width: '160px' }}
            options={categories}
            // onSelect={(val) => setProp('category', val)}
          />
        </Form.Item>

        {/* <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>
};

export default CreateMetahuman;
