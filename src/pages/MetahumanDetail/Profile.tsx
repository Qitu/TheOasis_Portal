import { Descriptions, Radio, Switch, Select } from 'antd';

const categories = [
  {label: 'Teacher', value: 'Teacher'},
  {label: 'Student', value: 'Student'},
  {label: 'Researcher', value: 'Researcher'},
  {label: 'Businessman', value: 'Businessman'},
  {label: 'Athlete', value: 'Athlete'},
  {label: 'Other', value: 'Other'}
]

function Profile(data: any, setProp: any) {

  const desc = [
    {
      key: '1',
      label: 'Status',
      children: <Switch defaultChecked={data.status} onChange={(val) => setProp('status', val)} />,
    },
    {
      key: '2',
      label: 'Gender',
      children: <Radio.Group defaultValue={data.gender} onChange={(val) => setProp('gender', val.target.value)} >
                  <Radio.Button value="male">male</Radio.Button>
                  <Radio.Button value="female">female</Radio.Button>
                </Radio.Group>,
    },
    {
      key: '3',
      label: 'Type',
      children: <Select
        style={{ width: '160px' }}
        // onChange={handleChange}
        defaultValue={data.category}
        options={categories}
        onSelect={(val) => setProp('category', val)}
      />,
    },
    {
      key: '4',
      label: 'Last update',
      children: data.updateTime,
    },
  ]


  return (
    <Descriptions style={{ padding: '15px 20px' }} layout="vertical" column={4} items={desc} />
  );
}

export default Profile;
