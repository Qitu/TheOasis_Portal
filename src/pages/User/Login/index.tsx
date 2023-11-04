// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Alert, Tabs, message, Form } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import axiosInstance from '../../../utils/request';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userLoginState, setUserLoginState] = useState<any>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const handleSubmit = async (values: any) => {
    // new login method
    const msg_token = await axiosInstance.post('/auth/login', { mobile: values.username, password: values.password });
    if (msg_token.data.code === 200) {
      // user verification
      const user_token = msg_token.data.object;
      const msg_user = await axiosInstance.post('/auth/verify', { token: user_token });

      if (msg_user.status === 200) {
        message.success('Login Successful!');

        // get user details
        const user_obj = msg_user.data;

        const userInfo = {
          uid: user_obj.uid,
          name: user_obj.nickname,
          access: user_obj.identity,
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        };

        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        localStorage.setItem('userToken', user_token);

        if (userInfo) {
          flushSync(() => {
            setInitialState((s) => ({
              ...s,
              currentUser: userInfo,
            }));
          });
        }

        // if the current url have "redirect"
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
    } else {
      message.error('Login failed, please try again!');
    }
  };
  const [form] = Form.useForm();
  const handleRegister = async (values: Record<string, any>) => {
    const msg = await axiosInstance.post('/auth/register', { nickname: 'User', mobile: values.username, password: values.password });

    if (msg.data.code === 200) {
      message.success("Registration successful!");
      form.resetFields();
      setType('account')
    } else {
      message.error("Registration failed")
    }

  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={containerClassName}>
      <div
        style={{
          flex: '1',
          padding: '36px 0',
        }}
      >
        <LoginForm
          logo={<img alt="logo" src="/logo2.png" />}
          title="Oasis"
          form={form}
          initialValues={{
            autoLogin: true,
          }}
          name='auth'
          onFinish={async (values) => {
            if (type === 'account') {
              // 当活动标签是 'account' 时调用登录函数
              await handleSubmit(values);
            } else if (type === 'new') {
              // 当活动标签是 'mobile' 时调用注册函数
              await handleRegister(values);
            }
          }}
          submitter={{
            searchConfig: {
              submitText: type === 'account' ? '- Login -' : 'Register', // 根据活动标签动态设置按钮文本
            },
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            style={{ padding: '8px' }}
            items={[
              {
                key: 'account',
                label: 'Login',
              },
              {
                key: 'new',
                label: 'Register',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={'Incorrect username or password'}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Please enter your username'}
                rules={[
                  {
                    required: true,
                    message: "Please enter your username!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter your password'}
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              />
              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <ProFormCheckbox noStyle name="autoLogin">Auto Login</ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                  onClick={() => setType('new')}
                >
                  Don't have account?
                </a>
              </div>
            </>
          )}
          {type === 'new' && (
            <>
              {/* set uid */}
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                name="username"
                placeholder={'Please set your username'}
                rules={[
                  {
                    required: true,
                    message: ("Please set your username"),
                  }
                ]}
              />

              {/* set password */}
              <ProFormText.Password
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />
                }}
                name="password"
                placeholder={'Please set your password'}
                rules={[
                  {
                    required: true,
                    message: ("Please set your password!"),
                  },
                ]}
              />

              <ProFormText.Password
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />
                }}
                name="confirm"
                dependencies={['password']}
                // hasFeedback
                placeholder={'Please confirm your password'}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
              >
              </ProFormText.Password>
            </>
          )}
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;

