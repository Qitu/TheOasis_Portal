import { List, Space, Switch } from 'antd';

function AdvancedContent() {
  const listdata = ['Know the current time (year, month, day, date...)'];
  return (
    <div
      style={{ marginTop: '-16px', padding: '20px 20px 300px', background: 'rgb(250, 248, 245)' }}
    >
      <strong style={{ lineHeight: '40px' }}>Advanced Properties</strong>
      <List
        style={{ background: 'white' }}
        bordered
        dataSource={listdata}
        renderItem={(item) => (
          <List.Item>
            <Space size={'middle'}>
              <Switch
                defaultChecked
                // onChange={onChange}
                disabled
              />
              {item}
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
}

export default AdvancedContent;
